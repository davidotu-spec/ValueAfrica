import React, { useState } from "react";
import { 
  Calculator, 
  HelpCircle, 
  Check, 
  Info, 
  Mail, 
  Download, 
  ArrowRight, 
  Layers, 
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

interface SmeCalculatorProps {
  onBackToHome?: () => void;
}

export default function SmeCalculator({ onBackToHome }: SmeCalculatorProps) {
  // Inputs
  const [targetOffering, setTargetOffering] = useState<"agric" | "textiles" | "minerals" | "tech" | "crafts" | "realestate">("textiles");
  const [monthlySales, setMonthlySales] = useState<number>(3500);
  const [commissionRate, setCommissionRate] = useState<number>(10);
  const [subscriptionTier, setSubscriptionTier] = useState<"standard" | "growth" | "global">("growth");
  const [cargoTier, setCargoTier] = useState<"local" | "regional" | "global">("regional");
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Email report states
  const [email, setEmail] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success">("idle");
  const [downloadStatus, setDownloadStatus] = useState<boolean>(false);

  // Core verified configurations for all official offerings
  const offeringConfigs = {
    agric: {
      label: "Agriculture & Perishables (Agric)",
      defaultCommission: 5,
      defaultCargo: "regional" as const,
      desc: "Covers organic raw crops, cashew nuts, cocoa beans, sesame seed bulk & packaging. Standard regional African corridors apply.",
      yieldTip: "Higher cargo handling applies due to dense freight volume weights."
    },
    textiles: {
      label: "Textiles, Garments & Fashion",
      defaultCommission: 10,
      defaultCargo: "global" as const,
      desc: "Bespoke Abuja Aso-Oke weaving, Kente prints, Ankara styles, and customized premium garments safely prepared in Abuja hub.",
      yieldTip: "Higher net-yield margins owing to luxury hand-woven price tags."
    },
    minerals: {
      label: "Solid Minerals & Gemstones",
      defaultCommission: 8,
      defaultCargo: "global" as const,
      desc: "Raw Abuja industrial kaolin clays, zinc/lead ores, Bauchi tourmaline and smoky quartz crystals requiring custom cargo escrow.",
      yieldTip: "Protected by specialized weight verification logs at ocean ports."
    },
    tech: {
      label: "Tech Products & Digital SaaS",
      defaultCommission: 6,
      defaultCargo: "local" as const,
      desc: "Custom e-commerce logistics API, software outsourcing portals, remote digital hubs. No physical terminal delivery overhead.",
      yieldTip: "Highest yield payout as weight-based logistics is entirely avoided!"
    },
    crafts: {
      label: "Artisanal Crafts & Fine Heritage Arts",
      defaultCommission: 15,
      defaultCargo: "global" as const,
      desc: "Benin bronze replicates, custom hand-carved ebony wood warrior masks, leather crafts. Higher-margin artisanal structures.",
      yieldTip: "Premium collectors market value enables higher sustainable margins."
    },
    realestate: {
      label: "Real Estate & Joint Land/Warehouse Shares",
      defaultCommission: 10,
      defaultCargo: "local" as const,
      desc: "Shared commercial warehousing spaces, agro-processing lands, Abuja digital registry micro-titles in real estate.",
      yieldTip: "Payments frozen in escrow until land title registration validates."
    }
  };

  const handleOfferingChange = (type: keyof typeof offeringConfigs) => {
    setTargetOffering(type);
    setCommissionRate(offeringConfigs[type].defaultCommission);
    setCargoTier(offeringConfigs[type].defaultCargo);
  };

  // Variable helper descriptions
  const getCommissionDetail = (rate: number) => {
    if (rate <= 6) return "Agricultural inputs, Tech software contracts, or raw bulk minerals.";
    if (rate <= 11) return "Standard SME, textiles, finished fashion garments, or land deed processing.";
    return "High-end bespoke artisanal crafts, custom hand-carved art, and luxury heavy-weave textiles.";
  };

  // Logistics multipliers
  const cargoRates = {
    local: { label: "Local Delivery (Nigeria)", rate: 0.015, desc: "Intra-city hub routing & basic domestic dispatch" },
    regional: { label: "Regional Africa Route", rate: 0.035, desc: "West & East African border trade corridors & customs" },
    global: { label: "Global Export Handling", rate: 0.055, desc: "Abuja ocean/air cargo terminal consolidation & global warehousing" }
  };

  // Calculation formulas
  const subscriptionCost = {
    standard: 15,
    growth: 45,
    global: 120
  }[subscriptionTier];

  const calculatedCommission = (monthlySales * commissionRate) / 100;
  const cargoFeeMultiplier = cargoRates[cargoTier].rate;
  const calculatedCargoFee = Math.round(monthlySales * cargoFeeMultiplier);
  const totalDeductions = calculatedCommission + subscriptionCost + calculatedCargoFee;
  const netEarnings = Math.max(0, monthlySales - totalDeductions);
  const earningsPercentage = monthlySales > 0 ? ((netEarnings / monthlySales) * 100).toFixed(1) : "0.0";

  // Manual numeric change handling with robust input validation
  const handleNumericInput = (val: string) => {
    setErrorMsg("");
    if (val === "") {
      setMonthlySales(0);
      return;
    }
    const num = Number(val);
    if (isNaN(num)) {
      setErrorMsg("Please enter a valid numeric value.");
      return;
    }
    if (num < 0) {
      setErrorMsg("Projected sales cannot be negative.");
      return;
    }
    if (num > 100000) {
      setErrorMsg("Simulation limit capped at $100,000 for standard SME scaling.");
      setMonthlySales(100000);
      return;
    }
    setMonthlySales(num);
  };

  // Preset quick templates
  const applyPresetOption = (sales: number, commission: number, sub: "standard" | "growth" | "global", cargo: "local" | "regional" | "global") => {
    setMonthlySales(sales);
    setCommissionRate(commission);
    setSubscriptionTier(sub);
    setCargoTier(cargo);
    setErrorMsg("");
  };

  // Simulated Email submission
  const triggerEmailBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid business email address.");
      return;
    }
    setEmailStatus("sending");
    setTimeout(() => {
      setEmailStatus("success");
      setTimeout(() => {
        setEmailStatus("idle");
        setEmail("");
      }, 4000);
    }, 1200);
  };

  // Simulated Report Download
  const triggerDownloadReport = () => {
    setDownloadStatus(true);
    setTimeout(() => {
      setDownloadStatus(false);
      // Construct a copyable text or mock trigger
      const alertContent = `--- ValueAfrica SME Financial Projection Report ---\n` +
        `Client Projected Monthly Sales: $${monthlySales}\n` +
        `Assumed Marketplace Commission: ${commissionRate}%\n` +
        `Logistics Target Corridor: ${cargoRates[cargoTier].label}\n` +
        `Chosen Hub Support Level: ${subscriptionTier.toUpperCase()}($${subscriptionCost}/mo)\n\n` +
        `Calculated Net Retained SME Revenue: $${netEarnings} (${earningsPercentage}% of total sales Volume)\n` +
        `=======================================================\n` +
        `We are ready to align your brand. Abuja physical headquarters verified.`;
      
      const blob = new Blob([alertContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `ValueAfrica_Simulation_Report.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  // Comparitive table helper values
  const getCompareRowValues = (tier: "standard" | "growth" | "global") => {
    const cost = { standard: 15, growth: 45, global: 120 }[tier];
    const comm = (monthlySales * commissionRate) / 100;
    const cargo = Math.round(monthlySales * cargoRates[cargoTier].rate);
    const takeHome = Math.max(0, monthlySales - (comm + cost + cargo));
    const pct = monthlySales > 0 ? ((takeHome / monthlySales) * 100).toFixed(1) : "0.0";
    return { cost, totalFees: comm + cost + cargo, takeHome, pct };
  };

  return (
    <div className="bg-[#F8F7F3] py-8 sm:py-12 animate-fade-in px-4 lg:px-0">
      
      {/* Header Alert Section */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border-b border-[#E5E3DB] p-6">
        <div>
          <button 
            onClick={onBackToHome}
            className="text-xs font-bold text-[#064E3B] hover:text-[#B45309] flex items-center gap-2 mb-3 tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Company Overview</span>
          </button>
          
          <span className="text-[10px] bg-[#FEF3C7] text-[#B45309] font-extrabold px-2.5 py-1 uppercase tracking-widest inline-block">
            SME Enterprise Workspace
          </span>
          <h2 className="text-3xl font-black text-[#014230] tracking-tight mt-1">
            Seller Earnings & Commission Sandbox
          </h2>
          <p className="text-xs text-stone-500 mt-1.5 max-w-xl">
            This workspace provides a real‑time, rigorous mathematical simulation of the ValueAfrica transactional model. Plan your pricing tiers, assess global logistics corridors, and calculate your exact pay structure below.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPresetOption(1200, 5, "standard", "local")}
            className="px-3 py-1.5 bg-[#F1EFEC] hover:bg-stone-200 text-[10px] font-bold text-stone-700 border border-[#E5E3DB] uppercase tracking-wider transition-all"
          >
            Agri Trial Preset
          </button>
          <button
            onClick={() => applyPresetOption(5500, 10, "growth", "regional")}
            className="px-3 py-1.5 bg-[#F1EFEC] hover:bg-stone-200 text-[10px] font-bold text-stone-700 border border-[#E5E3DB] uppercase tracking-wider transition-all"
          >
            Mid-scale SME
          </button>
          <button
            onClick={() => applyPresetOption(12000, 15, "global", "global")}
            className="px-3 py-1.5 bg-[#F1EFEC] hover:bg-stone-200 text-[10px] font-bold text-stone-700 border border-[#E5E3DB] uppercase tracking-wider transition-all"
          >
            Premium Exporter
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-[#E5E3DB] p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest border-b border-[#E5E3DB] pb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#B45309]" />
              <span>Configure Monthly Sales parameters</span>
            </h3>

            {/* Sector Offering Selection Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                0. Select Your ValueAfrica Venture Offering:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(offeringConfigs) as Array<keyof typeof offeringConfigs>).map((key) => {
                  const conf = offeringConfigs[key];
                  const isSelected = targetOffering === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleOfferingChange(key)}
                      className={`p-2.5 text-left border transition-all rounded-sm flex flex-col justify-between ${
                        isSelected 
                          ? "bg-[#064E3B] text-white border-[#064E3B] shadow-sm transform -translate-y-0.5" 
                          : "bg-[#F8F7F3] text-stone-800 border-[#E5E3DB] hover:bg-[#F1EFEC]"
                      }`}
                      id={`cal-offering-${key}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider block">
                        {key === "agric" ? "Agric" : key === "textiles" ? "Textiles" : key === "minerals" ? "Solid Minerals" : key === "tech" ? "Tech Services" : key === "crafts" ? "Crafts" : "Real Estate"}
                      </span>
                      <span className={`text-[9px] mt-1 block font-mono ${isSelected ? "text-amber-300" : "text-[#B45309]"}`}>
                        Default {conf.defaultCommission}% Comm
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="bg-[#FEF3C7]/40 p-3 border-l-4 border-[#B45309] text-[11px] text-stone-700 leading-relaxed space-y-1">
                <span className="font-bold text-[#B45309] uppercase tracking-wider text-[10px] block">Sector Context:</span>
                <p>{offeringConfigs[targetOffering].desc}</p>
                <p className="text-[10.5px] font-mono text-emerald-800 font-bold">★ Yield Tip: {offeringConfigs[targetOffering].yieldTip}</p>
              </div>
            </div>

            {/* Parameter field 1: Monthly Sales Volume with BOTH Manual numeric input and Slider */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <span>1. Projected Monthly Sales (USD)</span>
                  <div className="group relative cursor-pointer">
                    <HelpCircle className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600" />
                    <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-900 text-white text-[10px] p-2.5 w-52 leading-normal font-normal normal-case hidden group-hover:block z-50 shadow-md">
                      Enter your projected monthly gross revenue in US Dollars. This drives the calculated transaction commission and shipping handling allocations.
                    </span>
                  </div>
                </label>

                {/* Direct Manual Numeric Input */}
                <div className="relative flex items-center w-full sm:w-40 border border-[#E5E3DB]">
                  <span className="pl-3 text-stone-400 font-bold text-xs">$</span>
                  <input
                    type="text"
                    value={monthlySales === 0 ? "" : monthlySales}
                    onChange={(e) => handleNumericInput(e.target.value)}
                    className="w-full pl-1.5 pr-3 py-1 text-right text-xs font-mono font-bold text-[#064E3B] focus:outline-none"
                    placeholder="Enter gross sales"
                    id="manual-sales-input"
                  />
                </div>
              </div>

              {/* Input error feedback message */}
              {errorMsg && (
                <p className="text-[11px] text-red-600 font-semibold">{errorMsg}</p>
              )}

              {/* Slider for quick adjustments */}
              <input
                type="range"
                min="0"
                max="25000"
                step="250"
                value={monthlySales}
                onChange={(e) => {
                  setMonthlySales(Number(e.target.value));
                  setErrorMsg("");
                }}
                className="w-full accent-[#064E3B] cursor-pointer"
                id="sales-range-slider"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>$0 Standard Start</span>
                <span>$10,000 Volume SME</span>
                <span>$25,000 International Exporter</span>
              </div>
            </div>

            {/* Parameter field 2: Commission rate select with tooltips and explanation */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <span>2. Platform Commission Matrix</span>
                  <div className="group relative cursor-pointer">
                    <HelpCircle className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600" />
                    <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-900 text-white text-[10px] p-2.5 w-56 leading-normal font-normal normal-case hidden group-hover:block z-50 shadow-md">
                      ValueAfrica uses a dynamic, category-aligned commission between 5% and 15% keeping operations highly sustainable for creators.
                    </span>
                  </div>
                </label>
                <span className="text-xs font-mono font-black text-[#014230] bg-[#FEF3C7] px-2 py-0.5 rounded-sm">
                  {commissionRate}% Commission Rate
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-[#064E3B] cursor-pointer animate-pulse-subtle"
                id="commission-range-slider"
              />

              {/* Category Helper Description - Responsive info feed */}
              <div className="p-3 bg-[#F8F7F3] border-l-4 border-[#B45309] text-[11px] space-y-1">
                <p className="font-bold text-[#B45309] uppercase tracking-wide">Category Alignment:</p>
                <p className="text-stone-600 leading-normal">{getCommissionDetail(commissionRate)}</p>
                <p className="text-[10px] text-stone-400 font-mono italic">
                  * 5% = Agriculture, 10% = Finished Standard Fashion, 15% = High-End Arts/Crafts.
                </p>
              </div>
            </div>

            {/* Parameter field 3: Dedicated Logistics Corridor Dropdown */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span>3. Coordinated Cargo & Logistics Corridor</span>
                <div className="group relative cursor-pointer">
                  <HelpCircle className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600" />
                  <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-900 text-white text-[10px] p-2.5 w-56 leading-normal font-normal normal-case hidden group-hover:block z-50 shadow-md">
                    Select your primary destination route. ValueAfrica Abuja logistics center manages direct parcel checks, air cargo export handling, and border clearance variables.
                  </span>
                </div>
              </label>

              <select
                value={cargoTier}
                onChange={(e) => setCargoTier(e.target.value as any)}
                className="w-full bg-[#F8F7F3] border border-[#E5E3DB] p-3 text-xs font-bold text-stone-800 rounded-none focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                id="cargo-corridor-select"
              >
                <option value="local">Local Delivery ({cargoRates.local.rate * 100}% flat margin allocation)</option>
                <option value="regional">Regional Pan-African Corridor ({cargoRates.regional.rate * 100}% flat margin allocation)</option>
                <option value="global">Global International Terminal Cargo ({cargoRates.global.rate * 100}% cargo/freight fee)</option>
              </select>

              <p className="text-[11px] text-stone-500 italic font-mono pl-1">
                Selected route: {cargoRates[cargoTier].desc}
              </p>
            </div>

            {/* Parameter field 4: Subscription Tiers - Clearly Radio buttons */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                4. Select Storefront Hub Tier:
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Standard Card */}
                <button
                  type="button"
                  onClick={() => setSubscriptionTier("standard")}
                  className={`p-4 text-left border relative transition-all ${
                    subscriptionTier === "standard"
                      ? "bg-[#064E3B]/5 border-2 border-[#064E3B] ring-2 ring-[#064E3B]/10 shadow-[0_4px_12px_rgba(6,78,59,0.1)]"
                      : "bg-[#F8F7F3] border-[#E5E3DB] hover:bg-[#F1EFEC] hover:border-stone-400"
                  }`}
                  id="tier-standard-btn"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black text-[#B45309] uppercase tracking-wider">STANDARD STARTER</span>
                    {subscriptionTier === "standard" && (
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#064E3B] flex-shrink-0" />
                    )}
                  </div>
                  <h4 className="text-xs font-extrabold text-stone-900 mt-1">BASIC SME</h4>
                  <p className="text-lg font-black text-[#064E3B] mt-4">$15<span className="text-[10px] text-stone-400 font-mono">/month</span></p>
                  
                  <div className="mt-3 text-[10px] text-stone-500 line-clamp-2 leading-tight">
                    Basic online storefront, standard payouts, and domestic shipping hub collection in Abuja.
                  </div>
                </button>

                {/* Growth Card */}
                <button
                  type="button"
                  onClick={() => setSubscriptionTier("growth")}
                  className={`p-4 text-left border relative transition-all ${
                    subscriptionTier === "growth"
                      ? "bg-[#064E3B]/5 border-2 border-[#064E3B] ring-2 ring-[#064E3B]/10 shadow-[0_4px_12px_rgba(6,78,59,0.1)]"
                      : "bg-[#F8F7F3] border-[#E5E3DB] hover:bg-[#F1EFEC] hover:border-stone-400"
                  }`}
                  id="tier-growth-btn"
                >
                  <span className="absolute -top-2 right-4 text-[7.5px] bg-[#B45309] text-white font-extrabold px-1.5 py-0.5 uppercase tracking-widest">
                    Recommended
                  </span>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black text-[#064E3B] uppercase tracking-wider">AFRICA GROWTH</span>
                    {subscriptionTier === "growth" && (
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#064E3B] flex-shrink-0" />
                    )}
                  </div>
                  <h4 className="text-xs font-extrabold text-stone-900 mt-1">ABUJA PREMIUM</h4>
                  <p className="text-lg font-black text-[#064E3B] mt-4">$45<span className="text-[10px] text-stone-400 font-mono">/month</span></p>
                  
                  <div className="mt-3 text-[10px] text-stone-500 line-clamp-2 leading-tight">
                    Premium storefront, custom brand packaging templates, priority container export, ad boosts.
                  </div>
                </button>

                {/* Global Dedicated Card */}
                <button
                  type="button"
                  onClick={() => setSubscriptionTier("global")}
                  className={`p-4 text-left border relative transition-all ${
                    subscriptionTier === "global"
                      ? "bg-[#064E3B]/5 border-2 border-[#064E3B] ring-2 ring-[#064E3B]/10 shadow-[0_4px_12px_rgba(6,78,59,0.1)]"
                      : "bg-[#F8F7F3] border-[#E5E3DB] hover:bg-[#F1EFEC] hover:border-stone-400"
                  }`}
                  id="tier-global-btn"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black text-[#B45309] uppercase tracking-wider">GLOBAL EXPORT HUB</span>
                    {subscriptionTier === "global" && (
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#064E3B] flex-shrink-0" />
                    )}
                  </div>
                  <h4 className="text-xs font-extrabold text-stone-900 mt-1">GLOBAL TERMINAL</h4>
                  <p className="text-lg font-black text-[#064E3B] mt-4">$120<span className="text-[10px] text-stone-400 font-mono">/month</span></p>
                  
                  <div className="mt-3 text-[10px] text-stone-500 line-clamp-2 leading-tight">
                    International multicurrency options, certified warehousing dropshipping nodes, studio photo credits.
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* Toggle for Comparison view */}
          <div className="flex justify-between items-center bg-white border border-[#E5E3DB] p-4">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-stone-900 uppercase">Compare All Storefront Options</h4>
              <p className="text-[11px] text-stone-500">Analyze Starter vs Premium side‑by‑side for your inputs.</p>
            </div>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase border tracking-widest transition-all ${
                compareMode 
                  ? "bg-[#064E3B] text-white border-[#064E3B]" 
                  : "bg-[#F8F7F3] text-[#064E3B] border-[#E5E3DB] hover:bg-[#F1EFEC]"
              }`}
              id="compare-mode-toggle"
            >
              {compareMode ? "Hide Comparison" : "Show Side-By-Side"}
            </button>
          </div>

          {/* Compare Table if active */}
          {compareMode && (
            <div className="bg-white border border-[#E5E3DB] p-6 space-y-4 animate-fade-in">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-900 border-b border-[#E5E3DB] pb-3">
                Full-Plan Comparison Matrix (Sales: ${monthlySales})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-800">
                  <thead>
                    <tr className="bg-[#F8F7F3] uppercase tracking-wider text-[10px] text-stone-500 font-mono border-b border-[#E5E3DB]">
                      <th className="p-3">Plan Option</th>
                      <th className="p-3">Monthly Subscription</th>
                      <th className="p-3">Total Cost Allocation</th>
                      <th className="p-3 text-right">Net SME Profit</th>
                      <th className="p-3 text-right">Yield Payout Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`border-b border-[#E5E3DB] ${subscriptionTier === "standard" ? "bg-[#064E3B]/5 font-bold" : ""}`}>
                      <td className="p-3">Basic $15 Tier</td>
                      <td className="p-3">$15 / mo</td>
                      <td className="p-3 text-red-600">-${getCompareRowValues("standard").totalFees}</td>
                      <td className="p-3 text-[#064E3B] font-bold text-right">${getCompareRowValues("standard").takeHome}</td>
                      <td className="p-3 text-right font-mono font-medium text-emerald-700">{getCompareRowValues("standard").pct}%</td>
                    </tr>
                    <tr className={`border-b border-[#E5E3DB] ${subscriptionTier === "growth" ? "bg-[#064E3B]/5 font-bold" : ""}`}>
                      <td className="p-3">Premium $45 Tier</td>
                      <td className="p-3">$45 / mo</td>
                      <td className="p-3 text-red-600">-${getCompareRowValues("growth").totalFees}</td>
                      <td className="p-3 text-[#064E3B] font-bold text-right">${getCompareRowValues("growth").takeHome}</td>
                      <td className="p-3 text-right font-mono font-medium text-emerald-700">{getCompareRowValues("growth").pct}%</td>
                    </tr>
                    <tr className={`${subscriptionTier === "global" ? "bg-[#064E3B]/5 font-bold" : ""}`}>
                      <td className="p-3">Global $120 Tier</td>
                      <td className="p-3">$120 / mo</td>
                      <td className="p-3 text-red-600">-${getCompareRowValues("global").totalFees}</td>
                      <td className="p-3 text-[#064E3B] font-bold text-right">${getCompareRowValues("global").takeHome}</td>
                      <td className="p-3 text-right font-mono font-medium text-emerald-700">{getCompareRowValues("global").pct}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Receipt Visualization Deck */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-[#F1EFEC] border border-[#E5E3DB] p-6 lg:p-8 space-y-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#064E3B]/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309] block">
                Calculated Live
              </span>
              <h3 className="text-xl font-black text-[#064E3B] tracking-tight uppercase">
                Enterprise Yield Receipt
              </h3>
              <p className="text-[11px] text-[#6B7280]">
                Calculations refresh instantly based on user parameters constraint metrics.
              </p>
            </div>

            {/* Calculations items with highlighted changes */}
            <div className="space-y-3.5 border-t border-b border-stone-300 py-5 text-xs text-stone-700 font-mono">
              
              <div className="flex justify-between items-center font-bold text-stone-900 font-sans text-sm pb-1.5 border-b border-stone-200">
                <span>Monthly Enterprise Sales:</span>
                <span className="text-base text-[#064E3B]">${monthlySales.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span>Variable Commission ({commissionRate}%):</span>
                </span>
                <span className="font-bold text-red-700">-${calculatedCommission.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-600">Monthly Hub Subscription Cost:</span>
                <span className="font-bold text-red-700">-${subscriptionCost}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-600">{cargoRates[cargoTier].label} Cargo ({cargoRates[cargoTier].rate * 100}%):</span>
                <span className="font-bold text-red-700">-${calculatedCargoFee.toLocaleString()}</span>
              </div>

              {/* Total deduction */}
              <div className="flex justify-between items-center pt-2 border-t border-dashed border-stone-300 text-[10.5px]">
                <span className="text-stone-500 font-sans font-bold">Total Platform Allocations:</span>
                <span className="font-bold text-red-700">-${totalDeductions.toLocaleString()}</span>
              </div>

            </div>

            {/* SME Payout summary box */}
            <div className="bg-white p-5 border-l-4 border-[#064E3B] space-y-2 relative shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black tracking-wider text-stone-400 uppercase">
                  SME NET TAKE-HOME PAYOUT
                </span>
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-[2px]">
                  {earningsPercentage}% Retained
                </span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#014230] tracking-tight">
                  ${netEarnings.toLocaleString()}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">per month</span>
              </div>

              <p className="text-[11px] text-stone-500 leading-normal pt-1.5 font-light">
                Secure transaction escrow protection is applied. Payout processed directly into verified SME destination currency nodes upon delivery hub confirmation scans.
              </p>
            </div>

            {/* Trust disclaimer/badges */}
            <div className="bg-white/45 p-4 border border-[#E5E3DB] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-stone-800">Escrow Security Guard Applied</p>
                <p className="text-[10.5px] text-stone-500 leading-snug">
                  ValueAfrica's structural ledger provides complete fraud immunity, securing payments safely in Escrow during cargo terminal transit and customs inspection.
                </p>
              </div>
            </div>

            {/* Interactive PDF & Email Report elements */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                
                <button
                  onClick={triggerDownloadReport}
                  disabled={downloadStatus}
                  className="bg-[#1A1A1A] hover:bg-stone-800 disabled:opacity-50 text-white p-3 text-[10.5px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all"
                  id="pdf-download-btn"
                >
                  <Download className={`w-3.5 h-3.5 ${downloadStatus ? "animate-bounce" : ""}`} />
                  <span>{downloadStatus ? "Generating Report..." : "Get PDF Report"}</span>
                </button>

                <a
                  href="#ai-advisor"
                  className="bg-[#064E3B] hover:bg-[#043326] text-white p-3 text-[10.5px] font-bold uppercase tracking-widest text-center block transition-all"
                >
                  Ask Advisor Group
                </a>
              </div>

              {/* Email Brief subscription form */}
              <form onSubmit={triggerEmailBrief} className="space-y-1.5 border-t border-stone-300 pt-4">
                <label className="text-[10px] font-extrabold uppercase text-[#B45309] tracking-wider block">
                  Email Me This Financial Simulation Breakdown:
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-stone-900 border border-stone-400 px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-[#064E3B] rounded-none"
                    id="receipt-email-input"
                  />
                  <button
                    type="submit"
                    className="bg-[#B45309] hover:bg-[#92400E] text-white px-3 py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 flex-shrink-0 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{emailStatus === "sending" ? "Sending..." : "Send"}</span>
                  </button>
                </div>
                {emailStatus === "success" && (
                  <p className="text-[11px] text-emerald-800 font-bold bg-emerald-100 p-2 border-l-4 border-emerald-600 transition-all">
                    ✓ Projection report submitted successfully! Please check your spam folder if it doesn't arrive in minutes.
                  </p>
                )}
              </form>
            </div>

          </div>

          {/* Quick Informational Panel covering 5% vs 10% vs 15% details */}
          <div className="bg-white border border-[#E5E3DB] p-5 space-y-3 font-sans">
            <h4 className="text-xs font-black text-[#014230] uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#B45309]" />
              <span>Understand Platform Commission Tiers</span>
            </h4>
            <div className="text-[11.5px] text-stone-600 space-y-2.5 leading-normal">
              <p>
                ValueAfrica ensures complete cost transparency. Commissions support technical marketplace development, secure escrow servers, and regional cargo drop-off warehouse leases.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold pt-1.5">
                <div className="p-2 bg-[#F8F7F3] border border-[#E5E3DB]">
                  <p className="text-stone-400">5% rate</p>
                  <p className="text-emerald-800 mt-1">Raw Agri & Perishables</p>
                </div>
                <div className="p-2 bg-[#F8F7F3] border border-[#E5E3DB]">
                  <p className="text-stone-400">10% rate</p>
                  <p className="text-emerald-800 mt-1">Standard SME & Skincare</p>
                </div>
                <div className="p-2 bg-[#F8F7F3] border border-[#E5E3DB]">
                  <p className="text-stone-400">15% rate</p>
                  <p className="text-emerald-800 mt-1">Premium Crafts & Textiles</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
