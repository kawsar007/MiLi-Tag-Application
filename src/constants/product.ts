import type { FaqItem, ProductContent, SellingPoint } from "@/types";

export const site = {
  name: "MiLi Tag",
  tagline: "Earbuds tuned for real days, not showrooms",
  price: {
    current: "৳ 990",
    original: "৳ 1,200",
    discountLabel: "17.5% off, today only",
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
    "MiLi MiTag দিয়ে আপনার চাবি, ব্যাগ, মানিব্যাগ বা যেকোনো গুরুত্বপূর্ণ জিনিস ট্র্যাক করুন। Android 9+ ডিভাইসে Google Find My Device নেটওয়ার্কের মাধ্যমে সহজেই খুঁজে পান।",
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

export const faqs: FaqItem[] = [
  {
    id: "durability",
    question: "স্থায়িত্ব",
    answer: [
      "কার্যকরী তাপমাত্রা: -২০~৬০℃",
      "জলরোধীতা: আইপি৬৭ জলরোধী",
    ],
  },
  {
    id: "design",
    question: "ডিজাইন",
    answer: [
      "উপাদান: পিসি+এবিএস",
      "পণ্যের ওজন (গ্রাম): ৯.৫",
      "পণ্যের মাপ (দৈর্ঘ্য x উচ্চতা x প্রস্থ) (মিমি): ৩৮ * ৩৮ * ৯",
      "কেসের ওজন (গ্রাম): ৩৩",
      "কেসের মাপ (দৈর্ঘ্য x উচ্চতা x প্রস্থ) (মিমি): ৯০ * ৯০ * ১৯",
    ],
  },
  {
    id: "battery",
    question: "ব্যাটারি",
    answer: [
      "ব্যাটারির আয়ু: ৮-১২ মাস",
      "চার্জ করার সময়: চার্জিং সমর্থন করে না",
      "ব্যাটারির ধরণ: লিথিয়াম ম্যাঙ্গানিজ ডাই অক্সাইড",
      "ভোল্টেজ: ২.৬ভোল্ট~৩.৬ভোল্ট",
      "পাওয়ার ব্যবহার: সর্বোচ্চ ৯.৫mA (অ্যাডভান্সড), গড় ২২uA (জোড়ায়)",
    ],
  },
  {
    id: "connectivity",
    question: "সংযোগ",
    answer: [
      "ব্লুটুথ সংস্করণ: বিএলই ৫.২",
      "সনদপত্র: এফসিসি আইডি, সিই, আর ও এইচ এস, ইউকেসিএ, পিএসই, সিবি",
      "সামঞ্জস্যপূর্ণ: অ্যান্ড্রয়েড ৯ বা তার উপরের সংস্করণ এবং সকল আইওএস ডিভাইসের সাথে সামঞ্জস্যপূর্ণ",
      "ভৌত সংযোগ: চালু করতে একবার বোতাম চাপুন",
      "ট্রান্সমিশন দূরত্ব: ৮০-১০০ মিটার (খোলা পরিবেশে)",
      "বিএলই ট্রান্সমিট পাওয়ার: +৪ডিবিএম",
      "অ্যাপ ইন্টারফেস: আইওএস (অ্যাপল ফাইন্ড মাই) অথবা অ্যান্ড্রয়েড (গুগল ফাইন্ড হাব)",
    ],
  },
  {
    id: "packing-list",
    question: "প্যাকিং তালিকা",
    answer: [
      "পণ্যের ওজন (গ্রাম): ৯.৫",
      "কেসের মাপ (দৈর্ঘ্য x প্রস্থ x উচ্চতা) (মিমি): ৯০ * ৯০ * ৯০",
      "বাইরের কার্টনের ওজন (কেজি): ৭",
      "বাইরের কার্টনের মাপ (দৈর্ঘ্য x প্রস্থ x উচ্চতা) (মিমি): ৪৪৮ * ৩৪৫ * ২৭৫",
      "বাইরের কার্টনে পরিমাণ (পিস): ১৮০",
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
    heading: "কখনো পথ হারাবেন না",
    description:
      "MiTag Duo হলো আপনার চাবি, ব্যাগ, লাগেজ এবং দৈনন্দিন প্রয়োজনীয় জিনিসপত্রের জন্য একটি ডুয়াল-সিস্টেম স্মার্ট ট্র্যাকার। কোনো জিনিস ফেলে গেলে তার অ্যালার্ট পান এবং আপনার ফোন থেকেই সেটির অবস্থান খুঁজে বের করুন, ফলে কিছু ফেলে আসার দুশ্চিন্তা আপনাকে আর করতে হবে না।",
    image: {
      src: "/images/showcase/showcase1.webp",
      alt: "MiTag Duo tracker and keys resting in a tray beside a notebook and laptop",
    },
    imageSide: "right",
  },
  {
    id: "works-with-your-phone",
    heading: "আপনার ফোনের সাথে কাজ করে",
    description:
      "MiTag Duo অ্যাপল ফাইন্ড মাই এবং গুগল ফাইন্ড হাব উভয়ের সাথেই কাজ করে, ফলে আপনি আপনার ব্যবহৃত ফোন দিয়েই প্রয়োজনীয় জিনিসপত্রের খোঁজ রাখতে পারেন।",
    image: {
      src: "/images/showcase/showcase2.webp",
      alt: "Hand holding a phone showing the MiTag Duo tracking app next to a hand holding keys with the tracker attached",
    },
    imageSide: "left",
  },
  {
    id: "built-for-everyday-life",
    heading: "দৈনন্দিন জীবনের জন্য নির্মিত",
    description:
      "বৃষ্টিভেজা যাত্রা, ভিড়ে ঠাসা বিমানবন্দর, কফি শপে বিরতি — IP67 ওয়াটার রেজিস্ট্যান্স এবং দীর্ঘস্থায়ী বদলিযোগ্য ব্যাটারিসহ MiLi দৈনন্দিন মুহূর্তগুলোর জন্যই ডিজাইন করা হয়েছে।",
    image: {
      src: "/images/showcase/showcase3.webp",
      alt: "MiTag Duo tracker and keys resting in a tray beside a notebook and laptop",
    },
    imageSide: "right",
  },
  {
    id: "alerts-before-you-forget",
    heading: "ভুলে যাওয়ার আগে সতর্কবার্তা",
    description:
      "ক্যাফেতে আপনার ব্যাকপ্যাকটি ভুলে গেছেন? এয়ারপোর্টে লাগেজ ফেলে এসেছেন? ছোট ছোট ভুলগুলো বড় ধরনের মানসিক চাপের কারণ হওয়ার আগেই মিলি আপনাকে মনে করিয়ে দেয়।",
    image: {
      src: "/images/showcase/showcase4.webp",
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
  { value: "outside_dhaka", label: "ঢাকার বাহিরে", charge: 150 },
];

export const deliveryCharges: Record<DeliveryArea, number> = deliveryOptions.reduce(
  (acc, option) => {
    acc[option.value] = option.charge;
    return acc;
  },
  {} as Record<DeliveryArea, number>
);

export const defaultDeliveryArea: DeliveryArea = "inside_dhaka";