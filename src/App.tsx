import React, { useState, useEffect } from "react";
import { FullAnalysisReport } from "./types";
import OverviewTab from "./components/OverviewTab";
import KeywordsTab from "./components/KeywordsTab";
import EnhancementsTab from "./components/EnhancementsTab";
import CareerTab from "./components/CareerTab";
import HeatmapVisual from "./components/HeatmapVisual";
import InterviewTab from "./components/InterviewTab";
import { 
  Briefcase, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  History, 
  Trash2, 
  AlertCircle,
  LayoutDashboard,
  Brain,
  History as HistoryIcon,
  HelpCircle,
  X,
  FileCheck2,
  ListRestart
} from "lucide-react";

export default function App() {
  // Input fields state
  const [resumeText, setResumeText] = useState<string>("");
  const [jobText, setJobText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<{
    base64: string;
    filename: string;
    mimeType: string;
  } | null>(null);

  // Interaction controls
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("Extracting structures...");
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<FullAnalysisReport | null>(null);
  
  // Local history state
  const [historyList, setHistoryList] = useState<FullAnalysisReport[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Loading indicator sequential messages
  const loadingPhrases = [
    "Extracting experience bullet hierarchies...",
    "Vetting skills against target career profiles...",
    "Scanning document layouts for formatting risks...",
    "Simulating recruiter glance-attention triggers...",
    "Engineering bullet point action verbiage options...",
    "Evaluating project complexity hierarchies...",
    "Generating custom role-specific interview prep...",
    "Plotting expected trajectory learning milestones..."
  ];

  // Retrieve storage on load
  useEffect(() => {
    const saved = localStorage.getItem("resumeiq_raw_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load local history", err);
      }
    }
  }, []);

  // Update cycler for loading screen
  useEffect(() => {
    let index = 0;
    let timer: any;
    if (loading) {
      timer = setInterval(() => {
        index = (index + 1) % loadingPhrases.length;
        setLoadingStep(loadingPhrases[index]);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Read file elements to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    // For simple txt files, read directly
    if (extension === 'txt') {
      const textReader = new FileReader();
      textReader.onload = (ev) => {
        setResumeText(ev.target?.result as string || "");
        setUploadedFile(null); // Clear manual file block if plain text read
      };
      textReader.readAsText(file);
      return;
    }

    // For PDF and other formats, keep as base64 for Gemini Document representation
    const docReader = new FileReader();
    docReader.onload = (ev) => {
      const base64Content = (ev.target?.result as string).split(",")[1];
      setUploadedFile({
        base64: base64Content,
        filename: file.name,
        mimeType: file.type || "application/pdf"
      });
    };
    docReader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Core analyze post trigger
  const triggerAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingStep("Connecting to diagnostic engine...");

      if (!jobText.trim()) {
        throw new Error("Target job description is empty. We need the text of the job description to compute compatibility score metrics.");
      }

      if (!resumeText.trim() && !uploadedFile) {
        throw new Error("Candidate resume credentials are empty. Please paste your text, or drop a resume PDF/TXT file directly to parse.");
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          resumeFile: uploadedFile,
          jobText
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "A connection breakdown occurred during report aggregation.");
      }

      // Append tracking metadata
      const finalReport: FullAnalysisReport = {
        ...data,
        timestamp: new Date().toISOString(),
        jobTitle: data.jobTitle || "Target Career Spec"
      };

      // Set state and append to storage
      setReport(finalReport);
      const updatedHistory = [finalReport, ...historyList.slice(0, 19)];
      setHistoryList(updatedHistory);
      localStorage.setItem("resumeiq_raw_history", JSON.stringify(updatedHistory));
      setActiveTab("overview");

    } catch (err: any) {
      setError(err.message || "An unexpected issue occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Delete historic element
  const deleteHistoryItem = (timestamp: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = historyList.filter(item => item.timestamp !== timestamp);
    setHistoryList(filtered);
    localStorage.setItem("resumeiq_raw_history", JSON.stringify(filtered));
  };

  // Load old report from lists
  const loadHistoryItem = (savedReport: FullAnalysisReport) => {
    setReport(savedReport);
    setActiveTab("overview");
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#080808] text-[#E5E5E5] font-sans flex flex-col antialiased selection:bg-emerald-500/30">
      {/* Absolute Loading Backdrop */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-[#0A0A0A] p-10 rounded-3xl border border-white/10 text-center max-w-[420px] flex flex-col items-center shadow-2xl">
            {/* Spinning pulse logo */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-emerald-500/5 blur animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>

            <h3 className="text-white text-lg font-bold tracking-tight mb-2">Analyzing ResumeIQ Assets</h3>
            <p className="text-xs text-emerald-300/80 font-mono leading-relaxed h-12 flex items-center justify-center">
              {loadingStep}
            </p>

            <span className="text-[10px] text-white/30 font-medium uppercase tracking-widest mt-6 block">
              Processing under 10 seconds
            </span>
          </div>
        </div>
      )}

      {/* Primary Header */}
      <header className="sticky top-0 bg-[#0A0A0A] border-b border-white/10 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-black rotate-45"></div>
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight text-white block leading-none">
                Resume<span className="text-emerald-400">IQ</span>
              </span>
              <span className="text-[9px] text-white/45 font-mono tracking-wider mt-0.5 block">AI Platform v1.0</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {report && (
              <button
                onClick={() => setReport(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-white/10 rounded-lg text-xs font-bold bg-[#111111] text-white hover:bg-zinc-900 hover:border-white/20 transition-all duration-200 uppercase tracking-wide"
              >
                <ListRestart className="w-3.5 h-3.5 text-emerald-400" /> Close Analysis
              </button>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-wider">Services Active</span>
          </div>
        </div>
      </header>

      {/* Main Core View Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Error Notification Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-4 text-xs font-medium flex items-start gap-2.5 animate-pulse">
            <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
            <div className="flex-grow">
              <span className="font-bold">Error Processing Assets:</span> {error}
            </div>
            <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CONDITION A: LANDING PAGE / NO ACTIVE REPORT VIEW */}
        {!report ? (
          <div className="flex flex-col gap-8">
            
            {/* Value Proposition Hero Header */}
            <div className="text-center py-6 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
                AI-Powered ATS Optimizations
              </h1>
              <p className="mt-3 text-sm text-white/50 leading-relaxed font-normal">
                Analyze student credentials and professional resumes against specific target job listings. Audit missing keywords, substantiate skill claims with work logic, draft custom interview studies, and boost score outcomes.
              </p>
            </div>

            {/* Inputs Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left Panel: Resume Upload & Text Paste */}
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" /> Candidate Resume Criteria
                  </h3>
                  <p className="text-xs text-white/40 mb-4 font-normal">
                    Provide credentials as pasted plain text, or drop a TXT, DOCX, or PDF file.
                  </p>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 mb-4 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                      isDragging 
                        ? "border-emerald-500 bg-emerald-500/10 shadow-inner" 
                        : uploadedFile 
                        ? "border-emerald-500/30 bg-emerald-500/5" 
                        : "border-white/10 hover:border-white/25 bg-black/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="manual-file-selector"
                      accept=".pdf,.txt,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    <label htmlFor="manual-file-selector" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
                      {uploadedFile ? (
                        <>
                          <FileCheck2 className="w-10 h-10 text-emerald-400 mb-2.5 animate-bounce" />
                          <span className="text-xs font-bold text-white block">{uploadedFile.filename}</span>
                          <span className="text-[10px] text-white/40 font-mono mt-1">
                            PDF Binary Attached (Auto-Parser Mode)
                          </span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-10 h-10 text-white/30 mb-2.5" />
                          <span className="text-xs font-semibold text-white/80 block">Drag & Drop Resume File</span>
                          <span className="text-[10px] text-white/30 font-normal mt-1">
                            PDF, DOCX, or TXT
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {uploadedFile && (
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block mb-3 hover:underline"
                    >
                      Clear File Attachment
                    </button>
                  )}

                  {/* Plain Text Paste Option */}
                  <span className="text-[9px] text-white/40 font-black tracking-widest uppercase block mb-1.5">
                    OR Paste Resume Plain Text
                  </span>
                  <textarea
                    rows={8}
                    placeholder="Candidate name, skills, past internships, certifications, university project records..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full border border-white/10 rounded-xl p-3 text-xs bg-black/45 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-normal leading-relaxed text-[#E5E5E5] placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Right Panel: Target Job Specification */}
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-400" /> Target Job Profile Specifications
                  </h3>
                  <p className="text-xs text-white/40 mb-4 font-normal">
                    Paste the target JD to calculate precise category score alignment.
                  </p>

                  <span className="text-[9px] text-white/40 font-black tracking-widest uppercase block mb-1.5">
                    Paste Job Description / Requirements
                  </span>
                  <textarea
                    rows={15}
                    placeholder="We are looking for a Software Engineer with 2+ years experience in Python, Docker modeling, AWS services, and relational DB queries..."
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    className="w-full border border-white/10 rounded-xl p-3 text-xs bg-black/45 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-normal leading-relaxed text-[#E5E5E5] placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Analysis Action */}
            <div className="flex justify-center mt-2">
              <button
                onClick={triggerAnalysis}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40 scale-100 active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-emerald-100" /> Diagnose ATS Compatibility
              </button>
            </div>

            {/* Recent Storage History Section (Feature: Recent Analyses) */}
            {historyList.length > 0 && (
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
                  <HistoryIcon className="w-4 h-4 text-emerald-400" /> Recent Document Analyses
                </h3>
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
                  {historyList.map((item, index) => (
                    <div
                      key={item.timestamp || index}
                      onClick={() => loadHistoryItem(item)}
                      className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:bg-zinc-900 hover:border-white/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-black text-xs">
                          {item.atsCompatibility.overallScore}%
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white group-hover:underline">
                            {item.jobTitle}
                          </span>
                          <span className="text-[10px] text-white/40 block font-normal mt-0.5">
                            Tested {new Date(item.timestamp).toLocaleString()} • {item.parsedResume?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Restore Report
                        </span>
                        <button
                          onClick={(e) => deleteHistoryItem(item.timestamp, e)}
                          className="text-white/40 hover:text-rose-500 p-1 transition-colors"
                          title="Purge Analysis"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // CONDITION B: ACTIVE ANALYSIS REPORT DASHBOARD
          <div className="flex flex-col gap-6">
            
            {/* Header section detailing candidate bio statistics */}
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase block mb-1">Diagnosed Target Listing</span>
                <h2 className="text-xl font-bold text-white leading-none mb-1.5">{report.jobTitle}</h2>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-white/40 font-normal">Candidate Name:</span>
                  <span className="text-xs font-bold text-white bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded">
                    {report.parsedResume?.name || "Assembled Identity"}
                  </span>
                  {report.parsedResume?.email && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                      <span className="text-xs text-white/45 font-mono">{report.parsedResume.email}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">Average ATS Score</span>
                  <span className="text-3xl font-light font-mono text-white">{report.atsCompatibility.overallScore}/100</span>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 font-mono font-black text-base animate-pulse">
                  {report.atsCompatibility.overallScore}%
                </div>
              </div>
            </div>

            {/* Interactive Tab Navigation bar */}
            <div className="flex items-center gap-1 overflow-x-auto bg-[#111111] border border-white/5 rounded-xl p-1.5 scrollbar-hidden">
              {[
                { id: "overview", label: "ATS Diagnostics Overview", count: null },
                { id: "keywords", label: "Missing Keywords & Gaps", count: report.missingKeywords?.length },
                { id: "enhancements", label: "Bullet Point & Formatting", count: report.bulletPointEnhancements?.length },
                { id: "career", label: "Projects & Career roadmap", count: null },
                { id: "heatmap", label: "Recruiter Heatmaps", count: null },
                { id: "interview", label: "Mock Interview Prep", count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-250 whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="text-[9px] font-bold bg-white/10 text-white/95 px-1 rounded-sm">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* TAB RENDERING VIEWPORTS */}
            <div className="transition-all duration-300">
              {activeTab === "overview" && <OverviewTab report={report} />}
              {activeTab === "keywords" && <KeywordsTab report={report} />}
              {activeTab === "enhancements" && <EnhancementsTab report={report} />}
              {activeTab === "career" && <CareerTab report={report} />}
              {activeTab === "heatmap" && <HeatmapVisual data={report.attentionHeatmap} />}
              {activeTab === "interview" && <InterviewTab report={report} />}
            </div>

          </div>
        )}
      </main>

      <footer className="bg-[#0A0A0A] border-t border-white/5 py-6 mt-12 text-center text-xs text-white/35 font-normal">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>ResumeIQ &copy; 2026. Made as a production-grade ATS optimizer workspace.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Security Standards</span>
            <span className="hover:text-white cursor-pointer transition-colors">Term Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
