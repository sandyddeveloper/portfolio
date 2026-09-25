import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "Santhosh Raj | Full-Stack Systems Engineer & Creative Developer",
  description:
    "Portfolio of Santhosh Raj - Full-Stack Engineer & Creative Developer specializing in scalable Next.js architectures, Python/Django microservices, and AI-driven platforms.",
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
