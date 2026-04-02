import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMPOSE — Spectra9",
  description: "Visual block composition tool for premium pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#0A0A0A] text-[#ededed]">{children}</body>
    </html>
  );
}
