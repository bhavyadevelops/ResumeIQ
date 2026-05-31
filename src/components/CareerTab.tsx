import React, { useState } from "react";
import { FullAnalysisReport } from "../types";
import { FolderGit2, Compass, Award, Cpu, Sparkles, Trophy, CalendarDays, ThumbsUp, ThumbsDown } from "lucide-react";

interface CareerTabProps {
  report: FullAnalysisReport;
}

export default function CareerTab({ report }: CareerTabProps) {
  const { projectAnalysis, targetRoleVersions, careerTrajectory } = report;

  // Active role tab selection inside the resume version generator
  const [activeRoleName, setActiveRoleName] = useState<string>("Software Engineer");
  const activeRoleData = targetRoleVersions.find(r => r.role === activeRoleName) || targetRoleVersions[0] || {
    role: "Software Engineer",
    summary: "Professional software developer.",
    suggestedSkillsToAdd: ["Docker", "Kubernetes"],
    focusBulletPoints: ["Developed standard api blocks."]
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Project Quality Diagnostics (Feature 10) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <FolderGit2 className="w-4 h-4 text-indigo-500" /> Professional & Personal Project Quality Analysis
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Evaluates listed portfolios for business impact, technical depth, and overall validation criteria. Computer parsers scrutiny these items to determine technical complexity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left panel: overall project score card */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Overall Project Grade</span>
              <div className="flex items-baseline gap-1.5 mb-2 mt-1">
                <span className="text-3xl font-black font-mono">{projectAnalysis.score}%</span>
                <span className="text-xs text-slate-400">Diagnostic Score</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                Represents cumulative technical complexity, toolstack variety, framework difficulty, and business context alignment.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4 border-t border-slate-800 pt-3">
              <div className="text-xs">
                <span className="text-indigo-300 font-bold block mb-1">Strengths:</span>
                <ul className="text-slate-300 flex flex-col gap-1 list-disc pl-4 font-normal">
                  {projectAnalysis.strengths.slice(0, 2).map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs border-t border-slate-800/50 pt-3">
                <span className="text-rose-400 font-bold block mb-1">Vulnerabilities:</span>
                <ul className="text-slate-300 flex flex-col gap-1 list-disc pl-4 font-normal">
                  {projectAnalysis.weaknesses.slice(0, 2).map((we, i) => (
                    <li key={i}>{we}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right panel: Parsed Projects listed with detail score breakdown */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase">Individual Project Diagnostics</span>
            
            {projectAnalysis.projectsParsed.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border text-slate-500 text-xs text-center font-normal">
                No individual projects parsed or found to analyze on the uploaded resume.
              </div>
            ) : (
              projectAnalysis.projectsParsed.map((proj, idx) => (
                <div key={idx} className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                  <div className="flex items-center justify-between border-b border-indigo-50 pb-2 mb-3">
                    <span className="text-xs font-bold text-slate-800">{proj.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-mono">Project Depth:</span>
                      <span className="text-xs font-black font-mono text-indigo-700 bg-indigo-50 border px-1.5 py-0.5 rounded">
                        {proj.depthScore}%
                      </span>
                    </div>
                  </div>

                  {/* Core metric slider breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    {[
                      { l: "Complexity", val: proj.scoreBreakdown.complexity, bg: "bg-indigo-600" },
                      { l: "Impact", val: proj.scoreBreakdown.impact, bg: "bg-emerald-600" },
                      { l: "Innovation", val: proj.scoreBreakdown.innovation, bg: "bg-blue-600" },
                    ].map((m, key) => (
                      <div key={key} className="p-2.5 bg-white border border-slate-100/50 rounded-lg text-xs flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-600">{m.l}</span>
                          <span className="font-mono text-slate-700 font-bold">{m.val}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${m.bg} rounded-full`} style={{ width: `${m.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div className="text-xs bg-white rounded-lg p-3 border border-slate-50">
                    <span className="font-bold text-indigo-700 block mb-1">Remedy Suggestion:</span>
                    <ul className="text-slate-600 list-disc pl-4 flex flex-col gap-1 font-normal">
                      {proj.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resume Version Generator - 5 role-specific varieties (Feature 17) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Sparkles className="w-4 h-4 text-violet-500" /> Targeted Role Variants Generator
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Adapt your primary resume keywords dynamically for specific specialized career directions. Select a career track to view optimized profile summaries, bullet points, and essential skill modifiers.
        </p>

        {/* Horizontal list of tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hidden border-b border-slate-100">
          {targetRoleVersions.map((roleObj) => (
            <button
              key={roleObj.role}
              onClick={() => setActiveRoleName(roleObj.role)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                activeRoleName === roleObj.role
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {roleObj.role}
            </button>
          ))}
        </div>

        {/* Dynamic content rendering */}
        <div className="p-5 bg-slate-50/40 rounded-xl border border-slate-100 border-dashed grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Optimized Summary Bio</span>
              <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border leading-relaxed font-normal italic shadow-sm">
                &ldquo;{activeRoleData.summary}&rdquo;
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Salient Bullet Points (High Conversion)</span>
              <div className="flex flex-col gap-2">
                {activeRoleData.focusBulletPoints.map((b, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border text-xs text-slate-700 leading-normal font-semibold flex items-start gap-2 shadow-sm">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Critical Core Additions</span>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold block mb-2">Priority Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {activeRoleData.suggestedSkillsToAdd.map((s, idx) => (
                  <span key={idx} className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-50 border text-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Trajectory Analyzer & Timeline Steps (Feature 19) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Compass className="w-4 h-4 text-indigo-500" /> Projected Employability Roadmaps
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Plot your sequential technical readiness journey. Integrating the requested steps increases your direct interview conversion likelihood over our predicted timeline.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Readiness gauge */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Current Readiness Score</span>
            <div className="text-4xl font-black font-mono text-indigo-300 mt-1 mb-2">
              {careerTrajectory.currentReadinessScore}%
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${careerTrajectory.currentReadinessScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
              Based on active listings comparison. Completing your sequential timeline bumps this projection.
            </p>
          </div>

          {/* Sequential Timeline Map */}
          <div className="lg:col-span-8 flex flex-col gap-4 relative border-l border-slate-200 ml-4 pl-6">
            {careerTrajectory.timelineRoadmap.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] top-1 w-5 h-5 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold text-slate-800 z-10">
                  {idx + 1}
                </div>

                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all duration-200">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-800">{item.step}</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border px-1.5 py-0.5 rounded font-mono">
                        <CalendarDays className="w-3 h-3 text-slate-400" /> {item.duration}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-mono">
                        Readiness Target: {item.expectedReadinessScore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
