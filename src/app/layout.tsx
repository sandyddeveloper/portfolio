import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "TRIONN | AI-Powered Creative Design & Development Studio in India",
  description:
    "TRIONN is an independent AI-powered digital studio crafting meaningful brand experiences through strategy, design, and technology. Based in Rajkot, Gujarat, India, we create premium websites, immersive digital products, and interactive experiences for ambitious brands worldwide.",
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#040508] text-[#D8D8D8]">
      <body className="antialiased bg-[#040508] text-[#D8D8D8] overflow-x-hidden selection:bg-white selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
