import React, { useState } from "react";
import { Sparkles, MessageSquare, Send, Loader2 } from "lucide-react";

export default function AiAdvisorChat() {
  const [visitorType, setVisitorType] = useState<string>("Investor");
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string; isFallback?: boolean }>>([
    {
      sender: "ai",
      text: "### Welcome to ValueAfrica Hub!\nI am your AI advisor. You can ask me any questions about our e-commerce platform, 5-15% commission revenue streams, our regulatory CAC compliance, or our timeline to onboard 10,000 African vendors. How can I assist you today?"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const PRESET_QUESTIONS = [
    { label: "What are the revenue streams?", query: "Can you detail the subscription options and commission structure of ValueAfrica?" },
    { label: "How does the export corridor work?", query: "How does the Abuja logistics hub and end-to-end escrow solve export bottlenecks?" },
    { label: "Is ValueAfrica CAC registered?", query: "Where is the company headquartered and registered? Tell me about the Abuja legal structure." },
    { label: "What is the 3-Year growth target?", query: "How do you intend to scale up to 10,000 vendors under your 4 Phase roadmap?" }
  ];

  const handleSendQuestion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatQuestion.trim()) return;

    const userMsg = chatQuestion;
    setChatHistory(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatQuestion("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg, visitorType })
      });
      const data = await response.json();
      
      if (data.answer) {
        setChatHistory(prev => [...prev, { sender: "ai", text: data.answer, isFallback: data.isFallback }]);
      } else {
        setChatHistory(prev => [...prev, { sender: "ai", text: "I apologize, custom systems seem busy right now. Please review our interactive decks and roadmap below for instant insights!" }]);
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { sender: "ai", text: "Connected safely via local smart offline responder. We are CAC registered in Abuja, securing 5-15% transaction commission margins, and driving to onboard 10,000 Pan-African SMEs with reliable escrow payment security." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div id="ai-advisor" className="bg-[#064E3B] border border-[#064E3B] p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#B45309]/5 rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#FBBF24]">AI Support Desk</span>
            <h3 className="text-2xl font-black tracking-tight mt-0.5 text-white flex items-center gap-2">
              <span>Ask the ValueAfrica Advisor</span>
              <Sparkles className="w-5 h-5 text-[#FBBF24]" />
            </h3>
            <p className="text-xs text-stone-200 mt-1 max-w-xl font-light">
              Direct access to business plans and structures. Ask customized parameters to receive verified corporate solutions.
            </p>
          </div>
          
          {/* Selector for visitor context to align AI tone */}
          <div className="flex items-center gap-2 bg-black/40 p-1 border border-white/10">
            <span className="text-[9px] font-extrabold uppercase px-2 tracking-wider text-stone-300">Audience:</span>
            <button
              onClick={() => setVisitorType("Investor")}
              className={`px-2.5 py-1 text-[9.5px] font-bold uppercase transition-all cursor-pointer ${
                visitorType === "Investor" ? "bg-[#B45309] text-white" : "text-stone-400 hover:text-white"
              }`}
              id="audience-investor-btn"
            >
              Investor
            </button>
            <button
              onClick={() => setVisitorType("Vendor")}
              className={`px-2.5 py-1 text-[9.5px] font-bold uppercase transition-all cursor-pointer ${
                visitorType === "Vendor" ? "bg-[#B45309] text-white" : "text-stone-400 hover:text-white"
              }`}
              id="audience-vendor-btn"
            >
              Vendor
            </button>
          </div>
        </div>

        {/* Chat Thread Container */}
        <div className="bg-stone-900/40 p-4 border border-white/10 space-y-4 max-h-[340px] overflow-y-auto font-sans leading-relaxed">
          {chatHistory.map((chat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] ${chat.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FBBF24] mb-1">
                {chat.sender === "user" ? "Visitor Inquiry" : "ValueAfrica Hub Advisor"}
              </span>
              <div className={`p-4 text-xs leading-normal ${
                chat.sender === "user" 
                  ? "bg-[#B45309] text-white" 
                  : "bg-white text-stone-900 border-l-4 border-[#FBBF24]"
              }`}>
                <div className="space-y-2 whitespace-pre-wrap">
                  {chat.text.split("\n").map((line, lIdx) => {
                    if (line.startsWith("###")) {
                      return <h5 key={lIdx} className="font-extrabold text-xs text-[#064E3B] uppercase pt-1">{line.replace("###", "").trim()}</h5>;
                    }
                    if (line.startsWith("-")) {
                      return (
                        <div key={lIdx} className="flex gap-1.5 pl-2 leading-relaxed">
                          <span className={chat.sender === "user" ? "text-stone-300" : "text-[#B45309]"}>•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    return <p key={lIdx} className="font-normal">{line}</p>;
                  })}
                </div>
                
                {chat.sender === "ai" && chat.isFallback && (
                  <div className="text-[8px] text-stone-400 border-t border-[#E5E3DB] pt-1.5 mt-2 flex items-center gap-1">
                    <span className="bg-[#FEF3C7] text-[#B45309] px-1 font-extrabold rounded-[2px]">LOCAL SMART RESPONDER</span>
                    <span>Always Active</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="flex items-center gap-2 max-w-[80%] bg-white/5 border border-white/15 p-3">
              <Loader2 className="w-4 h-4 text-[#FBBF24] animate-spin" />
              <span className="text-xs text-stone-200">ValueAfrica server is preparing brief response...</span>
            </div>
          )}
        </div>

        {/* Preset list options */}
        <div className="space-y-2 pt-1">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#FBBF24]">Quick Reference Presets:</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUESTIONS.map((pq, pqIdx) => (
              <button
                key={pqIdx}
                onClick={() => setChatQuestion(pq.query)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] transition-all text-stone-100 flex items-center gap-1 text-left cursor-pointer"
                id={`preset-question-btn-${pqIdx}`}
              >
                <MessageSquare className="w-3 h-3 text-amber-300 flex-shrink-0" />
                <span>{pq.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input box forms */}
        <form onSubmit={handleSendQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about CAC registration, escrow trust systems, 10k vendor scaling..."
            value={chatQuestion}
            onChange={(e) => setChatQuestion(e.target.value)}
            className="flex-1 bg-white text-stone-900 border border-stone-300 px-4 py-3 text-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#B45309] rounded-none"
            id="advisor-chat-input"
          />
          <button
            type="submit"
            disabled={isChatLoading || !chatQuestion.trim()}
            className="bg-[#B45309] hover:bg-[#92400E] disabled:opacity-50 text-white px-5 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
            id="submit-advisor-question"
          >
            <span>Submit</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
