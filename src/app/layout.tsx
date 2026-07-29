import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Pulse Pro — Wireless ANC Earbuds | Cash on Delivery",
  description:
    "Pulse Pro wireless earbuds: hybrid ANC, 32-hour battery, titanium-coated drivers. Order online, pay Cash on Delivery across Bangladesh.",
  keywords: [
    "Pulse Pro",
    "wireless earbuds",
    "ANC earbuds",
    "cash on delivery",
    "Bangladesh earbuds",
  ],
  openGraph: {
    title: "Pulse Pro — Wireless ANC Earbuds",
    description:
      "Hybrid ANC, 32-hour battery, titanium-coated drivers. Cash on Delivery nationwide.",
    type: "website",
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
