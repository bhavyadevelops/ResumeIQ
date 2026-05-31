import React from "react";
import { FullAnalysisReport } from "../types";
import CircularProgress from "./CircularProgress";
import { Eye, ShieldAlert, Award, Sparkles, Building, User, Bookmark, CheckCircle2, ChevronRight } from "lucide-react";

interface OverviewTabProps {
  report: FullAnalysisReport;
}

export default function OverviewTab({ report }: OverviewTabProps) {
  const { atsCompatibility, benchmarking, recruiterSimulation, sectionAnalysis } = report;

  // Render a mini bar for progress categories
  const categories = [
    { title: "Skills Match", key: "skillsMatch", weight: "25%", val: atsCompatibility.categoryScores.skillsMatch, detail: atsCompatibility.explanation.skillsMatch },
    { title: "Experience Relevance", key: "experienceRelevance", weight: "25%", val: atsCompatibility.categoryScores.experienceRelevance, detail: atsCompatibility.explanation.experienceRelevance },
    { title: "Keyword Coverage", key: "keywordCoverage", weight: "20%", val: atsCompatibility.categoryScores.keywordCoverage, detail: atsCompatibility.explanation.keywordCoverage },
    { title: "Projects Match", key: "projectsMatch", weight: "10%", val: atsCompatibility.categoryScores.projectsMatch, detail: atsCompatibility.explanation.projectsMatch },
    { title: "Formatting Compliance", key: "formattingCompliance", weight: "10%", val: atsCompatibility.categoryScores.formattingCompliance, detail: atsCompatibility.explanation.formattingCompliance },
    { title: "Education Match", key: "educationMatch", weight: "10%", val: atsCompatibility.categoryScores.educationMatch, detail: atsCompatibility.explanation.educationMatch },
  ];

  const [selectedCat, setSelectedCat] = React.useState<string>("skillsMatch");
  const activeDetail = categories.find(c => c.key === selectedCat)?.detail || atsCompatibility.explanation.skillsMatch;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: ATS & Recruiter Glance */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ATS Score Card Container */}
        <div className="md:col-span-4 bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
          <CircularProgress score={atsCompatibility.overallScore} size={150} strokeWidth={11} label="ATS Compatibility" className="mt-2" />
          
          <div className="text-center mt-5">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Compatibility Tier</h4>
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
              atsCompatibility.overallScore >= 80 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : atsCompatibility.overallScore >= 60 
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}>
              <Sparkles className="w-3 h-3" />
              {atsCompatibility.overallScore >= 80 ? "Interview Ready" : atsCompatibility.overallScore >= 60 ? "Solid Alignment" : "Needs Optimization"}
            </span>
          </div>
        </div>

        {/* Recruiter Reaction Simulation */}
        <div className="md:col-span-8 bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Feature: Recruiter Simulator</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                recruiterSimulation.interviewProbability === "High" 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : recruiterSimulation.interviewProbability === "Medium" 
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>
                Interview Probability: {recruiterSimulation.interviewProbability}
              </span>
            </div>

            <p className="text-sm text-white font-medium italic leading-relaxed mb-4">
              &ldquo;{recruiterSimulation.feedbackSummary}&rdquo;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Key Recruiter Strengths
                </h5>
                <ul className="text-xs text-white/70 flex flex-col gap-1.5 list-disc pl-4 font-normal">
                  {recruiterSimulation.topStrengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Primary Concerns / Risks
                </h5>
                <ul className="text-xs text-white/70 flex flex-col gap-1.5 list-disc pl-4 font-normal">
                  {recruiterSimulation.topConcerns.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section: Category Breakdown vs Diagnostic Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Metric list block */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase tracking-wider">ATS Scoring Grid</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCat(cat.key)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                    selectedCat === cat.key
                      ? "bg-zinc-800 border-zinc-700 text-white shadow-md scale-[1.01]"
                      : "bg-[#0A0A0A] border-white/5 text-white/70 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex flex-col gap-0.5 max-w-[70%]">
                    <span className="text-xs font-semibold block truncate">{cat.title}</span>
                    <span className={`text-[10px] font-medium tracking-wide font-mono ${selectedCat === cat.key ? "text-emerald-400" : "text-white/40"}`}>
                      Weight: {cat.weight}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold font-mono ${selectedCat === cat.key ? "text-emerald-400" : "text-white"}`}>
                      {cat.val}%
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${selectedCat === cat.key ? "text-emerald-400" : "text-white/40"}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Explainable detail block */}
        <div className="lg:col-span-7">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 min-h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-emerald-400" /> Explainable Diagnostics: {categories.find(c => c.key === selectedCat)?.title}
                </h4>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  Score: {activeDetail.score}%
                </span>
              </div>

              {/* Text Why */}
              <div className="mb-4">
                <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider block mb-1">Scoring Rationale</span>
                <p className="text-xs text-white/80 bg-[#0A0A0A] p-3.5 rounded-lg border border-white/5 border-dashed leading-relaxed font-normal">
                  {activeDetail.why}
                </p>
              </div>

              {/* Factors grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block mb-1.5">Contributing Strengths</span>
                  <ul className="text-xs text-white/70 flex flex-col gap-1.5 font-normal">
                    {activeDetail.factors.map((f, i) => (
                      <li key={i} className="flex items-start gap-1 pb-1">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-rose-400 tracking-wider block mb-1.5">Missing Elements</span>
                  <ul className="text-xs text-white/70 flex flex-col gap-1.5 font-normal">
                    {activeDetail.missing.map((m, i) => (
                      <li key={i} className="flex items-start gap-1 pb-1">
                        <span className="text-rose-400 font-bold">✗</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bullet opportunities */}
              <div className="border-t border-white/5 pt-3">
                <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block mb-2">Prescribed Actions to Boost Score</span>
                <div className="flex flex-col gap-1.5">
                  {activeDetail.recommendations.map((rec, i) => (
                    <div key={i} className="text-xs text-white/70 flex items-start gap-1.5 pb-1 font-normal">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmarking Percentiles Comparison */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-400" /> Applicant Benchmarking Percentiles
        </h3>
        
        <p className="text-xs text-white/40 mb-4">
          Compares your parsed credentials against the top 10% of candidates who advanced to subsequent round interview loops.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: "Core Skills Match", val: benchmarking.skillsPercentile, color: "bg-emerald-500" },
            { label: "Project Benchmarking", val: benchmarking.projectsPercentile, color: "bg-zinc-500" },
            { label: "Work History Relevance", val: benchmarking.experiencePercentile, color: "bg-emerald-400" },
            { label: "ATS Formatting Compliance", val: benchmarking.formattingPercentile, color: "bg-zinc-400" },
            { label: "Achievements Strength", val: benchmarking.achievementsPercentile, color: "bg-emerald-600" },
          ].map((bench, idx) => (
            <div key={idx} className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1 truncate">{bench.label}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-light text-white font-mono">{bench.val}th</span>
                <span className="text-[9px] text-white/30 uppercase">Percentile</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className={`h-full ${bench.color} rounded-full`} style={{ width: `${bench.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Section Health Report */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Resume Section Integrity Health
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(sectionAnalysis).map(([sectionName, info]) => {
            const inf = info as { status: "Good" | "Weak" | "Missing" | "Overloaded"; feedback: string };
            const title = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

            let statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            if (inf.status === "Missing") statusColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
            else if (inf.status === "Weak") statusColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
            else if (inf.status === "Overloaded") statusColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";

            return (
              <div key={sectionName} className="p-4 rounded-xl border border-white/5 bg-[#0A0A0A] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{title}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {inf.status}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-normal font-normal">
                  {inf.feedback}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
