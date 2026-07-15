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
  "AI Engineer specializing in AI, Machine Learning, and Deep Learning.";

const metaKeywords = [
  "Pragnyan Ramtha",
  "AI Engineer",
  "LLM Fine-tuning",
  "RAG",
  "PEFT QLoRA",
  "High-Performance AI",
  "Systems Engineer",
  "Autonomous Agents",
  "Machine Learning",
  "Deep Learning",
];

export const metadata: Metadata = {
  title: "Pragnyan Ramtha | AI Engineer",
  description: metaDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Pragnyan Ramtha | AI Engineer",
    description: metaDescription,
    url: "https://pragnyanramtha.dev/",
    type: "website",
    images: [
      {
        url: "https://pragnyanramtha.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pragnyan Ramtha | AI Engineer",
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
        <link rel="canonical" href="https://pragnyanramtha.dev/" />
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
              jobTitle: "AI Engineer | AI, Machine Learning, and Deep Learning",
              sameAs: [
                "https://github.com/pragnyanramtha",
                "https://www.linkedin.com/in/pragnyanramtha",
              ],
              description: metaDescription,
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
