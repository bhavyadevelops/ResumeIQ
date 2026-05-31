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
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <MessageSquareCode className="w-4 h-4 text-indigo-500 animate-pulse" /> AI-Generated Simulated Interview Prep
          </h3>
          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 border px-2 py-0.5 rounded font-mono">
            Feature 18: Interview Coach
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-5">
          Simulates standard corporate interviewer evaluations. Below are custom-crafted interview tasks, technical puzzles, and behavioral situations compiled from your resume supporting bullets and target career benchmarks.
        </p>

        {/* Sub-category selection tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 pb-3 mb-5 scrollbar-hidden">
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
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Question Cards representation */}
        <div className="flex flex-col gap-3">
          {currentQuestions.length === 0 ? (
            <div className="p-4 rounded-xl text-center bg-slate-50 border text-slate-500 text-xs">
              No interview sample questions generated under this diagnostic category.
            </div>
          ) : (
            currentQuestions.map((q, idx) => {
              const isExpanded = expandedIndices.includes(idx);
              
              let diffColor = "bg-green-50 text-green-700 border-green-200";
              if (q.difficulty === "Medium") diffColor = "bg-amber-50 text-amber-700 border-amber-200";
              else if (q.difficulty === "Hard") diffColor = "bg-rose-50 text-rose-700 border-rose-200";

              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden bg-white ${
                    isExpanded 
                      ? "ring-1 ring-indigo-500 shadow-md border-indigo-200" 
                      : "border-slate-100 hover:border-slate-300"
                  }`}
                >
                  {/* Card visible header */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0 font-mono mt-0.5">
                        Q{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-normal">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${diffColor} font-mono`}>
                        {q.difficulty}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded content revealing core answers approach */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3 text-xs leading-relaxed">
                      <div className="border-[1.5px] border-indigo-100 rounded-xl p-4 bg-white shadow-sm font-normal">
                        <span className="font-bold text-indigo-700 block mb-1.5 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" /> Recommended Strategic Answer Blueprint
                        </span>
                        <p className="text-slate-700">{q.answerApproach}</p>
                      </div>

                      {/* Study Guide Action Notes */}
                      <div className="flex items-start gap-1.5 p-2 bg-indigo-50/30 text-[11px] text-slate-600 rounded-lg border border-indigo-100/30 font-normal">
                        <AlertCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
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
