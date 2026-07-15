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

const metaDescription =
  "Pragnyan Ramtha — AI Engineer and founder of Agent7. I build autonomous AI agents, fine-tune LLMs with PEFT/QLoRA, and contribute to open-source AI. Previously #1 on the ARC-AGI public leaderboard.";

const metaKeywords = [
  // Primary identity
  "Pragnyan Ramtha",
  "AI Engineer",
  "Machine Learning Engineer",
  "Deep Learning Engineer",
  // Core skills
  "LLM Fine-tuning",
  "PEFT",
  "QLoRA",
  "RAG",
  "Retrieval Augmented Generation",
  "AI Agents",
  "Autonomous Agents",
  "Agentic AI",
  // Platforms & tools
  "PyTorch",
  "Transformers",
  "Hugging Face",
  "CUDA",
  "Next.js",
  "TypeScript",
  "Python",
  // Achievements
  "ARC-AGI",
  "ARC-AGI-2",
  "AIMO",
  "Open Source Contributor",
  "Hackathon Winner",
  // Roles
  "Founder",
  "Agent7",
  "SaaS Builder",
  "Full-Stack AI Developer",
  // Long-tail
  "AI Engineer Portfolio",
  "LLM Fine-tuning Expert",
  "AI Agent Developer",
  "Open Source AI",
  "Cost-Efficient AI Systems",
  "Model Compression",
  "GPTQ",
  "Quantization",
];

export const metadata: Metadata = {
  title: {
    default: "Pragnyan Ramtha | AI Engineer — LLM Fine-Tuning, AI Agents, Open Source",
    template: "%s | Pragnyan Ramtha",
  },
  description: metaDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Pragnyan Ramtha | AI Engineer — LLM Fine-Tuning, AI Agents, Open Source",
    description: metaDescription,
    url: "https://pragnyanramtha.dev/",
    type: "website",
    siteName: "Pragnyan Ramtha",
    locale: "en_US",
    images: [
      {
        url: "https://pragnyanramtha.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pragnyan Ramtha — AI Engineer, Founder of Agent7, ARC-AGI Top Ranker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragnyan Ramtha | AI Engineer",
    description: metaDescription,
    images: ["https://pragnyanramtha.dev/opengraph-image.png"],
  },
  authors: [{ name: "Pragnyan Ramtha", url: "https://pragnyanramtha.dev/" }],
  keywords: metaKeywords,
  creator: "Pragnyan Ramtha",
  publisher: "Pragnyan Ramtha",
  metadataBase: new URL("https://pragnyanramtha.dev"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Pragnyan Ramtha — AI Engineering Blog"
          href="https://pragnyanramtha.dev/rss.xml"
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable profile" />
        <meta
          name="darkreader-lock"
          content="darkreader-inline-stroke darkreader-inline-fill"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pragnyan Ramtha",
              url: "https://pragnyanramtha.dev/",
              jobTitle: "AI Engineer & Founder of Agent7",
              description: metaDescription,
              sameAs: [
                "https://github.com/pragnyanramtha",
                "https://www.linkedin.com/in/pragnyanramtha",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Large Language Models",
                "LLM Fine-tuning",
                "PEFT",
                "QLoRA",
                "RAG",
                "AI Agents",
                "PyTorch",
                "Python",
                "TypeScript",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "AI Engineer",
                occupationLocation: {
                  "@type": "Country",
                  name: "India",
                },
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "MRV University",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_VERCEL_ENV && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
