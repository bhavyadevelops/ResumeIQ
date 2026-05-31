import React, { useState } from "react";
import { RecruiterAttentionHeatmap } from "../types";
import { Eye, Flame, AlertCircle } from "lucide-react";

interface HeatmapVisualProps {
  data: RecruiterAttentionHeatmap;
}

export default function HeatmapVisual({ data }: HeatmapVisualProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const { sectionScoresByKeys, listData } = React.useMemo(() => {
    const scores = data.sectionScores || {
      header: 85,
      summary: 95,
      education: 70,
      experience: 90,
      projects: 60,
      skills: 95,
      certifications: 30
    };

    const items = [
      { id: "header", label: "Contact & Header", score: scores.header, sizeY: 50, color: getThermalColor(scores.header), desc: "Includes candidate identity, contact options, profiles, and initial layout balance." },
      { id: "summary", label: "Executive Summary", score: scores.summary, sizeY: 60, color: getThermalColor(scores.summary), desc: "High attention sector where recruiters form their immediate 2-second impressions." },
      { id: "skills", label: "Professional Skills", score: scores.skills, sizeY: 70, color: getThermalColor(scores.skills), desc: "Direct competence checklist scanner. Critical for immediate technical vetting." },
      { id: "experience", label: "Work History", score: scores.experience, sizeY: 130, color: getThermalColor(scores.experience), desc: "Most heavily scrutinized structural block; proves long-term consistency and responsibility." },
      { id: "projects", label: "Academic & Personal Projects", score: scores.projects, sizeY: 80, color: getThermalColor(scores.projects), desc: "Crucial secondary domain representing practical capabilities and independent drives." },
      { id: "education", label: "Academic Background", score: scores.education, sizeY: 50, color: getThermalColor(scores.education), desc: "Credentials, GPA, and major. Primarily scanned for minimum job standards." },
      { id: "certifications", label: "Credentials & Badges", score: scores.certifications, sizeY: 45, color: getThermalColor(scores.certifications), desc: "Frequently scanned briefly to verify certifications or specific compliance claims." }
    ];

    return { sectionScoresByKeys: scores, listData: items };
  }, [data]);

  function getThermalColor(score: number) {
    if (score >= 90) return "rgba(239, 68, 68, 0.45)"; // Hot red
    if (score >= 70) return "rgba(249, 115, 22, 0.35)"; // Warm orange
    if (score >= 50) return "rgba(234, 179, 8, 0.25)"; // Mild yellow
    return "rgba(59, 130, 246, 0.15)"; // Soft blue
  }

  function getRefinedGlow(score: number) {
    if (score >= 90) return "shadow-[0_0_12px_rgba(239,68,68,0.25)] border-red-300";
    if (score >= 70) return "shadow-[0_0_10px_rgba(249,115,22,0.2)] border-orange-300";
    if (score >= 50) return "shadow-[0_0_8px_rgba(234,179,8,0.15)] border-yellow-300";
    return "shadow-[0_0_6px_rgba(59,130,246,0.1)] border-blue-200";
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Symbolic Resume Page layout */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6 overflow-hidden shadow-inner flex flex-col items-center">
        <div className="text-xs text-slate-400 mb-3 flex items-center justify-between w-full">
          <span className="flex items-center gap-1.5 font-medium"><Eye className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Eye-Tracking Simulator</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-indigo-400">Glance Mode</span>
        </div>

        {/* The Page Container */}
        <div className="relative w-full max-w-[280px] min-h-[460px] bg-white border border-slate-200 rounded-md shadow-2xl p-4 flex flex-col gap-2 select-none relative">
          {listData.map((seg) => (
            <div
              key={seg.id}
              className={`relative cursor-pointer rounded transition-all duration-200 ${
                activeSegment === seg.id 
                  ? "ring-2 ring-indigo-500 scale-[1.02]" 
                  : "hover:scale-[1.01]"
              }`}
              style={{ height: `${seg.sizeY}px` }}
              onMouseEnter={() => setActiveSegment(seg.id)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              {/* Symbolic layout representing lines */}
              <div className="absolute inset-0 p-2 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-slate-800 uppercase tracking-tight">
                    {seg.label}
                  </span>
                  <span className="font-mono text-[9px] font-bold bg-slate-950 text-white px-1 rounded-sm">
                    {seg.score}%
                  </span>
                </div>
                
                {/* Visual Placeholder Lines */}
                <div className="flex flex-col gap-1 w-full mt-1">
                  <div className="h-1 bg-slate-300 rounded w-2/3"></div>
                  <div className="h-1 bg-slate-200 rounded w-full"></div>
                  {seg.sizeY > 70 && (
                    <>
                      <div className="h-1 bg-slate-200 rounded w-[90%]"></div>
                      <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Thermal Heatmap Gradient Overlay */}
              <div
                className="absolute inset-0 rounded transition-opacity duration-300"
                style={{
                  backgroundColor: seg.color,
                  boxShadow: activeSegment === seg.id ? `inset 0 0 10px rgba(0,0,0,0.15)` : "none"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Numerical Heatmap breakdown */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Flame className="w-4 h-4 text-orange-500" /> Recruiter Attention Hotspots
          </h3>
          
          <div className="flex flex-col gap-2.5">
            {listData.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  activeSegment === item.id 
                    ? `bg-slate-50 ${getRefinedGlow(item.score)}` 
                    : "bg-white border-slate-100"
                }`}
                onMouseEnter={() => setActiveSegment(item.id)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-mono">Attention Rating:</span>
                    <span className="font-mono text-xs font-extrabold text-slate-900 border px-1.5 py-0.5 rounded bg-slate-50">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* Score slider indicator */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.score >= 90 ? "#ef4444" : item.score >= 70 ? "#f97316" : item.score >= 50 ? "#eab308" : "#3b82f6"
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-600 font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Most and Least Viewed Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Primary Focus Lanes
            </h4>
            <ul className="flex flex-col gap-1">
              {data.mostViewed?.map((val, idx) => (
                <li key={idx} className="text-xs text-emerald-700 flex items-start gap-1 pb-1">
                  <span className="text-emerald-500 mt-0.5 font-bold">•</span>
                  <span>{val}</span>
                </li>
              )) || (
                <li className="text-xs text-emerald-600">Executive Summary, Work History, Professional Skills</li>
              )}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Lower Scrutiny Lanes
            </h4>
            <ul className="flex flex-col gap-1">
              {data.leastViewed?.map((val, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-1 pb-1">
                  <span className="text-slate-400 mt-0.5">▪</span>
                  <span>{val}</span>
                </li>
              )) || (
                <li className="text-xs text-slate-500">Academic coarse detail lines, Header contacts</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
