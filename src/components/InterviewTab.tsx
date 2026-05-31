import React, { useState } from "react";
import { FullAnalysisReport, InterviewQuestion } from "../types";
import { MessageSquareCode, HelpCircle, AlertCircle, ChevronDown, ChevronUp, Star } from "lucide-react";

interface InterviewTabProps {
  report: FullAnalysisReport;
}

export default function InterviewTab({ report }: InterviewTabProps) {
  const { interviewPrep } = report;

  // Active sub-category filtering ("technical", "behavioral", "resumeBased", "projectBased")
  const [activeCategory, setActiveCategory] = useState<"technical" | "behavioral" | "resumeBased" | "projectBased">("technical");

  // Expanded questions state tracking indices
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpand = (idx: number) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter(i => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  const currentQuestions = React.useMemo(() => {
    return interviewPrep[activeCategory] || [];
  }, [interviewPrep, activeCategory]);

  // Reset expanded questions on category shift
  React.useEffect(() => {
    setExpandedIndices([]);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-6">
      {/* Question Generator Container (Feature 18) */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
            <MessageSquareCode className="w-4 h-4 text-emerald-400 animate-pulse" /> AI-Generated Simulated Interview Prep
          </h3>
          <span className="text-[10px] uppercase font-bold text-white/40 bg-[#0A0A0A] border border-white/5 px-2 py-0.5 rounded font-mono">
            Interview Coach
          </span>
        </div>

        <p className="text-xs text-white/45 mb-5">
          Simulates standard corporate interviewer evaluations. Below are custom-crafted interview tasks, technical puzzles, and behavioral situations compiled from your resume supporting bullets and target career benchmarks.
        </p>

        {/* Sub-category selection tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/5 pb-3 mb-5 scrollbar-hidden">
          {[
            { key: "technical", label: "Technical Competencies" },
            { key: "behavioral", label: "Behavioral & STAR" },
            { key: "resumeBased", label: "Resume-Specific Inquiries" },
            { key: "projectBased", label: "Project & Design Challenges" }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat.key
                  ? "bg-[#080808] border-white/10 text-emerald-400 select-none shadow-sm"
                  : "bg-black/30 border-white/5 text-white/50 hover:bg-[#0A0A0A]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Question Cards representation */}
        <div className="flex flex-col gap-3">
          {currentQuestions.length === 0 ? (
            <div className="p-4 rounded-xl text-center bg-[#0A0A0A] border border-white/5 text-white/40 text-xs font-normal">
              No interview sample questions generated under this diagnostic category.
            </div>
          ) : (
            currentQuestions.map((q, idx) => {
              const isExpanded = expandedIndices.includes(idx);
              
              let diffColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
              if (q.difficulty === "Medium") diffColor = "bg-amber-500/10 text-amber-400 border-amber-500/25";
              else if (q.difficulty === "Hard") diffColor = "bg-rose-500/10 text-rose-400 border border-rose-500/25";

              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? "ring-1 ring-emerald-500 shadow-lg shadow-emerald-950/20 border-emerald-500/20 bg-black/45" 
                      : "border-white/5 hover:border-white/10 bg-black/25"
                  }`}
                >
                  {/* Card visible header */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-4 max-w-[85%]">
                      <div className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0 font-mono mt-0.5">
                        Q{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-normal">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${diffColor} font-mono`}>
                        {q.difficulty}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-white/45" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/45" />
                      )}
                    </div>
                  </div>

                  {/* Expanded content revealing core answers approach */}
                  {isExpanded && (
                    <div className="p-4 bg-black/35 border-t border-white/5 flex flex-col gap-3 text-xs leading-relaxed">
                      <div className="border border-white/5 rounded-xl p-4 bg-[#0A0A0A] font-normal">
                        <span className="font-bold text-emerald-400 block mb-1.5 uppercase text-[9px] tracking-wider flex items-center gap-1 font-mono">
                          <HelpCircle className="w-3.5 h-3.5 text-emerald-450" /> Recommended Strategic Answer Blueprint
                        </span>
                        <p className="text-white/80">{q.answerApproach}</p>
                      </div>

                      {/* Study Guide Action Notes */}
                      <div className="flex items-start gap-2 p-3 bg-emerald-500/5 text-xs text-white/70 rounded-lg border border-emerald-500/10 font-normal">
                        <AlertCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Interviewer Hint:</strong> Connect this answers directly back to specific bullet instances on your resume to substantiate credibility. Speak slowly, outline parameters explicitly first, then trace results.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
