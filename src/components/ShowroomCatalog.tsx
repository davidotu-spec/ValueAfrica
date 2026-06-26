import React, { useState } from "react";
import { SIMULATED_PRODUCTS } from "../data";
import { Check } from "lucide-react";

export default function ShowroomCatalog() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const tagsList = ["All", "Agric", "Textiles", "Solid Minerals", "Tech", "Crafts", "Real Estate", "Artisanal", "Heritage"];
  
  const filteredProducts = selectedTag === "All" 
    ? SIMULATED_PRODUCTS 
    : SIMULATED_PRODUCTS.filter(p => p.tags.includes(selectedTag));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div id="marketplace" className="bg-white border border-[#E5E3DB] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 border-b border-[#E5E3DB] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#B45309]">SME Showroom Catalog</span>
          <h3 className="text-2xl font-black text-[#064E3B] tracking-tight">Authentic Marketplace Catalog</h3>
          <p className="text-xs text-stone-500 max-w-xl mt-1.5 leading-relaxed">
            A look at some of the authentic indigenous products representing our active pilot partner networks. Click a tag to filter products.
          </p>
        </div>
        
        {/* Tag selection filters */}
        <div className="flex flex-wrap gap-1.5 max-w-md">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-[9.5px] font-mono font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                selectedTag === tag 
                  ? "bg-[#064E3B] text-white border-[#064E3B]" 
                  : "bg-[#F8F7F3] text-stone-600 border-[#E5E3DB] hover:bg-stone-200"
              }`}
              id={`showroom-tag-${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border border-[#E5E3DB] bg-white group flex flex-col justify-between hover:shadow-md transition-all">
            
            {/* Visualizer card header representation */}
            <div className="h-44 bg-[#F1EFEC] relative overflow-hidden p-4 flex flex-col justify-between items-start">
              {p.imageUrl ? (
                <>
                  <img 
                    src={p.imageUrl} 
                    alt={p.productName} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-950/65 z-0"></div>
                </>
              ) : (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#064E3B]/5 rounded-bl-full group-hover:bg-[#064E3B]/10 transition-colors pointer-events-none"></div>
              )}
              
              <div className="flex flex-wrap gap-1 relative z-10 w-full justify-between items-center">
                <div className="flex gap-1">
                  {p.tags.slice(0, 2).map((tg, k) => (
                    <span key={k} className={`text-[8px] font-extrabold px-1.5 py-0.5 uppercase tracking-wider ${
                      p.imageUrl 
                        ? "bg-[#064E3B] text-white border border-[#064E3B]" 
                        : "bg-white border border-[#E5E3DB] text-stone-600"
                    }`}>
                      {tg}
                    </span>
                  ))}
                </div>
                {p.imageUrl && (
                  <span className="text-[7.5px] bg-[#FEF3C7] text-[#B45309] font-sans font-black px-1 py-0.5 uppercase tracking-wider">Verified Asset</span>
                )}
              </div>

              <div className="w-full text-center space-y-1 my-auto relative z-10">
                <p className={`text-[9px] tracking-widest font-mono uppercase font-black ${
                  p.imageUrl ? "text-[#FBBF24]" : "text-[#B45309]"
                }`}>ValueAfrica Verified</p>
                <h5 className={`text-[12px] font-black truncate px-2 tracking-tight ${
                  p.imageUrl ? "text-white" : "text-stone-700"
                }`}>{p.vendorName}</h5>
              </div>

              <p className={`text-[8.5px] uppercase font-mono mt-auto relative z-10 ${
                p.imageUrl ? "text-stone-300" : "text-stone-400"
              }`}>Abuja Dispatch Node</p>
            </div>

            {/* General Card Description info */}
            <div className="p-4 space-y-2">
              <p className="text-[9.5px] text-stone-500 font-extrabold tracking-wider uppercase block">{p.origin}</p>
              <h4 className="font-extrabold text-stone-900 text-xs line-clamp-2 h-8 leading-snug">
                {p.productName}
              </h4>
              <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                <span className="text-stone-500 text-[10.5px]">Origin Payout Setup</span>
                <span className="text-xs font-black text-[#064E3B]">{formatCurrency(p.priceUSD)}</span>
              </div>
            </div>

            {/* Escrow badge flag */}
            <div className="p-3 bg-[#F8F7F3] border-t border-[#E5E3DB] flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
              <span className="text-[#064E3B] flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Escrow Guarded
              </span>
              <span className="text-[#B45309]">Cargo Ready</span>
            </div>
            
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-stone-400 text-xs italic">
            No pilot catalog items listed under this filter. Complete additional training in the Sandbox above.
          </div>
        )}
      </div>
    </div>
  );
}
