import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dla Ciebie, Oleńko ❤️",
  description: "Specjalna niespodzianka urodzinowa",
  openGraph: {
    title: "Dla Ciebie, Oleńko ❤️",
    description: "Specjalna niespodzianka urodzinowa",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/urodziny-60-ordinary-poster.png",
        alt: "Urodzinowa niespodzianka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dla Ciebie, Oleńko ❤️",
    description: "Specjalna niespodzianka urodzinowa",
    images: ["/images/urodziny-60-ordinary-poster.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
