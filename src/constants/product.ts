import type { FaqItem, FeatureItem, ProductContent, SellingPoint, SpecItem } from "@/types";

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
    id: "durability",
    question: "Durability",
    answer: [
      "Premium ABS + PC construction for long-lasting durability.",
      "Scratch-resistant matte finish.",
      "Lightweight yet sturdy design.",
      "Built for daily use and travel.",
    ],
  },
  {
    id: "design",
    question: "Design",
    answer: [
      "Modern ergonomic design for a comfortable fit.",
      "Compact charging case that's easy to carry.",
      "Minimalist appearance with a premium finish.",
    ],
  },
  {
    id: "battery",
    question: "Battery",
    answer: [
      "Up to 6 hours of playback on a single charge.",
      "Up to 30 hours with the charging case.",
      "Fast charging via USB-C.",
    ],
  },
  {
    id: "connectivity",
    question: "Connectivity",
    answer: [
      "Bluetooth 5.3 for a stable connection.",
      "Compatible with Android, iPhone, tablets, and laptops.",
      "Quick auto-pairing after the first connection.",
    ],
  },
  {
    id: "packing-list",
    question: "Packing List",
    answer: [
      "1 × Pulse Pro Earbuds",
      "1 × Charging Case",
      "1 × USB-C Charging Cable",
      "3 × Pairs of Silicone Ear Tips (S/M/L)",
      "1 × User Manual",
    ],
  },
];


export const productContents: ProductContent[] = [
  {
    id: "mitag-duo",
    name: "MiTag Duo",
    image: "/images/icon1.webp",
  },
  {
    id: "key-ring",
    name: "Key Ring",
    image: "/images/icon2.avif",
  },
  {
    id: "battery",
    name: "1x CR2032 Battery",
    image: "/images/icon3.avif",
  },
  {
    id: "user-manual",
    name: "User Manual",
    image: "/images/icon4.webp",
  },
];

export type ShowcaseRow = {
  id: string;
  heading: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  /** Which side the image sits on at the lg breakpoint. */
  imageSide: "left" | "right";
};

export const showcaseRows: ShowcaseRow[] = [
  {
    id: "never-lose-track",
    heading: "Never Lose Track",
    description:
      "MiTag Duo is a dual-system smart tracker for your keys, bags, luggage, and everyday essentials. Get leave-behind alerts and locate your items from your phone, so you never worry about leaving something behind.",
    image: {
      src: "/images/showcase/showcase1.webp",
      alt: "MiTag Duo tracker and keys resting in a tray beside a notebook and laptop",
    },
    imageSide: "right",
  },
  {
    id: "works-with-your-phone",
    heading: "Works with Your Phone",
    description:
      "MiTag Duo works with both Apple Find My and Google Find Hub, so you can track your essentials with the phone you already use.",
    image: {
      src: "/images/showcase/showcase2.webp",
      alt: "Hand holding a phone showing the MiTag Duo tracking app next to a hand holding keys with the tracker attached",
    },
    imageSide: "left",
  },
  {
    id: "built-for-everyday-life",
    heading: "Built for Everyday Life",
    description:
      "Rainy rides, crowded airports, coffee shop stops — MiLi is designed for everyday moments with IP67 water resistance and a replaceable battery built to last longer.",
    image: {
      src: "/images/showcase/showcase3.webp",
      alt: "MiTag Duo tracker and keys resting in a tray beside a notebook and laptop",
    },
    imageSide: "right",
  },
  {
    id: "alerts-before-you-forget",
    heading: "Alerts Before You Forget",
    description:
      "Forgot your backpack at a café? Left your luggage behind at the airport? MiLi reminds you before small mistakes turn into stressful moments.",
    image: {
      src: "/images/showcase/showcase4.webp",
      alt: "Hand holding a phone showing the MiTag Duo tracking app next to a hand holding keys with the tracker attached",
    },
    imageSide: "left",
  },
];