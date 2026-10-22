import type { Metadata } from "next";
import "./original.css";
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
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Orbitron:wght@400..900&family=Russo+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="inter w-full h-full">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
