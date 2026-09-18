import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Switch to Inter and Outfit for a modern premium feel
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salarite Virtual HR",
  description: "Next Generation Virtual HR Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-slate-100 min-h-screen relative`}
      >
        {/* Dynamic Background Elements */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px]"></div>
          <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-900/10 blur-[90px] animate-float"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
