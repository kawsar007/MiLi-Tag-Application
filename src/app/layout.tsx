import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MiLi Tag — Smart Bluetooth Tracking Device | Cash on Delivery Bangladesh",
  description:
    "Never lose your valuables again with MiLi Tag. Track your keys, wallet, bag, luggage, and more using the MiLi app. Order online with Cash on Delivery available across Bangladesh.",
  keywords: [
    "MiLi Tag",
    "MiLi Tracking Device",
    "Bluetooth Tracker",
    "Smart Tracker",
    "Item Finder",
    "Key Finder",
    "Wallet Tracker",
    "Bag Tracker",
    "Luggage Tracker",
    "GPS Tracker",
    "Find My Device",
    "Bluetooth Tag",
    "Anti Lost Device",
    "Cash on Delivery",
    "Bangladesh",
  ],
  authors: [
    {
      name: "MiLi Tag",
    },
  ],
  creator: "MiLi Tag",
  publisher: "MiLi Tag",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MiLi Tag — Smart Bluetooth Tracking Device",
    description:
      "Track your keys, wallet, luggage, bags, and other valuables with MiLi Tag. Fast nationwide Cash on Delivery available across Bangladesh.",
    type: "website",
    locale: "en_US",
    siteName: "MiLi Tag",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiLi Tag — Smart Bluetooth Tracking Device",
    description:
      "Never lose your valuables. Order MiLi Tag with Cash on Delivery anywhere in Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
