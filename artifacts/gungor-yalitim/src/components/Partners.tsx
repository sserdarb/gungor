import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";

const partners = [
  {
    name: "TACER",
    tagline: { tr: "Yapı Kimyasalları & Sistemler", en: "Building Chemicals & Systems" },
    description: { tr: "Yüksek performanslı yapı kimyasalları, su yalıtımı ve zemin sistemleri alanında Türkiye'nin lider üreticilerinden.", en: "One of Turkey's leading manufacturers in high-performance building chemicals, waterproofing, and flooring systems." },
    logoUrl: "https://logo.clearbit.com/tacer.com.tr",
    href: "https://tacer.com.tr/tr/",
    name_display: "TACER",
  },
  {
    name: "PROSİSTA",
    tagline: { tr: "Asma Tavan & Profil Sistemleri", en: "Suspended Ceiling & Profile Systems" },
    description: { tr: "Metal asma tavan, profil sistemleri ve tavan akustik çözümlerinde uzmanlaşmış güvenilir tedarikçi ortağımız.", en: "Our trusted supplier partner specializing in metal suspended ceilings, profile systems, and ceiling acoustic solutions." },
    logoUrl: "https://logo.clearbit.com/prosista.com",
    href: "https://www.prosista.com/",
    name_display: "PROSİSTA",
  },
  {
    name: "LUNIK",
    tagline: { tr: "Coating Culture", en: "Coating Culture" },
    description: { tr: "Yenilikçi zemin ve duvar kaplama sistemleri, mikro beton ve dekoratif yüzey çözümleri alanında uluslararası marka.", en: "An international brand in innovative floor and wall coating systems, micro concrete, and decorative surface solutions." },
    logoUrl: "https://logo.clearbit.com/lunik.cc",
    href: "https://www.lunik.cc/tr/inicio-turkce/",
    name_display: "LUNIK",
  },
];

export function Partners() {
  const { lang, t } = useLang();

  return (
    <section
      id="is-ortaklari"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: "var(--teal-dark)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(232,200,149,0.07) 0%, transparent 65%)" }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold-light)" }}>
              {t("partners.badge")}
            </span>
            <h2 className="font-kalnia font-semibold leading-[1.1] text-white" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              {t("partners.title")}
            </h2>
          </div>
          <p className="font-urbanist text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
            {t("partners.sub")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(232,200,149,0.15)" }}>
          {partners.map((partner, idx) => (
            <motion.a
              key={idx}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              data-testid={`card-partner-${idx}`}
              className="group relative border-r border-b p-10 md:p-12 flex flex-col justify-between min-h-[280px] transition-colors duration-400 hover:bg-white/5"
              style={{ borderColor: "rgba(232,200,149,0.15)" }}
            >
              <div className="mb-8">
                <div className="h-14 flex items-center mb-6">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-full w-auto max-w-[160px] object-contain transition-all duration-400"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      const fallback = el.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />
                  <div
                    className="hidden font-urbanist font-black text-white"
                    style={{ fontSize: "1.6rem", letterSpacing: "0.1em" }}
                  >
                    {partner.name_display}
                  </div>
                </div>
                <div className="font-urbanist text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--gold-light)" }}>
                  {partner.tagline[lang]}
                </div>
              </div>

              <div>
                <p className="font-urbanist text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {partner.description[lang]}
                </p>
                <div className="inline-flex items-center gap-2 font-urbanist text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-[#E8C895]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {t("partners.visit")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "var(--gold-light)" }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
