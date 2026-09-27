import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { WhatsAppFloat } from "@/components/site/whatsapp-float"

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
