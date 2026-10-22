import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Tubilex Motors — Cars Without Borders",
    template: "%s | Tubilex Motors",
  },
  description:
    "Find your next drive with Tubilex Motors. Vehicle sales, sourcing and import support in Mbezi Luis, Dar es Salaam, Tanzania.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Tubilex Motors — Cars Without Borders",
    description:
      "Your next chapter. Your next drive. Explore the Tubilex Motors collection in Dar es Salaam.",
    images: ["/media/hero.webp"],
    type: "website",
    locale: "en_TZ",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
