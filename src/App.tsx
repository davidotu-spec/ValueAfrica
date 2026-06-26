import React, { useState, useEffect } from "react";
import { 
  THE_TEAM 
} from "./data";
import { 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Layers, 
  Cpu, 
  Globe, 
  Megaphone, 
  Wallet, 
  Users,
  ExternalLink,
  BookOpen
} from "lucide-react";

// Import our modularized view sub-components
import SmeCalculator from "./components/SmeCalculator";
import PitchDeck from "./components/PitchDeck";
import RoadmapInspector from "./components/RoadmapInspector";
import ShowroomCatalog from "./components/ShowroomCatalog";
import AiAdvisorChat from "./components/AiAdvisorChat";

export default function App() {
  // Hash/tab state router
  const [currentTab, setCurrentTab] = useState<"overview" | "calculator">("overview");

  // Sync hash routing so going to #calculator or #overview routes correctly in the standard frame
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#calculator") {
        setCurrentTab("calculator");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentTab("overview");
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Manual navigation helper
  const navigateToTab = (tab: "overview" | "calculator") => {
    setCurrentTab(tab);
    window.location.hash = tab === "calculator" ? "#calculator" : "#overview";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper matching Lucide icon string keys from the dataset
  const renderTeamIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase className="w-4 h-4 text-[#B45309]" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-[#B45309]" />;
      case "Layers": return <Layers className="w-4 h-4 text-[#B45309]" />;
      case "Users": return <Users className="w-4 h-4 text-[#B45309]" />;
      case "Globe": return <Globe className="w-4 h-4 text-[#B45309]" />;
      case "Megaphone": return <Megaphone className="w-4 h-4 text-[#B45309]" />;
      case "Wallet": return <Wallet className="w-4 h-4 text-[#B45309]" />;
      default: return <Users className="w-4 h-4 text-[#B45309]" />;
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#F8F7F3] text-[#1A1A1A] font-sans flex flex-col antialiased selection:bg-[#FEF3C7] selection:text-[#B45309]">
      
      {/* Top Professional Header - Geometric Balance Styling */}
      <header className="w-full bg-white border-b border-[#E5E3DB] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Solid V-geometric block */}
          <button 
            onClick={() => navigateToTab("overview")} 
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            id="header-logo-btn"
          >
            <div className="w-10 h-10 bg-[#064E3B] rounded-none flex items-center justify-center text-white font-bold text-xl select-none">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tighter leading-none text-[#064E3B]">VALUEAFRICA</h1>
                <span className="text-[10px] bg-[#FEF3C7] text-[#B45309] font-extrabold px-1.5 py-0.5 rounded-sm">CAC VERIFIED</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B45309]">Innovation Hub</p>
                <span className="text-stone-300 text-[10px] select-none">•</span>
                <p className="text-[9.5px] italic font-semibold text-stone-500 tracking-wide">...Source, Connect & Grow</p>
              </div>
            </div>
          </button>

          {/* Nav Jumps / Route toggles */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
            <button 
              onClick={() => navigateToTab("overview")}
              className={`hover:text-[#064E3B] border-b-2 py-2 transition-all cursor-pointer ${
                currentTab === "overview" ? "text-[#064E3B] border-[#064E3B]" : "border-transparent text-stone-500"
              }`}
              id="nav-overview-tab"
            >
              Enterprise Hub
            </button>
            <button 
              onClick={() => navigateToTab("calculator")}
              className={`hover:text-[#064E3B] border-b-2 py-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "calculator" ? "text-[#064E3B] border-[#064E3B]" : "border-transparent text-stone-500"
              }`}
              id="nav-calculator-tab"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Sandbox Calculator</span>
            </button>
            {currentTab === "overview" && (
              <>
                <a href="#pitch-deck" className="hover:text-[#064E3B] border-b-2 border-transparent py-2 transition-all">Pitch Deck</a>
                <a href="#roadmap" className="hover:text-[#064E3B] border-b-2 border-transparent py-2 transition-all">Roadmap</a>
                <a href="#marketplace" className="hover:text-[#064E3B] border-b-2 border-transparent py-2 transition-all">Showroom</a>
              </>
            )}
          </nav>

          {/* Quick Context Controls */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
            <div className="hidden lg:block text-right pr-3 border-r border-[#E5E3DB]">
              <span className="text-[#6B7280] block text-[9px]">WEST AFRICA DECK</span>
              <span className="text-[#064E3B]">ABUJA HEADQUARTERS</span>
            </div>
            
            <button
              onClick={() => navigateToTab(currentTab === "overview" ? "calculator" : "overview")}
              className="bg-[#064E3B] hover:bg-[#043326] text-white px-4 py-2.5 transition-all text-xs flex items-center gap-2 tracking-widest cursor-pointer"
              id="header-action-btn"
            >
              {currentTab === "overview" ? (
                <>
                  <span>PROJECTION SANDBOX</span>
                  <Calculator className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>VIEW COMPANY VISION</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Accent Section - High Impact design banner */}
      <section className="bg-gradient-to-r from-[#064E3B] to-[#043d2f] text-white py-12 px-4 shadow-sm relative overflow-hidden">
        <div className="absolute right-10 -bottom-10 w-96 h-96 border-[12px] border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute left-1/3 -top-20 w-64 h-64 border-[4px] border-amber-500/10 rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#FBBF24]">Nigeria's Premium Export Gateway</span>
              <span className="text-white/20 text-xs hidden sm:inline">|</span>
              <span className="text-xs uppercase tracking-[0.15em] font-extrabold text-[#FEF3C7] italic">...Source, Connect & Grow</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ValueAfrica Hub
            </h2>
            <p className="text-sm lg:text-base text-stone-200 max-w-2xl font-light leading-relaxed">
              We resolve the triple commerce bottlenecks of trade: lack of digital visibility, payment trust hazards, and cargo export compliance clearance bottlenecks. Presenting an institutional-grade investment framework and marketplace ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-1">
              <span className="bg-emerald-900/40 border border-emerald-500/20 text-stone-200 text-[10px] px-3 py-1 font-bold">
                Abuja Hub Nodes
              </span>
              <span className="bg-emerald-900/40 border border-emerald-500/20 text-stone-200 text-[10px] px-3 py-1 font-bold">
                5% - 15% Sustained Commission Margins
              </span>
              <span className="bg-emerald-900/40 border border-emerald-500/20 text-stone-200 text-[10px] px-3 py-1 font-bold">
                Direct SME Escrow Guards
              </span>
            </div>
          </div>
          
          {/* Quick Platform Metrics Frame */}
          <div className="lg:col-span-4 bg-white/95 text-stone-900 p-6 shadow-xl border-l-[6px] border-[#B45309] flex flex-col justify-between">
            <div>
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#B45309] mb-1">PLATFORM ROADMAP SCALE</p>
              <h3 className="text-3xl font-black text-[#014230] leading-none mb-1">10,000+</h3>
              <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">Pan-African Verified Vendors</p>
              <p className="text-[11px] text-[#4B5563] mt-2 mb-4 leading-relaxed">
                Systematically structured to onboard, standardize and facilitate direct worldwide logistics and escrow transactions over 36 months.
              </p>
            </div>
            
            <button
              onClick={() => navigateToTab(currentTab === "overview" ? "calculator" : "overview")}
              className="text-xs font-bold text-[#064E3B] hover:text-[#B45309] flex items-center gap-1.5 transition-all uppercase tracking-widest text-left"
              id="hero-toggle-btn"
            >
              <span>{currentTab === "overview" ? "Open Simulator Sandbox" : "View Operations Hub"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Container Layout */}
      {currentTab === "calculator" ? (
        <div className="flex-1 bg-[#F8F7F3]">
          <SmeCalculator onBackToHome={() => navigateToTab("overview")} />
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar Column - Vision & Inherent Values (Span 3 Cols) */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Direct Big Call To Action to solve "Calculator is buried" issue */}
            <div className="bg-[#B45309] text-white p-6 shadow-md border-t-4 border-[#014230] space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FEF3C7] block">
                Interactive Simulator
              </span>
              <h3 className="text-lg font-black tracking-tight leading-snug">
                Is our 15% margin sustainable for you?
              </h3>
              <p className="text-[11px] text-stone-100 font-light leading-relaxed">
                Do not guess. Explore other revenue streams, cargo export fees, tier support levels, and see your retained take‑home volumes live.
              </p>
              <button
                onClick={() => navigateToTab("calculator")}
                className="w-full bg-white text-stone-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#F8F7F3] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                id="sidebar-sandbox-cta"
              >
                <span>OPEN CALCULATOR</span>
                <Calculator className="w-3.5 h-3.5 text-[#B45309]" />
              </button>
            </div>

            {/* Company Profile Quick Facts */}
            <div className="bg-[#064E3B] text-white p-7 shadow-sm border border-[#064E3B]">
              <div className="bg-black/20 p-4 border-l-4 border-[#FBBF24] mb-6">
                <span className="text-[10px] uppercase tracking-widest font-black text-stone-300 block mb-1">Corporate Motto</span>
                <p className="text-sm italic font-extrabold tracking-wide text-white">
                  "...Source, Connect & Grow"
                </p>
              </div>

              <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[#FBBF24] mb-4">THE VISION</h3>
              <p className="text-lg font-medium tracking-tight leading-snug mb-6">
                "To become Africa’s most trusted digital marketplace for authentic indigenous products."
              </p>
              
              <hr className="border-white/20 mb-6" />

              <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[#FBBF24] mb-4">CORE MANDATE</h3>
              <p className="text-xs text-stone-200 leading-relaxed mb-6">
                To empower African creators and SMEs through comprehensive digital visibility, direct global market access, integrated cargo pathways, and escrow payment protection.
              </p>

              <hr className="border-white/20 mb-6" />

              <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[#FBBF24] mb-3">OUR CORE VALUES</h3>
              <ul className="text-xs space-y-3 font-medium text-stone-100">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FBBF24]"></span> 
                  <span>Cultural Pride & Identity</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FBBF24]"></span> 
                  <span>Fair Trade & Compensation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FBBF24]"></span> 
                  <span>Inclusive SME Scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FBBF24]"></span> 
                  <span>Unyielding Escrow Integrity</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FBBF24]"></span> 
                  <span>Digital E-Commerce Excellence</span>
                </li>
              </ul>
            </div>

            {/* Quick Regulatory Card */}
            <div className="bg-white p-6 border border-[#E5E3DB] shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F1EFEC] text-[#064E3B] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-[#B45309] uppercase tracking-wider">REGULATORY STATUS</p>
                  <h4 className="text-xs font-black text-stone-900 uppercase">CAC Nigeria Registered</h4>
                  <p className="text-[11px] text-[#6B7280] leading-relaxed">
                    Corporate Affairs Commission verified legal entity. Abuja operations desk and physical collection nodes fully licensed for export trade.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Node Info */}
            <div className="bg-[#F1EFEC] p-6 border border-[#E5E3DB] space-y-4">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-stone-500 block">HEADQUARTERS</span>
              <div className="flex items-center gap-2.5 text-xs text-stone-800">
                <MapPin className="w-4 h-4 text-[#B45309]" />
                <div>
                  <p className="font-bold">Federal Capital Territory</p>
                  <p className="text-stone-500">Abuja, Nigeria</p>
                </div>
              </div>
              <div className="text-[11px] text-[#4B5563] pt-2 leading-relaxed border-t border-stone-300">
                ValueAfrica Hub connects international terminal buyers with certified domestic production hubs.
              </div>
            </div>
          </aside>

          {/* Right Dashboard Area (Span 9 Cols) */}
          <section className="lg:col-span-9 space-y-12">
            
            {/* SECTION 1: INTERACTIVE PITCH DECK SLIDESHOW */}
            <PitchDeck />

            {/* VALUEAFRICA INTEGRATED SYSTEM MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-[#E5E3DB] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mb-4">
                    <Cpu className="w-5 h-5 animate-pulse-subtle" />
                  </div>
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest mb-2">E-Commerce Showcase</h4>
                  <p className="text-[11.5px] text-[#6B7280] leading-relaxed">
                    Multi-national buyer visibility dashboards customized to capture authentic handicraft, skincare, and crop profiles directly.
                  </p>
                </div>
                <p className="text-[9px] font-mono font-bold text-[#B45309] mt-4">PHASE 2 READY</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E3DB] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mb-4">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest mb-2">Escrow Financial Safety</h4>
                  <p className="text-[11.5px] text-[#6B7280] leading-relaxed">
                    Buyer assets are frozen in secure local contract ledger nodes, paid out instantly to SME drawers upon confirmed cargo dispatch terminal scans.
                  </p>
                </div>
                <p className="text-[9px] font-mono font-bold text-[#B45309] mt-4">100% SECURE ESCROWS</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E3DB] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mb-4">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest mb-2">Abuja Logistics Hub</h4>
                  <p className="text-[11.5px] text-[#6B7280] leading-relaxed">
                    Centralized physically verified drop-off containers, standardized export packaging guides, and fast-track shipping alignments in Abuja.
                  </p>
                </div>
                <p className="text-[9px] font-mono font-bold text-[#B45309] mt-4">NIGERIAN CUSTOMS INTEGRATED</p>
              </div>
            </div>

            {/* SECTION 2: THE ROADMAP INSPECTOR */}
            <RoadmapInspector />

            {/* SECTION 3: SHOWROOM PRODUCTS CATALOG PREVIEW */}
            <ShowroomCatalog />

            {/* SECTION 4: LIVE AI CHAT ADVISOR */}
            <AiAdvisorChat />

            {/* SECTION 5: TEAM ROLES AND STRUCTURE */}
            <div className="bg-white border border-[#E5E3DB] p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B45309]">Organizational Structure</span>
                <h3 className="text-2xl font-black text-[#064E3B] tracking-tight">Abuja Headquarters & Leadership Team</h3>
                <p className="text-xs text-stone-500 max-w-xl mt-1.5 leading-relaxed">
                  Our strategic multi-department team structure built to execute secure cross-border transactions and verify supply pipelines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {THE_TEAM.map((member) => (
                  <div key={member.id} className="p-5 border border-[#E5E3DB] bg-[#F8F7F3] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center rounded-sm">
                        {renderTeamIcon(member.iconName)}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-stone-950 uppercase">{member.role}</h4>
                        <p className="text-[9px] text-[#B45309] tracking-wider uppercase font-extrabold font-mono">ValueAfrica Division</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#4B5563] font-light leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6: WEB COPY BRIEF */}
            <div className="bg-[#F1EFEC] border border-[#E5E3DB] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#B45309] uppercase tracking-widest block">ASSETS & CORPORATE BRIEF</span>
                  <h4 className="text-lg font-black text-stone-900 tracking-tight">Ready-to-Print ValueAfrica Briefs</h4>
                  <p className="text-xs text-stone-600 max-w-lg leading-relaxed font-light">
                    Need a formatted brief printout or presentation outline? Click options below to copy raw formatted copy text directly.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`ValueAfrica Innovation Hub\nRegistered under CAC Nigeria. Physical Hub in Federal Capital Territory, Abuja.\nRevenue Model: 5-15% scalable transaction commission, monthly seller subscription brackets ($15 / $45 / $120).\nStrategic Goal: Onboard 10k verified Pan-African sellers in 36 months.`);
                      alert("Corporate summary brief copied to clipboard!");
                    }}
                    className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-stone-850 text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    id="copy-one-pager-btn"
                  >
                    Copy One-Pager Outline
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`ValueAfrica 4-Phase Roadmap Timeline:\nPhase 1: Setup & CAC Pilot Launch (Months 0-3)\nPhase 2: Seller Dashboard & Traction (Months 3-6)\nPhase 3: Border Logistics & Apps Expand (Months 6-12)\nPhase 4: Global Warehousing & Scalability (Years 1-3)`);
                      alert("Detailed Roadmap summary copied to clipboard!");
                    }}
                    className="px-4 py-2.5 bg-white hover:bg-stone-200 text-stone-900 border border-[#E5E3DB] text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    id="copy-roadmap-btn"
                  >
                    Copy Roadmap Text
                  </button>
                </div>
              </div>
            </div>

          </section>

        </main>
      )}

      {/* Structured Footer with CAC Status information */}
      <footer className="bg-white border-t border-[#E5E3DB] py-10 mt-16 text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#E5E3DB] pb-8">
            
            <button 
              onClick={() => navigateToTab("overview")} 
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
              id="footer-logo-btn"
            >
              <div className="w-8 h-8 bg-[#064E3B] text-white font-black flex items-center justify-center text-sm">V</div>
              <div>
                <p className="font-black text-stone-900 leading-none">VALUEAFRICA HUB</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[9px] text-[#B45309] uppercase font-bold tracking-wider">FEDERAL REPUBLIC OF NIGERIA</p>
                  <span className="text-stone-300 text-[10px] select-none">•</span>
                  <p className="text-[9.5px] italic font-semibold text-stone-500 tracking-wide">...Source, Connect & Grow</p>
                </div>
              </div>
            </button>

            <div className="flex flex-wrap gap-6 text-[10px] uppercase font-bold tracking-widest text-[#6B7280]">
              <span onClick={() => navigateToTab("overview")} className="hover:text-[#064E3B] cursor-pointer">Investor Deck</span>
              <span onClick={() => navigateToTab("calculator")} className="hover:text-[#064E3B] cursor-pointer">SME Simulator</span>
              <span onClick={() => navigateToTab("overview")} className="hover:text-[#064E3B] cursor-pointer">Abuja Logistics</span>
              <span onClick={() => navigateToTab("overview")} className="hover:text-[#064E3B] cursor-pointer">Escrow Safety Checks</span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 font-mono gap-4">
            <span>© 2026 ValueAfrica Hub. All rights, designs and systems reserved.</span>
            <div className="flex gap-4">
              <span>CAC Nigeria Registry No: RC492041</span>
              <span className="text-[#064E3B] font-bold">Abuja physical headquarters verified</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
