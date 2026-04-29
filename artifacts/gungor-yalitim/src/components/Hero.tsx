import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const stats = [
  { valueKey: "18+", labelKey: "hero.stat1" },
  { valueKey: "2024", labelKey: "hero.stat2" },
  { valueKey: "23",   labelKey: "hero.stat3" },
  { valueKey: "%100", labelKey: "hero.stat4" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [vidLoaded, setVidLoaded] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--teal-dark)" }}
    >
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/waterproofing_flooring_services.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVidLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: vidLoaded ? 1 : 0, filter: "brightness(0.35) saturate(0.65)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,49,67,0.75) 0%, rgba(13,49,67,0.45) 50%, rgba(13,49,67,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 w-full pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
          <span
            className="inline-flex items-center gap-2 font-urbanist text-[10px] font-bold uppercase tracking-[0.28em] px-4 py-2.5"
            style={{ border: "1px solid rgba(232,200,149,0.3)", color: "var(--gold-light)", backgroundColor: "rgba(232,200,149,0.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-gold-pulse" style={{ backgroundColor: "var(--gold-light)" }} />
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="font-kalnia font-semibold leading-[1.02] text-white mb-10"
          style={{ fontSize: "clamp(3.6rem, 9.5vw, 9rem)", maxWidth: "960px" }}
        >
          {t("hero.line1")}{" "}
          <span style={{ color: "var(--gold-light)" }}>{t("hero.line2")}</span>
          <br />
          {t("hero.line3")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="font-urbanist text-lg md:text-xl leading-relaxed mb-14"
          style={{ color: "rgba(255,255,255,0.55)", maxWidth: "580px" }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => {
              const el = document.querySelector("#iletisim");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
            }}
            data-testid="button-hero-cta1"
            className="inline-flex items-center gap-3 px-8 py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300"
            style={{ backgroundColor: "var(--gold-light)", color: "var(--teal-dark)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold-light)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--teal-dark)";
            }}
          >
            {t("hero.cta1")} <span className="text-base">→</span>
          </button>

          <button
            onClick={() => {
              const el = document.querySelector("#hizmetler");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
            }}
            data-testid="button-hero-cta2"
            className="inline-flex items-center gap-3 px-8 py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] text-white/70 hover:text-white transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {t("hero.cta2")}
          </button>
        </motion.div>
      </div>

      {/* Stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full border-t"
        style={{ borderColor: "rgba(232,200,149,0.15)", backgroundColor: "rgba(13,49,67,0.6)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-6 px-4 flex flex-col items-center text-center"
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(232,200,149,0.12)" : undefined }}
              >
                <span className="font-kalnia font-bold text-3xl md:text-4xl text-white mb-1">{stat.valueKey}</span>
                <span className="font-urbanist text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--gold-light)" }}>
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
