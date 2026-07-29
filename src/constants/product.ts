import type { FaqItem, ProductContent, SellingPoint } from "@/types";

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
  eyebrow: "ক্যাশ অন ডেলিভারি, দেশব্যাপী",
  title: "আপনার মূল্যবান জিনিস সর্বদা নিরাপদ রাখুন",
  subtitle:
    "MiLi MiTag দিয়ে আপনার চাবি, ব্যাগ, মানিব্যাগ বা যেকোনো গুরুত্বপূর্ণ জিনিস ট্র্যাক করুন। Android 9+ ডিভাইসে Google Find My Device নেটওয়ার্কের মাধ্যমে সহজেই খুঁজে পান।",
  // description:
  //   "Hybrid active noise cancellation, a 32-hour case, and a fit that stays put from your morning rickshaw ride to your last meeting. Order now, pay when it arrives.",
};

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