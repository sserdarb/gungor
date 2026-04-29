import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Solutions } from "@/components/Solutions";
import { WhyUs } from "@/components/WhyUs";
import { Portfolio } from "@/components/Portfolio";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <WhyUs />
      <Portfolio />
      <Partners />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}