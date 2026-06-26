import React, { useState } from "react";
import { PITCH_SLIDES } from "../data";
import { ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";

export default function PitchDeck() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const currentSlide = PITCH_SLIDES[activeSlideIndex];

  return (
    <div id="pitch-deck" className="bg-white border border-[#E5E3DB] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 mb-6 border-b border-[#E5E3DB] gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#B45309]">Strategic Overview</span>
          <h3 className="text-2xl font-black text-[#064E3B] tracking-tight">Interactive Pitch Deck</h3>
        </div>
        
        {/* Carousel slide controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button 
            onClick={() => setActiveSlideIndex(prev => prev > 0 ? prev - 1 : PITCH_SLIDES.length - 1)}
            className="p-2 border border-[#E5E3DB] bg-[#F8F7F3] hover:bg-[#E5E3DB] text-stone-800 transition-all cursor-pointer"
            id="pitch-prev-btn"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-mono font-bold px-3">
            Slide {activeSlideIndex + 1} of {PITCH_SLIDES.length}
          </span>
          
          <button 
            onClick={() => setActiveSlideIndex(prev => prev < PITCH_SLIDES.length - 1 ? prev + 1 : 0)}
            className="p-2 border border-[#E5E3DB] bg-[#F8F7F3] hover:bg-[#E5E3DB] text-stone-800 transition-all cursor-pointer"
            id="pitch-next-btn"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] bg-[#064E3B]/10 text-[#064E3B] font-extrabold tracking-widest px-2.5 py-1 rounded-sm uppercase inline-block">
              {currentSlide.category}
            </span>
            <h4 className="text-2xl font-black text-stone-900 tracking-tight leading-tight mt-1">
              {currentSlide.title}
            </h4>
            
            {currentSlide.metric && (
              <p className="text-xs text-[#B45309] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B45309]"></span>
                {currentSlide.metric.value} • {currentSlide.metric.label}
              </p>
            )}
            
            <p className="text-sm font-medium text-stone-700 leading-relaxed pt-1.5">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="bg-[#F8F7F3] p-5 border-l-4 border-[#064E3B] space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Key Focus Objectives:</p>
            <ul className="text-xs space-y-2.5 text-stone-700 font-light">
              {currentSlide.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic slide visual layout */}
        <div className="lg:col-span-5 bg-[#F1EFEC] border border-[#E5E3DB] p-6 flex flex-col justify-between relative overflow-hidden min-h-[260px] lg:min-h-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#064E3B]/5 rounded-bl-full pointer-events-none"></div>

          <div className="flex-1 flex flex-col justify-center items-center py-4 relative z-10 transition-all duration-300">
            {currentSlide.graphicType === "values" && (
              <div className="text-center space-y-3">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-[#064E3B] flex items-center justify-center text-white text-3xl font-black">V</div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#B45309]"></div>
                </div>
                <p className="text-[10px] font-mono tracking-widest text-[#B45309] uppercase font-bold">ValueAfrica Hub</p>
                <span className="text-[11px] text-stone-500 block">Abuja, Nigeria</span>
              </div>
            )}

            {currentSlide.graphicType === "opportunity" && (
              <div className="w-full space-y-3 px-2">
                <div className="flex justify-between text-[10px] font-bold text-stone-500">
                  <span>VENDOR COMMERCE GAP</span>
                  <span className="text-red-700">80% UNCONNECTED</span>
                </div>
                <div className="w-full bg-stone-300 h-2.5 rounded-none overflow-hidden">
                  <div className="bg-[#B45309] h-full" style={{ width: "80%" }}></div>
                </div>
                <p className="text-[10.5px] text-stone-500 italic text-center leading-relaxed">
                  Indigenous creators are cut off from direct export corridors & global transaction standards.
                </p>
              </div>
            )}

            {currentSlide.graphicType === "solution" && (
              <div className="grid grid-cols-2 gap-2 w-full text-center">
                <div className="p-3 bg-white border border-[#E5E3DB]">
                  <p className="text-lg font-black text-[#064E3B]">Escrow</p>
                  <p className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Safe Payments</p>
                </div>
                <div className="p-3 bg-white border border-[#E5E3DB]">
                  <p className="text-lg font-black text-[#064E3B]">Abuja Node</p>
                  <p className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Direct Export Prep</p>
                </div>
              </div>
            )}

            {currentSlide.graphicType === "financials" && (
              <div className="text-center space-y-2">
                <p className="text-5xl font-black text-[#064E3B] leading-none">15%</p>
                <p className="text-[9.5px] uppercase tracking-widest font-extrabold text-[#B45309]">Max Variable Commission</p>
                <p className="text-stone-500 text-[11px] leading-snug">Sustainable & honest trade model.</p>
              </div>
            )}

            {currentSlide.graphicType === "market" && (
              <div className="space-y-2 w-full text-xs font-mono">
                <div className="p-2.5 bg-white flex justify-between border-l-4 border-[#B45309]">
                  <span>Global Diaspora:</span>
                  <span className="font-bold text-stone-900">High Demand</span>
                </div>
                <div className="p-2.5 bg-white flex justify-between border-l-4 border-[#064E3B]">
                  <span>International B2B:</span>
                  <span className="font-bold text-stone-900">Export Ready</span>
                </div>
              </div>
            )}

            {currentSlide.graphicType === "roadmap" && (
              <div className="text-center space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#B45309]">Strategic growth timeline</p>
                <p className="text-2xl font-black text-stone-950">4 Solid Phases</p>
                <p className="text-[11px] text-stone-500">From Abuja setup to international hubs.</p>
              </div>
            )}
          </div>

          {currentSlide.metric && (
            <div className="border-t border-[#E5E3DB] pt-3 text-center lg:text-left">
              <p className="text-2xl font-black text-[#064E3B] leading-none">
                {currentSlide.metric.value}
              </p>
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                {currentSlide.metric.label}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Manual picker dots */}
      <div className="flex gap-2 justify-center pt-6 mt-6 border-t border-[#E5E3DB]">
        {PITCH_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlideIndex(i)}
            className={`h-2 transition-all cursor-pointer ${
              activeSlideIndex === i ? "w-8 bg-[#B45309]" : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
            title={`Go to Slide: ${slide.title}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
