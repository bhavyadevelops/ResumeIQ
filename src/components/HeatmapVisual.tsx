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
    if (score >= 90) return "shadow-[0_0_12px_rgba(239,68,68,0.25)] border-red-500/45 ring-1 ring-red-500/20";
    if (score >= 70) return "shadow-[0_0_10px_rgba(249,115,22,0.2)] border-orange-500/45 ring-1 ring-orange-500/20";
    if (score >= 50) return "shadow-[0_0_8px_rgba(234,179,8,0.15)] border-yellow-500/45 ring-1 ring-yellow-500/20";
    return "shadow-[0_0_6px_rgba(59,130,246,0.1)] border-blue-500/45 ring-1 ring-blue-500/20";
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Symbolic Resume Page layout */}
      <div className="lg:col-span-5 bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 md:p-6 overflow-hidden shadow-inner flex flex-col items-center">
        <div className="text-xs text-white/40 mb-3 flex items-center justify-between w-full font-medium">
          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-emerald-400 animate-pulse" /> Eye-Tracking Simulator</span>
          <span className="text-[10px] bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded text-emerald-400 font-mono tracking-wider">GLANCE MOCKUP</span>
        </div>

        {/* The Page Container */}
        <div className="relative w-full max-w-[280px] min-h-[460px] bg-zinc-950 border border-white/10 rounded-md shadow-2xl p-4 flex flex-col gap-2 select-none">
          {listData.map((seg) => (
            <div
              key={seg.id}
              className={`relative cursor-pointer rounded transition-all duration-200 ${
                activeSegment === seg.id 
                  ? "ring-2 ring-emerald-500 scale-[1.02]" 
                  : "hover:scale-[1.01]"
              }`}
              style={{ height: `${seg.sizeY}px` }}
              onMouseEnter={() => setActiveSegment(seg.id)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              {/* Symbolic layout representing lines */}
              <div className="absolute inset-0 p-2 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-white uppercase tracking-tight">
                    {seg.label}
                  </span>
                  <span className="font-mono text-[8px] font-bold bg-emerald-500 text-black px-1 rounded-sm">
                    {seg.score}%
                  </span>
                </div>
                
                {/* Visual Placeholder Lines */}
                <div className="flex flex-col gap-1 w-full mt-1">
                  <div className="h-0.5 bg-white/20 rounded w-2/3"></div>
                  <div className="h-0.5 bg-white/15 rounded w-full"></div>
                  {seg.sizeY > 70 && (
                    <>
                      <div className="h-0.5 bg-white/15 rounded w-[90%]"></div>
                      <div className="h-0.5 bg-white/15 rounded w-4/5"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Thermal Heatmap Gradient Overlay */}
              <div
                className="absolute inset-0 rounded transition-opacity duration-300"
                style={{
                  backgroundColor: seg.color,
                  boxShadow: activeSegment === seg.id ? `inset 0 0 10px rgba(0,0,0,0.3)` : "none"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Numerical Heatmap breakdown */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-emerald-400" /> Recruiter Attention Hotspots
          </h3>
          
          <div className="flex flex-col gap-2.5">
            {listData.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all duration-200 ${
                  activeSegment === item.id 
                    ? `bg-[#0A0A0A] ${getRefinedGlow(item.score)}` 
                    : "bg-black/25 border-white/5"
                }`}
                onMouseEnter={() => setActiveSegment(item.id)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/40 font-mono">Attention:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/10">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* Score slider indicator */}
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.score >= 90 ? "#ef4444" : item.score >= 70 ? "#f97316" : item.score >= 50 ? "#eab308" : "#3b82f6"
                    }}
                  />
                </div>
                <p className="text-[11px] text-white/60 font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Most and Least Viewed Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Primary Focus Lanes
            </h4>
            <ul className="flex flex-col gap-1.5 font-normal">
              {data.mostViewed?.map((val, idx) => (
                <li key={idx} className="text-xs text-white/85 flex items-start gap-1 pb-1">
                  <span className="text-emerald-400 mr-1.5 font-bold">•</span>
                  <span>{val}</span>
                </li>
              )) || (
                <li className="text-xs text-white/80">Executive Summary, Work History, Professional Skills</li>
              )}
            </ul>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Lower Scrutiny Lanes
            </h4>
            <ul className="flex flex-col gap-1.5 font-normal">
              {data.leastViewed?.map((val, idx) => (
                <li key={idx} className="text-xs text-white/50 flex items-start gap-1 pb-1">
                  <span className="text-white/30 mr-1.5">▪</span>
                  <span>{val}</span>
                </li>
              )) || (
                <li className="text-xs text-white/40">Academic coarse detail lines, Header contacts</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
