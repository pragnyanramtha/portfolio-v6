import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Pragnyan Ramtha | AI Research Scientist",
  description:
    "AI Research Scientist specializing in AI, Machine Learning, and Deep Learning.",
  openGraph: {
    title: "Pragnyan Ramtha | AI Research Scientist",
    description:
      "AI Research Scientist specializing in AI, Machine Learning, and Deep Learning.",
    url: "https://pragnyanramtha.xyz/",
    type: "website",
    images: [
      {
        url: "https://pragnyanramtha.xyz/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pragnyan Ramtha | AI Research Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  authors: [
    { name: "Pragnyan Ramtha", url: "https://pragnyanramtha.xyz/" },
  ],
  keywords: [
    "Pragnyan Ramtha",
    "Software Developer",
    "AI Research Scientist",
    "Machine Learning",
    "Deep Learning",
  ],
  creator: "Pragnyan Ramtha",
  publisher: "Pragnyan Ramtha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <body
        className={`${outfit.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
