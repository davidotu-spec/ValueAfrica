import React, { useState } from "react";
import { ROADMAP_PHASES } from "../data";
import { Check } from "lucide-react";

export default function RoadmapInspector() {
  const [activeRoadmapIndex, setActiveRoadmapIndex] = useState(0);

  const activePhase = ROADMAP_PHASES[activeRoadmapIndex];

  return (
    <div id="roadmap" className="bg-white border border-[#E5E3DB] p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#B45309]">Strategic Roadmap</span>
        <h3 className="text-2xl font-black text-[#064E3B] tracking-tight mt-0.5">Four-Phase Strategic Roadmap</h3>
        <p className="text-xs text-stone-500 max-w-2xl mt-1.5 leading-relaxed">
          Plan our timeline phases from organizational setup to continuous Pan-African and international trading corridors. Click on any phase to inspect key metrics.
        </p>
      </div>

      {/* Horizontal Buttons connector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border-b border-[#E5E3DB] pb-6 mb-6">
        {ROADMAP_PHASES.map((phaseItem, index) => {
          const isActive = activeRoadmapIndex === index;
          return (
            <button
              key={phaseItem.id}
              onClick={() => setActiveRoadmapIndex(index)}
              className={`p-4 text-left border transition-all relative cursor-pointer ${
                isActive 
                  ? "bg-[#064E3B] border-[#064E3B] text-white" 
                  : "bg-[#F8F7F3] border-[#E5E3DB] hover:bg-[#F1EFEC] text-stone-800"
              }`}
              id={`roadmap-phase-${index}`}
            >
              <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? "text-[#FBBF24]" : "text-[#B45309]"} mb-1`}>
                {phaseItem.phase}
              </p>
              <h4 className="text-xs font-black truncate">{phaseItem.title}</h4>
              <p className={`text-[11px] font-mono mt-2 ${isActive ? "text-stone-200" : "text-stone-500"}`}>
                {phaseItem.timeline}
              </p>
              {isActive && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#064E3B] rotate-45 hidden md:block" />
              )}
            </button>
          );
        })}
      </div>

      {/* active Phase Deep details */}
      <div className="bg-[#F1EFEC] p-6 border border-[#E5E3DB] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#064E3B] text-white">
              {activePhase.timeline}
            </span>
            <h4 className="text-sm font-black text-stone-900 uppercase tracking-widest">
              {activePhase.title}
            </h4>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">Key Operational Objectives:</p>
            <ul className="space-y-2.5">
              {activePhase.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <span className="w-1.5 h-1.5 bg-[#B45309] mt-1.5 flex-shrink-0"></span>
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Target KPIs */}
        <div className="lg:col-span-5 bg-white p-5 border border-[#E5E3DB] space-y-4">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309]">Target KPIs & Milestones:</p>
          <div className="space-y-3">
            {activePhase.metrics.map((met, i) => (
              <div key={i} className="flex gap-2.5 items-center text-xs text-stone-800">
                <div className="w-5 h-5 bg-[#D1FAE5] text-[#065F46] flex items-center justify-center rounded-sm">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">{met}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
