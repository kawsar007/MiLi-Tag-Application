export type UseCaseIcon =
  | "key"
  | "wallet"
  | "bag"
  | "luggage"
  | "bike"
  | "paw"
  | "child"
  | "car";

export type UseCase = {
  id: string;
  icon: UseCaseIcon;
  title: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    id: "keys",
    icon: "key",
    title: "চাবি ট্র্যাক করুন",
    description: "বাড়ি বা গাড়ির চাবি হারানোর চিন্তা আর নেই",
  },
  {
    id: "wallet",
    icon: "wallet",
    title: "মানিব্যাগ সুরক্ষিত রাখুন",
    description: "মানিব্যাগে MiTag রাখুন, হারিয়ে গেলে মুহূর্তেই খুঁজে পান",
  },
  {
    id: "laptop-bag",
    icon: "bag",
    title: "ল্যাপটপ ব্যাগ ট্র্যাক করুন",
    description: "অফিস বা ভ্রমণে ব্যাগের সাথে MiTag রাখুন",
  },
  {
    id: "luggage",
    icon: "luggage",
    title: "ভ্রমণে লাগেজ ট্র্যাক",
    description: "এয়ারপোর্টে বা ট্রেনে লাগেজ হারানোর ভয় নেই",
  },
  {
    id: "bike",
    icon: "bike",
    title: "বাইক/সাইকেল নিরাপদ",
    description: "পার্কিং-এ রাখা বাইক বা সাইকেলে MiTag লাগান",
  },
  {
    id: "pet",
    icon: "paw",
    title: "পোষা প্রাণীর কলারে",
    description: "আপনার প্রিয় পোষা প্রাণীকে সবসময় নজরে রাখুন",
  },
  {
    id: "school-bag",
    icon: "child",
    title: "শিশুর স্কুল ব্যাগে",
    description: "বাচ্চার স্কুল ব্যাগে রাখুন, নিরাপত্তা নিশ্চিত করুন",
  },
  {
    id: "car",
    icon: "car",
    title: "গাড়িতে রাখুন",
    description: "গাড়ি খুঁজে পেতে বা চুরি হলে ট্র্যাক করুন",
  },
];