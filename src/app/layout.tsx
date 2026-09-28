import type { Metadata, Viewport } from "next"
import { Poppins, Roboto } from "next/font/google"
import { site } from "@/lib/site"
import "./globals.css"

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Vila Velha, ES | Orçamento Online`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
}

export const viewport: Viewport = {
  themeColor: "#2f2f2f",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  )
}
