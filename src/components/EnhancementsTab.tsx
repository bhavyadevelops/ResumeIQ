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
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <ArrowLeftRight className="w-4 h-4 text-emerald-400 animate-pulse" /> Bullet Point Rewrites & Impact Insertion
        </h3>

        <p className="text-xs text-white/45 mb-4">
          ATS scanning engines and human recruiters look for active, result-oriented action verbs and measurable business impacts. Review the comparative examples below:
        </p>

        {bulletPointEnhancements.length === 0 ? (
          <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs text-center">
            ✓ Your experience bullet points are already highly optimal with excellent active phrasing and quantitative metrics!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bulletPointEnhancements.map((enh, idx) => (
              <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-black/10">
                  {/* Before / Original */}
                  <div className="p-4 bg-rose-500/5 md:border-r border-b md:border-b-0 border-white/5">
                    <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider block mb-2 w-max">
                      Original Statement (Weak)
                    </span>
                    <p className="text-xs text-white/50 italic font-mono">&ldquo;{enh.original}&ldquo;</p>
                  </div>
                  
                  {/* After / Enhanced */}
                  <div className="p-4 bg-emerald-500/5">
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider block mb-2 w-max">
                      Rewritten Statement (Optimal Impact)
                    </span>
                    <p className="text-xs text-white font-semibold leading-relaxed">&ldquo;{enh.enhanced}&ldquo;</p>
                  </div>
                </div>

                {/* Sub-analysis metrics */}
                <div className="bg-black/35 p-3.5 border-t border-white/5 text-xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="leading-relaxed text-white/60">
                    <span className="font-bold text-emerald-400">Added Outcome:</span> {enh.impactAdded}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-white/40 font-mono">Action Verbs Used:</span>
                    {enh.actionVerbsUsed.map((av, index) => (
                      <span key={index} className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-sm border border-emerald-500/20">
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
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-400" /> STAR Method Analysis
        </h3>

        <p className="text-xs text-white/45 mb-4">
          Evaluates whether your bullet points describe statements representing a complete **S**ituation, **T**ask, **A**ction, and **R**esult narrative context.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* STAR completeness score graph */}
          <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-5 rounded-xl flex flex-col justify-between h-auto">
            <div>
              <span className="text-[9px] text-white/40 font-black uppercase tracking-wider block mb-1">Method Mastery Rating</span>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-light font-mono text-white">{starAnalysis.starCompletenessScore}%</span>
                <span className="text-[10px] text-white/40 uppercase">Completeness Score</span>
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
                  <div className="flex justify-between mb-1 text-white/70">
                    <span className="font-semibold">{comp.label}</span>
                    <span className="font-mono text-white font-bold">{comp.score}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${comp.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback items and actionable fixes */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-[9px] text-white/40 font-black uppercase tracking-wider block mb-2">STAR Diagnostics Feedback</span>
              <ul className="text-xs text-white/70 flex flex-col gap-2 font-normal pl-4 list-disc mb-3 leading-relaxed">
                {starAnalysis.feedback.map((fb, idx) => (
                  <li key={idx}>{fb}</li>
                ))}
              </ul>
            </div>

            {/* Practical Correction Blueprint */}
            <div className="border-t border-white/5 pt-3">
              <span className="text-[9px] text-white/40 font-black uppercase tracking-wider block mb-2">STAR Method Optimization Examples</span>
              <div className="flex flex-col gap-3">
                {starAnalysis.examplesToFix.map((ex, i) => (
                  <div key={i} className="bg-black/30 rounded-xl p-4 border border-white/5 text-xs text-white/60 leading-relaxed font-normal">
                    <div className="mb-2">
                      <span className="font-bold text-white/80 block mb-0.5">Original statement:</span>
                      <span className="italic font-mono text-[11px] text-white/45">&ldquo;{ex.bullet}&rdquo;</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-rose-400 block mb-0.5">Diagnosed Defect:</span>
                      <span>{ex.missingComponent}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-400 block mb-0.5">Optimized suggestion:</span>
                      <span className="text-white font-semibold">{ex.actionImprovement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formatting scanner & Risk Assessment (Feature 8) */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <BadgeAlert className="w-4 h-4 text-emerald-400" /> ATS Formatting Risks Compliance
        </h3>

        <p className="text-xs text-white/45 mb-4">
          Primes the document against syntax parsing constraints. Columns, visual graphics, tabular elements, or specific header boxes may fail in legacy parsers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Risk Level Gauge */}
          <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-5 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold uppercase text-white/40 tracking-wider mb-2">Formatting Risk Grade</span>
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-mono font-black border-4 mb-2 ${
              formattingAnalysis.riskLevel === "Low" 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : formattingAnalysis.riskLevel === "Medium" 
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}>
              {formattingAnalysis.riskScore}%
            </div>

            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-xs font-bold text-white">Risk Profile: {formattingAnalysis.riskLevel}</span>
              <span className="text-[10px] text-white/30 font-mono">Score Out of 100</span>
            </div>
          </div>

          {/* Individual indicators and issue statements */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-[9px] text-white/45 font-extrabold uppercase tracking-widest block mb-2.5">Indicator Structural Audits</span>
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
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400" 
                        : "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                    }`}>
                      <span className="text-[9px] font-bold tracking-tight block truncate w-full">{ind.label}</span>
                      {hasDiscrepancy ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                      <span className="text-[8px] uppercase font-bold text-white/40">{hasDiscrepancy ? "Detected" : "Clean"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List issues found */}
            <div className="border-t border-white/5 pt-3">
              <span className="text-[9px] text-white/45 font-extrabold uppercase tracking-widest block mb-1.5">Actionable Formatting Remedies</span>
              {formattingAnalysis.issues.length === 0 ? (
                <div className="text-xs text-white/50 font-normal">No structural formatting risks detected. Safe layout detected.</div>
              ) : (
                <ul className="text-xs text-white/60 font-normal leading-relaxed flex flex-col gap-1.5">
                  {formattingAnalysis.issues.map((iss, i) => (
                    <li key={i} className="flex items-start gap-1 pb-1">
                      <span className="text-amber-400 mt-0.5">•</span>
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
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <ListTodo className="w-4 h-4 text-emerald-400" /> Executive AI Resume Coach
        </h3>

        <p className="text-xs text-white/45 mb-4">
          A prioritized checklist outlining precise adjustments suggested to enhance both computer readability and recruiter conversion percentages.
        </p>

        <div className="flex flex-col gap-3">
          {coachRecommendations.map((rec, idx) => {
            let priorityColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
            if (rec.priority === "Medium") priorityColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
            else if (rec.priority === "Low") priorityColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";

            return (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-black/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${priorityColor} mt-0.5`}>
                    {rec.priority}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-white">Target Section:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 rounded">
                        {rec.exactSection}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1.5 font-normal leading-normal">{rec.change}</p>
                  </div>
                </div>

                <div className="md:min-w-[140px] text-xs text-white/40 font-normal md:text-right border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
                  <span className="font-bold text-white/65 block mb-0.5 uppercase text-[9px] tracking-wider">Estimated Impact</span>
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
