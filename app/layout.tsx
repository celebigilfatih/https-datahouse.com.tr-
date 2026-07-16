import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://datahouse.com.tr"),
  title: { default: "Datahouse — Bilgi Güçtür", template: "%s" },
  description: "Datahouse kurumsal ağ, sunucu, bakım ve yedekleme çözümleri.",
  applicationName: "Datahouse",
  keywords: ["Datahouse", "ağ çözümleri", "FortiGate firewall", "güvenlik duvarı", "sunucu çözümleri", "sunucu bakım", "yedekleme", "Bursa"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Datahouse — Bilgi Harekete Geçtiğinde Güçtür",
    description: "Kurumsal ağ, sunucu, bakım ve yedekleme çözümleri.",
    url: "https://datahouse.com.tr",
    siteName: "Datahouse",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Datahouse — Bilgi harekete geçtiğinde güçtür" }],
  },
  twitter: { card: "summary_large_image", title: "Datahouse — Bilgi Güçtür", description: "Kurumsal teknoloji altyapınız için uçtan uca çözümler.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
