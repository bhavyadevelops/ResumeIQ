import React from "react";
import { FullAnalysisReport } from "../types";
import { AlertCircle, ArrowUpRight, CheckCircle2, ShieldAlert, Sparkles, BookOpen, Fingerprint } from "lucide-react";

interface KeywordsTabProps {
  report: FullAnalysisReport;
}

export default function KeywordsTab({ report }: KeywordsTabProps) {
  const { missingKeywords, skillGapAnalysis, claimValidation } = report;

  return (
    <div className="flex flex-col gap-6">
      {/* Missing Keywords Grid (Feature 5) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Missing Keyword Identification
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          ATS parsers match text keywords in high-salience zones. Below are missing keywords extracted directly from the Job Description comparison, ranked by operational impact.
        </p>

        {missingKeywords.length === 0 ? (
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center text-xs">
            🎉 Bravo! No missing keywords identified. Your resume covers all required vocabulary from the job description!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missingKeywords.map((kw, idx) => {
              let badgeColor = "bg-rose-50 text-rose-700 border-rose-100";
              if (kw.importance === "Medium") badgeColor = "bg-amber-50 text-amber-700 border-amber-100";
              else if (kw.importance === "Low") badgeColor = "bg-blue-50 text-blue-700 border-blue-100";

              return (
                <div key={idx} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-extrabold text-slate-800 bg-white border px-2 py-0.5 rounded shadow-sm">
                        {kw.word}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {kw.importance} Priority
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                    <span className="font-semibold text-slate-700">Placement:</span> {kw.locationSuggestion}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Skills Gap Analysis & Predicted Cumulative Impact (Feature 13) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <BookOpen className="w-4 h-4 text-indigo-500" /> Skill Gaps & Estimated Score Impacts
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Each missing skill represents a numeric gap. Learn or integrate these competencies securely and watch your overall ATS compatibility forecast increase sequentially.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Estimated growth forecast chart */}
          <div className="lg:col-span-1 bg-slate-900 p-5 rounded-xl border border-slate-800 text-white flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-indigo-300 tracking-wider uppercase block mb-1">Impact Tracker Forecast</span>
              <h4 className="text-lg font-bold">Cumulative Score Trajectory</h4>
              <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
                Adding top priority skills scales your base ATS relevance rating sequentially:
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400">Current Base Score</span>
                <span className="font-mono text-sm font-black text-slate-300">{skillGapAnalysis.currentScore}</span>
              </div>

              {/* Accumulate scores mathematically */}
              {(() => {
                let currentAccumScore = skillGapAnalysis.currentScore;
                return skillGapAnalysis.skillsGaps.slice(0, 3).map((gap, i) => {
                  currentAccumScore += gap.scoreImprovement;
                  return (
                    <div key={i} className="flex items-center justify-between border-b border-slate-800/50 pb-2 text-xs">
                      <span className="text-indigo-200">After integrating &ldquo;{gap.skill}&rdquo;</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-emerald-400 font-mono">(+{gap.scoreImprovement})</span>
                        <span className="font-mono font-bold text-emerald-400">{currentAccumScore}</span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Skill gaps listed detailed */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {skillGapAnalysis.skillsGaps.length === 0 ? (
              <div className="p-4 bg-slate-50 border text-slate-600 rounded-xl text-xs text-center">
                No skill gaps identified! You are perfectly aligned with minimum competencies of this job profile.
              </div>
            ) : (
              skillGapAnalysis.skillsGaps.map((gap, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700 font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{gap.skill}</span>
                        <span className={`text-[9px] font-bold px-1.5 rounded-sm border ${
                          gap.priority === "High" ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {gap.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-normal font-normal">
                        <span className="font-semibold text-slate-700">Course Recommendation:</span> {gap.resourcesSuggestion}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center md:min-w-[100px] flex md:flex-col items-center justify-between md:justify-center">
                    <span className="text-[10px] text-emerald-700 font-bold tracking-wider uppercase md:block block">Score Boost</span>
                    <span className="text-sm font-black text-emerald-800 font-mono flex items-center justify-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" /> +{gap.scoreImprovement} Compatibility
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resume Claim Validation & Credibility Report (Feature 14) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Fingerprint className="w-4 h-4 text-violet-500" /> Resume Claim Verification
        </h3>

        <p className="text-xs text-slate-500 mb-4">
          Simulates how a skeptical recruiter parses skill claims. Checks lists of hard competencies in the Header or Skill summary against supporting narrative, projects, or work experiences to locate discrepancies.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center border-[1.5px] border-indigo-100 rounded-2xl p-5 mb-4">
          <div className="lg:col-span-1 text-center md:border-r md:border-slate-100 pr-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Verify Confidence</span>
            <span className={`text-4xl font-extrabold font-mono ${
              claimValidation.confidenceScore >= 80 ? "text-emerald-600" : claimValidation.confidenceScore >= 60 ? "text-amber-500" : "text-rose-500"
            }`}>
              {claimValidation.confidenceScore}%
            </span>
            <span className="text-xs text-slate-500 block mt-1.5">Claim Credibility Score</span>
          </div>

          <div className="lg:col-span-3 text-xs text-slate-600 font-normal leading-relaxed">
            {claimValidation.confidenceScore >= 80 ? (
              <p>
                <strong>Credibility Status: Solid.</strong> Your narrative backfills listed credentials cleanly. Major capabilities are substantiated with direct bullet evidence, leaving little room for skepticism during vetting.
              </p>
            ) : claimValidation.confidenceScore >= 60 ? (
              <p>
                <strong>Credibility Status: Partially Backed.</strong> Some technologies listed under skills do not have matching project details, internships or experience mentions. Consider expanding project logs to back them up.
              </p>
            ) : (
              <p>
                <strong>Credibility Status: Low evidence.</strong> Critical discrepancy risks found. Multiple self-professed experts listed listed frameworks that lack corresponding work logs. Fix these before submitting.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {claimValidation.reports && claimValidation.reports.length === 0 ? (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> All listed skills match supporting bullet narratives perfectly.
            </div>
          ) : (
            claimValidation.reports?.map((rep, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Claim Flagged: &ldquo;{rep.claim}&rdquo;</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${
                    rep.evidenceFound ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                  }`}>
                    {rep.evidenceFound ? "Substantiated" : "No Supporting Narrative Found"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-normal">{rep.details}</p>
                <div className="bg-white border rounded p-2 text-xs border-slate-200 mt-1">
                  <span className="font-semibold text-indigo-700">Coach Guidance:</span> {rep.responseAction}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
