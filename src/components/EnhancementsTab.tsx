import React from "react";
import { FullAnalysisReport } from "../types";
import { ArrowLeftRight, Check, CheckCircle2, AlertTriangle, ShieldCheck, ListTodo, BadgeAlert, Award } from "lucide-react";

interface EnhancementsTabProps {
  report: FullAnalysisReport;
}

export default function EnhancementsTab({ report }: EnhancementsTabProps) {
  const { bulletPointEnhancements, formattingAnalysis, starAnalysis, coachRecommendations } = report;

  return (
    <div className="flex flex-col gap-6">
      {/* Bullet Point Enhancements before/after compare (Feature 6) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <ArrowLeftRight className="w-4 h-4 text-indigo-500 animate-pulse" /> Bullet Point Rewrites & Impact Insertion
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          ATS scanning engines and human recruiters look for active, result-oriented action verbs and measurable business impacts. Review the comparative examples below:
        </p>

        {bulletPointEnhancements.length === 0 ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs text-center border">
            ✓ Your experience bullet points are already highly optimal with excellent active phrasing and quantitative metrics!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bulletPointEnhancements.map((enh, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-slate-200 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Before / Original */}
                  <div className="p-4 bg-rose-50/10 md:border-r border-b md:border-b-0 border-slate-100">
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 border px-1.5 py-0.5 rounded uppercase tracking-wider block mb-2 w-max">
                      Original Statement (Weak)
                    </span>
                    <p className="text-xs text-slate-700 italic font-mono">&ldquo;{enh.original}&ldquo;</p>
                  </div>
                  
                  {/* After / Enhanced */}
                  <div className="p-4 bg-emerald-50/10">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border px-1.5 py-0.5 rounded uppercase tracking-wider block mb-2 w-max">
                      Rewritten Statement (Optimal Impact)
                    </span>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">&ldquo;{enh.enhanced}&ldquo;</p>
                  </div>
                </div>

                {/* Sub-analysis metrics */}
                <div className="bg-slate-50/50 p-3.5 border-t border-slate-100 text-xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="leading-relaxed">
                    <span className="font-bold text-indigo-700">Added Outcome:</span> {enh.impactAdded}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-mono">Action Verbs Used:</span>
                    {enh.actionVerbsUsed.map((av, index) => (
                      <span key={index} className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-sm border border-indigo-100">
                        {av}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STAR Method Completeness Evaluation (Feature 16) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Award className="w-4 h-4 text-yellow-500" /> STAR Method Analysis
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Evaluates whether your bullet points describe statements representing a complete **S**ituation, **T**ask, **A**ction, and **R**esult narrative context.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* STAR completeness score graph */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col justify-between h-auto">
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-1">Method Mastery Rating</span>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-black font-mono text-slate-800">{starAnalysis.starCompletenessScore}%</span>
                <span className="text-xs text-slate-500">Completeness Score</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { label: "Situation Context (S)", score: starAnalysis.breakdown.situationScore },
                { label: "Task Definition (T)", score: starAnalysis.breakdown.taskScore },
                { label: "Action Description (A)", score: starAnalysis.breakdown.actionScore },
                { label: "Result Metric (R)", score: starAnalysis.breakdown.resultScore },
              ].map((comp, key) => (
                <div key={key} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">{comp.label}</span>
                    <span className="font-mono text-slate-800 font-bold">{comp.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${comp.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback items and actionable fixes */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-2">STAR Diagnostics Feedback</span>
              <ul className="text-xs text-slate-600 flex flex-col gap-2 font-normal pl-4 list-disc mb-3 leading-relaxed">
                {starAnalysis.feedback.map((fb, idx) => (
                  <li key={idx}>{fb}</li>
                ))}
              </ul>
            </div>

            {/* Practical Correction Blueprint */}
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-2">STAR Method Optimization Examples</span>
              <div className="flex flex-col gap-3">
                {starAnalysis.examplesToFix.map((ex, i) => (
                  <div key={i} className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
                    <div className="mb-2">
                      <span className="font-bold text-slate-800 block mb-0.5">Original statement:</span>
                      <span className="italic font-mono text-[11px]">&ldquo;{ex.bullet}&rdquo;</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-rose-600 block mb-0.5">Diagnosed Defect:</span>
                      <span>{ex.missingComponent}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-600 block mb-0.5">Optimized suggestion:</span>
                      <span className="text-slate-800 font-semibold">{ex.actionImprovement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formatting scanner & Risk Assessment (Feature 8) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <BadgeAlert className="w-4 h-4 text-indigo-500" /> ATS Formatting Risks Compliance
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Primes the document against syntax parsing constraints. Columns, visual graphics, tabular elements, or specific header boxes may fail in legacy parsers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Risk Level Gauge */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Formatting Risk Grade</span>
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-mono font-black border-4 mb-2 ${
              formattingAnalysis.riskLevel === "Low" 
                ? "bg-emerald-50 text-emerald-700 border-emerald-300" 
                : formattingAnalysis.riskLevel === "Medium" 
                ? "bg-amber-50 text-amber-600 border-amber-300" 
                : "bg-rose-50 text-rose-700 border-rose-300"
            }`}>
              {formattingAnalysis.riskScore}%
            </div>

            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-xs font-bold text-slate-800">Risk Profile: {formattingAnalysis.riskLevel}</span>
              <span className="text-[10px] text-slate-400">Score Out of 100</span>
            </div>
          </div>

          {/* Individual indicators and issue statements */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2.5">Indicator Structural Audits</span>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Data Tables", val: formattingAnalysis.indicators.tables, inverse: true },
                  { label: "Multi-Columns", val: formattingAnalysis.indicators.columns, inverse: true },
                  { label: "Embedded Graphics", val: formattingAnalysis.indicators.graphics, inverse: true },
                  { label: "Bullet Icons", val: formattingAnalysis.indicators.icons, inverse: true },
                  { label: "Micro-fonts (<9pt)", val: formattingAnalysis.indicators.smallFonts, inverse: true },
                ].map((ind, i) => {
                  const hasDiscrepancy = ind.inverse ? ind.val : !ind.val;
                  return (
                    <div key={i} className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1.5 ${
                      hasDiscrepancy 
                        ? "bg-rose-50/40 border-rose-100 text-rose-800" 
                        : "bg-emerald-50/40 border-emerald-100 text-emerald-800"
                    }`}>
                      <span className="text-[10px] font-bold tracking-tight block truncate w-full">{ind.label}</span>
                      {hasDiscrepancy ? (
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      )}
                      <span className="text-[9px] uppercase font-bold text-slate-500">{hasDiscrepancy ? "Detected" : "Clean"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List issues found */}
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1.5">Actionable Formatting Remedies</span>
              {formattingAnalysis.issues.length === 0 ? (
                <div className="text-xs text-slate-600 font-normal">No structural formatting risks detected. Safe layout detected.</div>
              ) : (
                <ul className="text-xs text-slate-600 font-normal leading-relaxed flex flex-col gap-1.5">
                  {formattingAnalysis.issues.map((iss, i) => (
                    <li key={i} className="flex items-start gap-1 pb-1">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{iss}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Resume Coach ranked suggestions (Feature 9) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <ListTodo className="w-4 h-4 text-indigo-500" /> Executive AI Resume Coach
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          A prioritized checklist outlining precise adjustments suggested to enhance both computer readability and recruiter conversion percentages.
        </p>

        <div className="flex flex-col gap-3">
          {coachRecommendations.map((rec, idx) => {
            let priorityColor = "bg-rose-50 text-rose-700 border-rose-100";
            if (rec.priority === "Medium") priorityColor = "bg-amber-50 text-amber-700 border-amber-100";
            else if (rec.priority === "Low") priorityColor = "bg-blue-50 text-blue-700 border-blue-100";

            return (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${priorityColor} mt-0.5`}>
                    {rec.priority}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-extrabold text-slate-800">Target Section:</span>
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border px-1.5 rounded">
                        {rec.exactSection}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 font-normal leading-normal">{rec.change}</p>
                  </div>
                </div>

                <div className="md:min-w-[140px] text-xs text-slate-500 font-normal md:text-right border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                  <span className="font-bold text-slate-700 block mb-0.5 uppercase text-[10px] tracking-wider">Estimated Impact</span>
                  <span>{rec.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
