import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let __filename = "";
let __dirname = "";

try {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    __filename = fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
  } else {
    __dirname = process.cwd();
  }
} catch (e) {
  __dirname = process.cwd();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // LAZY INITIALIZATION of Gemini Client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        throw new Error("GEMINI_API_KEY is not configured. Please add it to your secrets or environment variables.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Pre-configured context of ValueAfrica Innovation Hub for the AI model
  const VALUE_AFRICA_CONTEXT = `
You are the interactive AI Advisor for ValueAfrica Innovation Hub.
Your goal is to answer questions from potential investors, partners, or vendors based on the company profile:

1. Overview:
ValueAfrica Innovation Hub is a one-stop digital marketplace dedicated to showcasing Africa's creativity, heritage, and economic potential.
We empower indigenous producers with global visibility, trusted e-commerce infrastructure, and seamless export pathways (headquartered in Abuja, CAC registered).

2. Distinct Sector Offerings We Standardize and Export:
- Agric (Agriculture): Organic cold-pressed West African shea butter, sun-dried Nigerian Cameroon pepper, raw crops, and export-ready agricultural inputs.
- Textiles & Fashion: Premium handwoven Abuja Aso-Oke, modern hand-crafted Ankara patterns, custom garments, and authentic indigenous fabrics.
- Solid Minerals: Raw high-grade industrial kaolin clay bulk, Bauchi cut tourmalines, smoky quartz crystals, and premium ethically mined gemstones.
- Tech: Custom localized logistics and cargo API engines, e-commerce software dashboards, and remote programming hub spaces.
- Crafts: Bespoke hand-carved ebony wood Benin warrior masks, leather products, and authentic pottery.
- Real Estate: Abuja smart commercial warehouse co-shares, kwali agricultural arable crop-land leasing shares, and secured diaspora property deeds.

3. Vision & Mission:
Vision: To become Africa's most trusted digital marketplace for indigenous products.
Mission: To empower African creators and SMEs through digital visibility, access to markets, global reach, and fair value exchange.

4. Market Opportunity & Gap:
Target Market: Local consumers, diaspora buyers, tourists, global retailers, artisans, SMEs, farmers, creators.
Producers lack digital visibility, branding/packaging support, e-commerce infrastructure, export compliance, and logistics. We bridge this.

5. Revenue Model:
- Subscriptions: Standard ($15/mo), Growth ($45/mo), Global ($120/mo).
- Commissions: Dynamically category-aligned (5% on Agric, 8% on Solid Minerals, 6% on Tech, 10% on Textiles/Real Estate, 15% on Bespoke Crafts).
- Logistics Handling and Export Margins.

6. Operational Plan (Roadmap):
Phase 1: Setup & Pilot (Months 0-3)
Phase 2: Onboarding 500+ Vendors (Months 3-6)
Phase 3: Pan-African Expansion & Mobile Apps (Months 6-12)
Phase 4: Global Warehousing & 10,000+ Vendors (Years 1-3)

Keep your answers:
- Professional, welcoming, elegant, and realistic.
- Focused on economic opportunities, cultural pride, and empowerment.
- Concise and structured with clear paragraphs or bullet points showing off our specialized offerings.
- Refer to ValueAfrica in the first-person plural ("We", "Our platform").
  `;

  // API Route for Gemini Q&A
  app.post("/api/ask", async (req, res) => {
    try {
      const { question, visitorType } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required." });
      }

      // Check if API client can be initialized
      try {
        const ai = getGeminiClient();
        const systemPrompt = `${VALUE_AFRICA_CONTEXT}\n\nThe user is asking as a: ${visitorType || "Visitor"}. Respond properly tailored to this audience.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: question,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        return res.json({ answer: response.text });
      } catch (geminiError: any) {
        console.warn("Gemini Client could not be initialized or failed, using custom smart local responder:", geminiError.message);
        
        // Return a beautiful, helpful local smart fallback answer so it never fails
        const matchedFallback = getSmartLocalFallback(question.toLowerCase(), visitorType);
        return res.json({ 
          answer: matchedFallback,
          isFallback: true 
        });
      }
    } catch (e: any) {
      return res.status(500).json({ error: e.message || "An unexpected error occurred." });
    }
  });

  // Smart local responder in case Gemini API is not configured or fails
  function getSmartLocalFallback(q: string, type?: string): string {
    const isInvestor = type === "Investor";
    const isVendor = type === "Vendor";

    if (q.includes("offering") || q.includes("agric") || q.includes("textile") || q.includes("mineral") || q.includes("solid mineral") || q.includes("tech") || q.includes("craft") || q.includes("real estate") || q.includes("realestate")) {
      return `### Verified ValueAfrica Sector Offerings
We organize and standardized 6 high-growth indigenous and enterprise sectors across our platform lanes:
- **Agriculture & Perishables (Agric)**: Organically certified West African shea butter, hot sun-dried Cameroon pepper, cocoa, seed oils, and premium farm crops. (5% Commission)
- **Textiles & Garments**: Bespoke handwoven Abuja Aso-Oke, multi-colored Ankara fabric rolls, custom corporate crafts, and designer garments. (10% Commission)
- **Solid Minerals**: Raw high-grade industrial kaolin clay blocks, Bauchi premium cut tourmaline, and smoky quartz crystals. (8% Commission)
- **Tech & SaaS**: Custom logistics API keys, e-commerce support panels, and digital programming workspace leases. (6% Commission)
- **Artisanal Crafts**: Custom hand-carved ebony Benin masks, hand-stitched leather wallets, and Nigerian fine pottery. (15% Commission)
- **Real Estate Shares**: Shared commercial logistics warehouse deeds, Kwali FCT farm terrain leases, and diaspora agricultural security assets. (10% Commission)`;
    }

    if (q.includes("revenue") || q.includes("business model") || q.includes("earn") || q.includes("monet")) {
      return `### Our Diverse Revenue Streams
ValueAfrica Innovation Hub secures robust financial sustainability through multiple validated channels:
- **Transaction Commissions**: 5% to 15% commission on sales transacted across our escrow-powered marketplace.
- **Vendor Subscriptions**: Multi-tiered premium storefront packages (Starter, Growth, Global Export) offering advanced analytics, priority placement, and branding.
- **Logistic & Export Service Fees**: Logistics handling margins on domestic and international container runs.
- **Value-Added Support**: Direct monetization of packaging design, professional photography, verification/compliance testing, and featured advertising listings.
- **Educational Modules & Expo Fairs**: Masterclass subscriptions and virtual trade exhibition entries.`;
    }

    if (q.includes("market") || q.includes("grow") || q.includes("competit") || q.includes("gap") || q.includes("opportunity")) {
      return `### Elegant Market Positioning & Gateway Access
ValueAfrica captures a premium underserved sector:
- **Target Segments**: Empowering the diaspora longing for authentic indigenous items, tourists seeking verified premium African crafts, and global business-to-business retailers.
- **Our True Differentiator**: We don't just list products; we build transactional trust with an integrated **Escrow Protection system**, branding alignment, and direct verification to resolve logistics bottlenecks. It is the ultimate Pan-African gateway.`;
    }

    if (q.includes("timeline") || q.includes("phase") || q.includes("operational") || q.includes("plan") || q.includes("milestone")) {
      return `### Focused Execution Roadmap
We are executing a highly structured, lower-risk growth pathway:
- **Phase 1 (Months 0–3)**: Focus on robust legal setup, pilot branding, headquarters deployment, and Abuja core network setup.
- **Phase 2 (Months 3–6)**: Launch vendor onboarding drive with a target of 500 active verification-cleared creators.
- **Phase 3 (Months 6–12)**: Release custom mobile platform and expand into high-growth West & East African corridors.
- **Phase 4 (Years 1–3)**: Activate global logistics warehouses and secure international retail compliance frameworks.`;
    }

    if (q.includes("vendor") || q.includes("sell") || q.includes("onboard") || q.includes("join")) {
      return `### Empowering African Vendors & SMEs
Welcome! ValueAfrica is designed with creators like you in mind:
- **Global Reach**: We translate local crafts into international commodities with complete support in export compliance and shipping container logistics.
- **Storefront Infrastructure**: Easily list your agricultural, fashion, artisanal, or creative goods with real-time analytics.
- **Guaranteed Payouts**: We safeguard transactions via deep escrow integration, ensuring prompt payment upon verified delivery.`;
    }

    if (q.includes("export") || q.includes("shipping") || q.includes("logistic") || q.includes("deliver")) {
      return `### Integrated Logistics & Export Channels
Logistics and quality are major bottlenecks for African exporters. ValueAfrica solves this by:
- **Local Consolidation**: Abuja-based logistics hub for domestic product drop-offs, quality compliance checks, and professional packaging support.
- **End-to-End Escrow**: Buyer payment is held in holding until delivery is verified, eliminating fraud and building outstanding trust.
- **International Partnerships**: Direct partnerships with global freight carriers to enable air and sea cargo export handling.`;
    }

    // Default polite responses matching visitor context
    if (isInvestor) {
      return `### Partner with ValueAfrica Innovation Hub
Thank you for your inquiry. ValueAfrica operates at the strategic intersection of high-margin e-commerce, export trade facilitation, and SME empowerment across the African continent. 

With a registered business in Abuja, a clear financial system (5-15% commission, value-added packaging services, and vendor subscriptions), and a projection of reaching **10,000 verified vendors in 3 years**, we present a highly attractive, scale-to-growth investment proposition. We would love to discuss seed-funding options or strategic logistics partnerships with your investment desk. To inspect full numbers, explore our Interactive Pitch Deck and Project Roadmap views.`;
    } else if (isVendor) {
      return `### Elevate Your Brand Globally
Yes! ValueAfrica transforms how African entrepreneurs sell. We provide you with a unified online storefront, integrated escrow for transparent buyer-seller safety, and Abuja-based branding/packaging support. 

By joining ValueAfrica, your products gain global exposure and reliable delivery pathways to international buyers. Use our **Vendor Sandbox** section below to simulate your projected earnings and learn how our subscription models reward premium craftsmanship.`;
    }

    return `### Welcome to ValueAfrica Innovation Hub
We are Africa's ultimate e-commerce gateway connecting verified local artisans, SMEs, and farmers directly to buyers worldwide.

**How we assist you:**
- **For Investors**: We leverage e-commerce trust deficits, providing a high-growth platform with robust transactional revenues.
- **For Vendors**: We solve the triple threats of visibility, payment fraud, and export shipping logistics, providing digital storefronts.
- **For Global Buyers**: We guarantee cultural authenticity, strict product verification testing, and escrow payment safety.

Please explore our interactive views or ask any questions concerning our business model, operational phases, or vendor support!`;
  }

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ValueAfrica Backend Server listenting on http://localhost:${PORT}`);
  });
}

startServer();
