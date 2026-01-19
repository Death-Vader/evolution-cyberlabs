import type { Metadata } from "next";
import { Outfit, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "@/styles/tailwind.css"; // This ensures your styles load

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evolution CyberLabs",
  description: "Intelligent, Adaptive Cybersecurity Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceSans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}