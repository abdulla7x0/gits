import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "XAU / BTC Fundamental Intelligence — Decision Support Platform",
  description: "Institutional macroeconomic fundamental intelligence platform for Gold (XAUUSD), Bitcoin (BTCUSD), USD, Treasury yields, and geopolitical risk.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 min-h-screen flex antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Left Institutional Sidebar */}
        <Sidebar />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
