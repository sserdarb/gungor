import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "tr" | "en";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  /* ── Navbar ── */
  "nav.services":      { tr: "Hizmetler",       en: "Services" },
  "nav.solutions":     { tr: "Çözüm Alanları",  en: "Solutions" },
  "nav.whyus":         { tr: "Neden Biz?",       en: "Why Us?" },
  "nav.projects":      { tr: "Projelerimiz",     en: "Projects" },
  "nav.contact":       { tr: "İletişim",         en: "Contact" },
  "nav.cta":           { tr: "Teklif Al",        en: "Get a Quote" },

  /* ── Hero ── */
  "hero.badge":        { tr: "18+ Yıllık Sektör Deneyimi", en: "18+ Years of Industry Experience" },
  "hero.line1":        { tr: "Yapıların",        en: "Protecting" },
  "hero.line2":        { tr: "Geleceğini",       en: "the Future" },
  "hero.line3":        { tr: "Koruyoruz.",       en: "of Structures." },
  "hero.sub":          { tr: "Ağır sanayi ciddiyetini hassas işçilikle birleştiriyoruz. Su yalıtımı ve endüstriyel zemin sistemlerinde anahtar teslim, garantili çözümler.", en: "We combine industrial precision with meticulous craftsmanship. Turnkey, guaranteed solutions in waterproofing and industrial flooring systems." },
  "hero.cta1":         { tr: "Ücretsiz Keşif Talebi", en: "Free Site Survey" },
  "hero.cta2":         { tr: "Çözümlerimizi Keşfedin", en: "Explore Solutions" },
  "hero.stat1":        { tr: "Yıllık Tecrübe",   en: "Years Experience" },
  "hero.stat2":        { tr: "Kuruluş Yılı",     en: "Founded" },
  "hero.stat3":        { tr: "Hizmet Kalemi",    en: "Service Items" },
  "hero.stat4":        { tr: "Müşteri Memnuniyeti", en: "Client Satisfaction" },

  /* ── Services section ── */
  "services.badge":    { tr: "Uzmanlık Alanlarımız", en: "Our Expertise" },
  "services.title":    { tr: "Mühendislik Standartlarında\nHizmetler", en: "Services at\nEngineering Standards" },
  "services.sub":      { tr: "23 hizmet kalemiyle yapılarınızı içten dışa koruma altına alıyoruz.", en: "We protect your structures inside and out with 23 service items." },
  "services.cat1":     { tr: "Su Yalıtımı Sistemleri", en: "Waterproofing Systems" },
  "services.cat2":     { tr: "Endüstriyel Zemin & Asma Tavan", en: "Industrial Flooring & Suspended Ceilings" },
  "services.cat1Count":{ tr: "9 Hizmet", en: "9 Services" },
  "services.cat2Count":{ tr: "14 Hizmet", en: "14 Services" },
  "services.ctaTitle": { tr: "Hangi çözüm sizin için en uygun?", en: "Which solution fits you best?" },
  "services.ctaBadge": { tr: "Projeniz için uzman görüşü alın", en: "Get expert advice for your project" },
  "services.ctaBtn":   { tr: "Ücretsiz Keşif Talebi", en: "Request Free Survey" },
  "services.detail":   { tr: "Detaylı Bilgi", en: "Learn More" },

  /* ── Solutions ── */
  "solutions.badge":   { tr: "Kullanım Alanları", en: "Use Cases" },
  "solutions.title":   { tr: "Sektörel Çözüm Alanları", en: "Sector Solutions" },
  "solutions.sub":     { tr: "Her sektörün kendine özgü ihtiyaçlarına yönelik, mühendislik odaklı özelleştirilmiş çözümler.", en: "Engineering-focused customized solutions tailored to each sector's specific needs." },

  /* ── WhyUs ── */
  "whyus.badge":       { tr: "Hakkımızda", en: "About Us" },
  "whyus.title":       { tr: "Neden Bizi\nTercih Etmelisiniz?", en: "Why Choose\nUs?" },
  "whyus.quote":       { tr: "Güngör Yalıtım, sektörün lider firmalarında 18 yılı aşkın süre boyunca elde edilen bilgi, beceri ve tecrübeler ile 2024 yılında kurulmuştur.", en: "Güngör Yalıtım was founded in 2024, built upon 18+ years of experience gained at leading firms in the sector." },
  "whyus.founded":     { tr: "Kuruluş Yılı", en: "Founded" },
  "whyus.experience":  { tr: "Yıl Tecrübe", en: "Years Exp." },
  "whyus.cta":         { tr: "Ücretsiz Keşif Al", en: "Request Free Survey" },
  "whyus.f1.title":    { tr: "18+ Yıllık Deneyim", en: "18+ Years Experience" },
  "whyus.f1.desc":     { tr: "Sektörün lider firmalarında kazanılmış bilgi, beceri ve tecrübeyle kurumsal vizyon.", en: "Corporate vision built on knowledge and skills gained at the sector's leading firms." },
  "whyus.f2.title":    { tr: "Uzman & Sertifikalı Ekip", en: "Expert & Certified Team" },
  "whyus.f2.desc":     { tr: "Her biri alanında uzman, iş güvenliği ve uygulama standartlarına hakim profesyoneller.", en: "Professionals who are experts in their field, fluent in safety and application standards." },
  "whyus.f3.title":    { tr: "Anahtar Teslim Uygulama", en: "Turnkey Application" },
  "whyus.f3.desc":     { tr: "Keşif, projelendirme, malzeme tedariki ve uygulama süreçlerinin tek elden yönetimi.", en: "Single-source management of survey, design, material procurement and application." },
  "whyus.f4.title":    { tr: "Garantili İşçilik", en: "Guaranteed Workmanship" },
  "whyus.f4.desc":     { tr: "Birinci sınıf malzeme kullanımı ve arkasında durduğumuz kusursuz işçilik garantisi.", en: "First-class materials and a workmanship guarantee we stand behind." },

  /* ── Portfolio ── */
  "portfolio.badge":   { tr: "Referanslar", en: "References" },
  "portfolio.title":   { tr: "Örnek Projelerimiz", en: "Featured Projects" },
  "portfolio.link":    { tr: "Tüm Projeler", en: "All Projects" },
  "portfolio.viewAll": { tr: "Tüm Projelerimizi Gör", en: "View All Projects" },

  /* ── Partners ── */
  "partners.badge":    { tr: "Güvenilir Tedarik Zinciri", en: "Trusted Supply Chain" },
  "partners.title":    { tr: "İş Ortaklarımız", en: "Our Partners" },
  "partners.sub":      { tr: "Projelerimizde kullandığımız malzemeleri ve sistemleri, sektörün güvenilir markalarından temin ediyoruz.", en: "We source the materials and systems in our projects from the sector's trusted brands." },
  "partners.visit":    { tr: "Web Sitesini Ziyaret Et", en: "Visit Website" },

  /* ── Contact ── */
  "contact.badge":     { tr: "Hemen Başlayalım", en: "Let's Get Started" },
  "contact.title":     { tr: "Projenizi\nBizimle Paylaşın", en: "Share Your\nProject With Us" },
  "contact.sub":       { tr: "Ücretsiz keşif ve fiyat teklifi için bize ulaşın. En kısa sürede dönüş yaparız.", en: "Contact us for a free site survey and price quote. We'll respond as soon as possible." },
  "contact.name":      { tr: "Ad Soyad", en: "Full Name" },
  "contact.phone":     { tr: "Telefon", en: "Phone" },
  "contact.email":     { tr: "E-posta", en: "Email" },
  "contact.service":   { tr: "Hizmet Türü", en: "Service Type" },
  "contact.message":   { tr: "Mesajınız", en: "Your Message" },
  "contact.send":      { tr: "Teklif Talebi Gönder", en: "Send Quote Request" },
  "contact.address":   { tr: "Adres", en: "Address" },
  "contact.phone_label": { tr: "Telefon", en: "Phone" },
  "contact.hours":     { tr: "Çalışma Saatleri", en: "Working Hours" },
  "contact.hours_val": { tr: "Pzt – Cmt: 08:00 – 18:00", en: "Mon – Sat: 08:00 – 18:00" },

  /* ── Footer ── */
  "footer.tagline":    { tr: "Su yalıtımı ve endüstriyel zemin sistemlerinde mühendislik standartlarında, garantili çözümler.", en: "Engineering-grade, guaranteed solutions in waterproofing and industrial flooring systems." },
  "footer.services":   { tr: "Hizmetler", en: "Services" },
  "footer.corporate":  { tr: "Kurumsal", en: "Corporate" },
  "footer.rights":     { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  "footer.about":      { tr: "Hakkımızda", en: "About Us" },
  "footer.contact":    { tr: "İletişim", en: "Contact" },
  "footer.projects":   { tr: "Projelerimiz", en: "Projects" },
  "footer.privacy":    { tr: "Gizlilik Politikası", en: "Privacy Policy" },

  /* ── Projects page ── */
  "projects.badge":    { tr: "Tamamlanan İşler", en: "Completed Works" },
  "projects.title":    { tr: "Projelerimiz", en: "Our Projects" },
  "projects.sub":      { tr: "Her proje, mühendislik titizliği ve kaliteli malzeme kullanımının somut bir kanıtıdır.", en: "Each project is a tangible proof of engineering precision and quality material use." },
  "projects.filter.all":  { tr: "Tümü", en: "All" },
  "projects.filter.water":{ tr: "Su Yalıtımı", en: "Waterproofing" },
  "projects.filter.floor":{ tr: "Zemin Kaplama", en: "Flooring" },
  "projects.back":     { tr: "← Projeler", en: "← Projects" },
  "projects.category": { tr: "Kategori", en: "Category" },
  "projects.detail.challenge": { tr: "Proje Detayları", en: "Project Details" },
  "projects.cta":      { tr: "Bu tür bir proje için teklif alın", en: "Get a quote for this type of project" },
  "projects.cta.btn":  { tr: "İletişime Geç", en: "Contact Us" },

  /* ── Service detail page ── */
  "service.back":      { tr: "← Tüm Hizmetler", en: "← All Services" },
  "service.overview":  { tr: "Genel Bakış", en: "Overview" },
  "service.features":  { tr: "Özellikler & Avantajlar", en: "Features & Benefits" },
  "service.materials": { tr: "Kullanılan Malzemeler", en: "Materials Used" },
  "service.applications": { tr: "Uygulama Alanları", en: "Application Areas" },
  "service.cta.title": { tr: "Bu hizmet için teklif alın", en: "Get a quote for this service" },
  "service.cta.btn":   { tr: "Ücretsiz Keşif Talebi", en: "Request Free Survey" },
  "service.notfound":  { tr: "Hizmet bulunamadı.", en: "Service not found." },

  /* ── General ── */
  "general.learnmore": { tr: "Detaylı Bilgi", en: "Learn More" },
  "general.contact":   { tr: "İletişime Geç", en: "Contact Us" },
  "general.home":      { tr: "Ana Sayfa", en: "Home" },
};

const LangContext = createContext<LangContextValue>({
  lang: "tr",
  toggle: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");

  const toggle = () => setLang((l) => (l === "tr" ? "en" : "tr"));

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
