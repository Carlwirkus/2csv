import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { ReactNode } from "react";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ContentWrapper } from "@/components/ContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-powered CSVs",
  description: "AI-powered receipt conversion",
  metadataBase: new URL("https://2csv.vercel.app"),
  openGraph: {
    title: "AI-powered CSVs",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TTTM9470FT"
        />
        <Script id="g-analytics-script">
          {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-TTTM9470FT');`}
        </Script>
        <body className={inter.className}>
          <Providers>
            <ContentWrapper>{children}</ContentWrapper>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
