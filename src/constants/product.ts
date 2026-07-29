import type { FaqItem, FeatureItem, SellingPoint, SpecItem } from "@/types";

export const site = {
  name: "MiLi Tag",
  tagline: "Earbuds tuned for real days, not showrooms",
  price: {
    current: "৳ 3,290",
    original: "৳ 4,990",
    discountLabel: "34% off, today only",
  },
  contact: {
    phone: "+880 1XXX-XXXXXX",
    email: "hello@pulsepro.example",
    address: "House 12, Road 4, Banani, Dhaka 1213",
  },
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  nav: [
    { label: "Product", href: "#product" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};

export const heroCopy = {
  eyebrow: "Cash on Delivery, nationwide",
  title: "Hear everything. Skip nothing.",
  subtitle:
    "Pulse Pro cancels the commute so you can hear the call, the track, the moment — the way it was mixed.",
  description:
    "Hybrid active noise cancellation, a 32-hour case, and a fit that stays put from your morning rickshaw ride to your last meeting. Order now, pay when it arrives.",
};

export const features: FeatureItem[] = [
  {
    id: "anc",
    title: "Hybrid ANC, tuned in three steps",
    description:
      "Dual-mic feedback and feedforward cancellation cuts traffic, fans, and chatter without flattening your music.",
  },
  {
    id: "battery",
    title: "32 hours, case included",
    description:
      "8 hours per charge, 4 more full charges in the case. A 10-minute top-up buys you 2 hours on the go.",
  },
  {
    id: "fit",
    title: "Fit that survives a full day",
    description:
      "Three silicone tip sizes and a low-profile shell keep Pulse Pro seated through workouts, commutes, and calls.",
  },
  {
    id: "sound",
    title: "11mm driver, tuned by ear",
    description:
      "A titanium-coated driver keeps bass tight and vocals forward, checked against studio reference tracks.",
  },
];

export const specs: SpecItem[] = [
  { label: "Driver", value: "11mm titanium-coated dynamic" },
  { label: "Battery (buds)", value: "Up to 8 hours, ANC on" },
  { label: "Battery (with case)", value: "Up to 32 hours total" },
  { label: "Charging", value: "USB-C, 10 min = 2 hours" },
  { label: "Connectivity", value: "Bluetooth 5.3, dual-device" },
  { label: "Water resistance", value: "IPX5, sweat and rain safe" },
  { label: "Weight", value: "4.8g per bud" },
  { label: "In the box", value: "Buds, case, 3 tip sizes, USB-C cable" },
];

export const sellingPoints: SellingPoint[] = [
  {
    id: "quality",
    title: "Premium build",
    description: "Aluminum-shell case, titanium-coated drivers, no plastic rattle.",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Check the box, pay the rider. No card, no advance payment.",
  },
  {
    id: "delivery",
    title: "Delivery in 24–72 hours",
    description: "Dhaka within a day; nationwide within three.",
  },
  {
    id: "trusted",
    title: "12,000+ orders delivered",
    description: "Rated 4.7/5 by customers across the country.",
  },
  {
    id: "easy",
    title: "One-field checkout",
    description: "Name, number, address. That's the whole order form.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "cod",
    question: "How does Cash on Delivery work?",
    answer:
      "Place your order with your name, phone number, and address. Our rider brings Pulse Pro to your door — you check it and pay in cash there. No advance payment, no card needed.",
  },
  {
    id: "delivery-time",
    question: "How long does delivery take?",
    answer:
      "Inside Dhaka, orders usually arrive within 24 hours. Outside Dhaka, expect 2–3 business days depending on your district.",
  },
  {
    id: "warranty",
    question: "Is there a warranty?",
    answer:
      "Yes. Every Pulse Pro comes with a 12-month replacement warranty covering manufacturing defects in the buds and case.",
  },
  {
    id: "return",
    question: "Can I return or exchange it?",
    answer:
      "You can inspect the product at your doorstep before paying. If anything is wrong, decline it on the spot and it goes straight back — no cost to you.",
  },
  {
    id: "battery-life",
    question: "What if the battery seems short on day one?",
    answer:
      "Give the case a full charge before first use — batteries ship at a partial charge to protect the cells in transit. Full runtime shows up from the second charge onward.",
  },
];
