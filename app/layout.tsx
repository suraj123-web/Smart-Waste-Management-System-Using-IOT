import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Waste Management Dashboard",
  description: "Systematic dashboard for monitoring smart bin levels, routes, and fleet activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
