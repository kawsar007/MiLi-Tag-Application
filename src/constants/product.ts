import type { FaqItem, ProductContent, SellingPoint } from "@/types";

export const site = {
  name: "Orbi GPS Tracker",
  tagline: "Earbuds tuned for real days, not showrooms",
  price: {
    current: "৳ 990",
    original: "৳ 1,150",
    discountLabel: "Save ৳ 160",
  },
  contact: {
    phone: "+880 1XXX-XXXXXX",
    email: "hello@militag.example",
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
    "MiLi MiTag Duo দিয়ে আপনার চাবি, ব্যাগ, মানিব্যাগ বা যেকোনো গুরুত্বপূর্ণ জিনিস ট্র্যাক করুন। Android 9+ ডিভাইসে Google Find My Device নেটওয়ার্কের মাধ্যমে সহজেই খুঁজে পান।",
  // description:
  //   "Hybrid active noise cancellation, a 32-hour case, and a fit that stays put from your morning rickshaw ride to your last meeting. Order now, pay when it arrives.",
};

export const sellingPoints: SellingPoint[] = [
  {
    id: "quality",
    title: "৩ মাস ওয়ারেন্টি",
    description: "যেকোনো ম্যানুফ্যাকচারিং ত্রুটিতে সম্পূর্ণ ওয়ারেন্টি কভার",
  },
  {
    id: "cod",
    title: "১ মাস রিপ্লেসমেন্ট",
    description: "সমস্যা থাকলে এক মাসের মধ্যে সম্পূর্ণ প্রতিস্থাপন",
  },
  {
    id: "delivery",
    title: "দ্রুত ডেলিভারি",
    description: "সারা বাংলাদেশে দ্রুততম সময়ে পৌঁছে যাবে",
  },
  {
    id: "trusted",
    title: "বন্ধুত্বপূর্ণ সাপোর্ট",
    description: "যেকোনো সমস্যায় রেসপন্সিভ আফটার-সেলস সার্ভিস",
  },
  {
    id: "easy",
    title: "সারপ্রাইজ গিফট",
    description: "অর্ডারের সাথে বিশেষ সারপ্রাইজ গিফট ও টেক টিপস",
  },
  {
    id: "gem",
    title: "এক্সক্লুসিভ প্রাইসিং",
    description: "বিশেষ ছাড় ও আকর্ষণীয় মূল্যে পান",
  },
];

export const whyOrbiMili: SellingPoint[] = [
  {
    id: "location",
    title: "লোকেশন ট্র্যাকিং",
    description: "Google Find My Device নেটওয়ার্কের মাধ্যমে যেকোনো জায়গা থেকে ট্র্যাক করুন",
  },
  {
    id: "bluetooth",
    title: "Bluetooth 5.2",
    description: "৮০-১০০ মিটার রেঞ্জে দ্রুত ও স্থিতিশীল সংযোগ",
  },
  {
    id: "battery",
    title: "দীর্ঘ ব্যাটারি লাইফ",
    description: "একটি CR2032 ব্যাটারিতে ৬-৮ মাস ব্যবহার করুন",
  },
  {
    id: "waterproof",
    title: "IPX67 ওয়াটারপ্রুফ",
    description: "ধুলো ও পানি প্রতিরোধী ডিজাইন",
  },
  {
    id: "android",
    title: "Android সাপোর্ট",
    description: "Android 9 বা তার উপরের সকল ডিভাইসে কাজ করে",
  },
  {
    id: "button",
    title: "ওয়ান-বাটন অ্যাক্টিভেশন",
    description: "একটি বাটন চেপে সহজেই চালু করুন",
  },
  {
    id: "temperature",
    title: "এক্সট্রিম টেম্পারেচার",
    description: "-২০°C থেকে +৬০°C পর্যন্ত কাজ করে",
  },
  {
    id: "certified",
    title: "সার্টিফায়েড কোয়ালিটি",
    description: "FCC, CE, ROHS, UKCA, PSE, CB সার্টিফাইড",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "durability",
    question: "Durability",
    answer: [
      "Working Temperature: -20~60℃",
      "Waterproofness: IP67 Waterproof",
    ],
  },
  {
    id: "design",
    question: "Design",
    answer: [
      "Materials: PC+ABS",
      "Product Weight (grams): 9.5",
      "Product Dimensions (Length x Height x Width) (mm): 38 * 38 * 9",
      "Case Weight (grams): 33",
      "Case Dimensions (Length x Height x Width) (mm): 90 * 90 * 19",
    ],
  },
  {
    id: "battery",
    question: "Battery",
    answer: [
      "Battery Hours: 8-12 Months",
      "Charging Time: Does not support charging",
      "Battery Type: Lithium Manganese Dioxide",
      "Voltage: 2.6V~3.6V",
      "Power Consumption: Up to 9.5mA (Advanced), Average 22uA (Pair)",
    ],
  },
  {
    id: "connectivity",
    question: "Connectivity",
    answer: [
      "Bluetooth Version: BLE 5.2",
      "Certifications: FCC ID, CE, RoHS, UL, PSB, CB",
      "Compatibility: Android 9 or higher and all iOS devices",
      "Physical Connection: Press the button once to turn it on",
      "Transmission Range: 80-100 meters (in open environment)",
      "BLE Transmission Power: +4dBm",
      "App Interface: iOS (Apple Find My) or Android (Google Find Hub)",
    ],
  },
  {
    id: "packing-list",
    question: "Packing List",
    answer: [
      "Product Weight (grams): 9.5",
      "Case Dimensions (Length x Height x Width) (mm): 90 * 90 * 90",
      "Key Ring: 1x",
    ],
  },
];


export const productContents: ProductContent[] = [
  {
    id: "mitag-duo",
    name: "MiTag Duo",
    image: "/mili-tag/images/icon1.webp",
  },
  {
    id: "key-ring",
    name: "Key Ring",
    image: "/mili-tag/images/icon2.avif",
  },
  {
    id: "battery",
    name: "1x CR2032 Battery",
    image: "/mili-tag/images/icon3.avif",
  },
  {
    id: "user-manual",
    name: "User Manual",
    image: "/mili-tag/images/icon4.webp",
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
      src: "/mili-tag/images/showcase/showcase1.webp",
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
      src: "/mili-tag/images/showcase/showcase2.webp",
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
      src: "/mili-tag/images/showcase/showcase3.webp",
      alt: "MiTag Duo tracker and keys resting in a tray beside a notebook and laptop",
    },
    imageSide: "right",
  },
  {
    id: "alerts-before-you-forget",
    heading: "Alerts Before You Forget",
    description:
      "Forgot your backpack at a cafe? Left your luggage behind at the airport? MiLi reminds you before small mistakes turn into stressful moments.",
    image: {
      src: "/mili-tag/images/showcase/showcase4.webp",
      alt: "Hand holding a phone showing the MiTag Duo tracking app next to a hand holding keys with the tracker attached",
    },
    imageSide: "left",
  },
];

export type DeliveryArea = "inside_dhaka" | "outside_dhaka";

export interface DeliveryOption {
  value: DeliveryArea;
  label: string;
  charge: number;
}

export const deliveryOptions: DeliveryOption[] = [
  { value: "inside_dhaka", label: "ঢাকার ভিতরে", charge: 80 },
  { value: "outside_dhaka", label: "ঢাকার বাহিরে", charge: 120 },
];

export const deliveryCharges: Record<DeliveryArea, number> = deliveryOptions.reduce(
  (acc, option) => {
    acc[option.value] = option.charge;
    return acc;
  },
  {} as Record<DeliveryArea, number>
);

export const defaultDeliveryArea: DeliveryArea = "inside_dhaka";