export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface SellingPoint {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ProductContent {
  id: string;
  name: string;
  image?: string; // optional image path
}