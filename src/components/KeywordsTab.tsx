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
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" /> Missing Keyword Identification
        </h3>

        <p className="text-xs text-white/40 mb-4">
          ATS parsers match text keywords in high-salience zones. Below are missing keywords extracted directly from the Job Description comparison, ranked by operational impact.
        </p>

        {missingKeywords.length === 0 ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center text-xs">
            🎉 Bravo! No missing keywords identified. Your resume covers all required vocabulary from the job description!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missingKeywords.map((kw, idx) => {
              let badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
              if (kw.importance === "Medium") badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
              else if (kw.importance === "Low") badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";

              return (
                <div key={idx} className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-white bg-zinc-900 border border-white/10 px-2 py-0.5 rounded shadow-sm">
                        {kw.word}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {kw.importance} Priority
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/60 font-normal leading-relaxed">
                    <span className="font-semibold text-white/80">Placement:</span> {kw.locationSuggestion}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Skills Gap Analysis & Predicted Cumulative Impact (Feature 13) */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-400" /> Skill Gaps & Estimated Score Impacts
        </h3>

        <p className="text-xs text-white/40 mb-4">
          Each missing skill represents a numeric gap. Learn or integrate these competencies securely and watch your overall ATS compatibility forecast increase sequentially.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Estimated growth forecast chart */}
          <div className="lg:col-span-1 bg-[#0A0A0A] p-5 rounded-xl border border-white/5 text-white flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-semibold text-[#E5E5E5]/40 tracking-wider uppercase block mb-1">Impact Tracker Forecast</span>
              <h4 className="text-sm font-bold text-white mb-1">Cumulative Score Trajectory</h4>
              <p className="text-xs text-white/50 mt-2 mb-4 leading-relaxed font-normal">
                Adding top priority skills scales your base ATS relevance rating sequentially:
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-white/40">Current Base Score</span>
                <span className="font-mono text-sm font-bold text-white">{skillGapAnalysis.currentScore}</span>
              </div>

              {/* Accumulate scores mathematically */}
              {(() => {
                let currentAccumScore = skillGapAnalysis.currentScore;
                return skillGapAnalysis.skillsGaps.slice(0, 3).map((gap, i) => {
                  currentAccumScore += gap.scoreImprovement;
                  return (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-normal">
                      <span className="text-white/60">After integrating &ldquo;{gap.skill}&rdquo;</span>
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
              <div className="p-4 bg-[#0A0A0A] border border-white/5 text-white/60 rounded-xl text-xs text-center">
                No skill gaps identified! You are perfectly aligned with minimum competencies of this job profile.
              </div>
            ) : (
              skillGapAnalysis.skillsGaps.map((gap, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#0A0A0A] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400 font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{gap.skill}</span>
                        <span className={`text-[9px] font-bold px-1.5 rounded-sm border ${
                          gap.priority === "High" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                          {gap.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-1 leading-normal font-normal">
                        <span className="font-semibold text-white/70">Course Recommendation:</span> {gap.resourcesSuggestion}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5 text-center md:min-w-[120px] flex md:flex-col items-center justify-between md:justify-center">
                    <span className="text-[9px] text-emerald-400 font-bold tracking-wider uppercase md:block block">Score Boost</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono flex items-center justify-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> +{gap.scoreImprovement} Compatibility
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resume Claim Validation & Credibility Report (Feature 14) */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Fingerprint className="w-4 h-4 text-emerald-400" /> Resume Claim Verification
        </h3>

        <p className="text-xs text-white/40 mb-4">
          Simulates how a skeptical recruiter parses skill claims. Checks lists of hard competencies in the Header or Skill summary against supporting narrative, projects, or work experiences to locate discrepancies.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center border border-white/5 rounded-xl p-5 mb-4 bg-black/30">
          <div className="lg:col-span-1 text-center md:border-r md:border-white/5 pr-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Verify Confidence</span>
            <span className={`text-4xl font-light font-mono ${
              claimValidation.confidenceScore >= 80 ? "text-emerald-400" : claimValidation.confidenceScore >= 60 ? "text-amber-400" : "text-rose-400"
            }`}>
              {claimValidation.confidenceScore}%
            </span>
            <span className="text-[10px] text-white/40 block mt-1.5 uppercase font-medium">Confidence Score</span>
          </div>

          <div className="lg:col-span-3 text-xs text-white/70 font-normal leading-relaxed">
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
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> All listed skills match supporting bullet narratives perfectly.
            </div>
          ) : (
            claimValidation.reports?.map((rep, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-black/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Claim Flagged: &ldquo;{rep.claim}&rdquo;</span>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${
                    rep.evidenceFound ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}>
                    {rep.evidenceFound ? "Substantiated" : "No Supporting Narrative Found"}
                  </span>
                </div>
                <p className="text-xs text-white/60 font-normal leading-normal">{rep.details}</p>
                <div className="bg-black/50 border border-white/10 rounded p-3 text-xs mt-1">
                  <span className="font-semibold text-emerald-400">Coach Guidance:</span> <span className="text-white/80">{rep.responseAction}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
