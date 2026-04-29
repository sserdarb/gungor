import { motion } from "framer-motion";
import { Clock, Star, Ruler, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function WhyUs() {
  const { t } = useLang();

  const features = [
    { icon: Clock,       titleKey: "whyus.f1.title", descKey: "whyus.f1.desc" },
    { icon: Star,        titleKey: "whyus.f2.title", descKey: "whyus.f2.desc" },
    { icon: Ruler,       titleKey: "whyus.f3.title", descKey: "whyus.f3.desc" },
    { icon: ShieldCheck, titleKey: "whyus.f4.title", descKey: "whyus.f4.desc" },
  ];

  return (
    <section
      id="neden-biz"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-cream)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold)" }}>
              {t("whyus.badge")}
            </span>
            <h2 className="font-kalnia font-semibold leading-[1.1] mb-8" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", color: "var(--teal-dark)" }}>
              {t("whyus.title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
            </h2>

            <div className="pl-7 mb-10 relative" style={{ borderLeft: "3px solid var(--gold-light)" }}>
              <p className="font-urbanist text-base leading-relaxed italic" style={{ color: "#545454" }}>
                "{t("whyus.quote")}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-10">
              {[
                { value: "2024", labelKey: "whyus.founded" },
                { value: "18+",  labelKey: "whyus.experience" },
              ].map((stat) => (
                <div key={stat.labelKey} className="p-7" style={{ border: "1px solid rgba(232,200,149,0.3)", backgroundColor: "rgba(232,200,149,0.04)" }}>
                  <div className="font-kalnia font-bold text-4xl md:text-5xl mb-1" style={{ color: "var(--teal-dark)" }}>
                    {stat.value}
                  </div>
                  <div className="font-urbanist text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.querySelector("#iletisim");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
              }}
              data-testid="button-whyus-cta"
              className="inline-flex items-center gap-3 px-8 py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] text-white transition-all duration-300"
              style={{ backgroundColor: "var(--teal-dark)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--teal-mid)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--teal-dark)"; }}
            >
              {t("whyus.cta")}
            </button>
          </motion.div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-2 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.1)" }}>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  data-testid={`card-feature-${idx}`}
                  className="group p-8 border-r border-b hover:bg-[#0D3143] transition-colors duration-400 cursor-default"
                  style={{ borderColor: "rgba(13,49,67,0.1)" }}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-5 transition-all duration-400 group-hover:border-[#E8C895]/40" style={{ border: "1px solid rgba(13,49,67,0.15)", color: "var(--gold)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-kalnia font-semibold text-lg mb-3 transition-colors duration-400 text-[#0D3143] group-hover:text-[#E8C895]">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="font-urbanist text-sm leading-relaxed transition-colors duration-400 text-[#545454] group-hover:text-white/75">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
