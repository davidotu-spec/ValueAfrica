export interface PitchSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  points: string[];
  graphicType: "opportunity" | "solution" | "roadmap" | "financials" | "values" | "team" | "market";
  metric?: {
    value: string;
    label: string;
  };
}

export interface RoadmapPhase {
  id: number;
  phase: string;
  title: string;
  timeline: string;
  color: string;
  activities: string[];
  metrics: string[];
}

export interface TeamMember {
  id: number;
  role: string;
  iconName: string;
  description: string;
}

export interface TestimonialStorefront {
  id: number;
  productName: string;
  origin: string;
  vendorName: string;
  priceUSD: number;
  imageKeyword: string;
  tags: string[];
  imageUrl?: string;
}
