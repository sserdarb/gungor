import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Package, MapPin } from "lucide-react";
import { getServiceBySlug, services } from "@/data/services";
import { useLang } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { lang, t } = useLang();

  const service = getServiceBySlug(slug ?? "");

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "var(--bg-cream)", color: "var(--teal-dark)" }}>
        <Navbar />
        <p className="font-urbanist text-lg mt-24">{t("service.notfound")}</p>
        <button onClick={() => navigate("/")} className="mt-6 font-urbanist text-sm font-bold uppercase tracking-widest px-8 py-3" style={{ backgroundColor: "var(--teal-dark)", color: "#fff" }}>
          {t("general.home")}
        </button>
      </div>
    );
  }

  /* Related services (same category, excluding current) */
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  const catLabel = service.category === "water" ? t("services.cat1") : t("services.cat2");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-cream)" }}>
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title[lang]}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.7)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,49,67,0.95) 0%, rgba(13,49,67,0.5) 50%, rgba(13,49,67,0.2) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 font-urbanist text-sm font-bold uppercase tracking-[0.15em] mb-8 transition-colors duration-300 hover:text-[#E8C895]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("service.back")}
            </button>
            <div className="mb-4">
              <span className="font-urbanist text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
                {catLabel}
              </span>
            </div>
            <h1
              className="font-kalnia font-semibold leading-[1.05] text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", maxWidth: "700px" }}
            >
              {service.title[lang]}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                {t("service.overview")}
              </span>
              <p className="font-urbanist text-lg leading-relaxed" style={{ color: "#545454" }}>
                {service.longDesc[lang]}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: "var(--gold)" }}>
                {t("service.features")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features[lang].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5"
                    style={{ border: "1px solid rgba(13,49,67,0.1)", backgroundColor: "white" }}
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
                    <span className="font-urbanist text-sm leading-snug" style={{ color: "var(--teal-dark)" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: "var(--gold)" }}>
                {t("service.applications")}
              </span>
              <div className="flex flex-wrap gap-3">
                {service.applications[lang].map((app, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2.5"
                    style={{ backgroundColor: "var(--teal-dark)", color: "var(--gold-light)" }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-urbanist text-xs font-bold uppercase tracking-[0.12em]">{app}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">

            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8"
              style={{ backgroundColor: "var(--teal-dark)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-5 h-5" style={{ color: "var(--gold-light)" }} />
                <span className="font-urbanist text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
                  {t("service.materials")}
                </span>
              </div>
              <ul className="space-y-3">
                {service.materials[lang].map((mat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--gold-light)" }} />
                    <span className="font-urbanist text-sm text-white/75">{mat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8"
              style={{ border: "2px solid rgba(232,200,149,0.3)", backgroundColor: "rgba(232,200,149,0.04)" }}
            >
              <p className="font-urbanist text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--gold)" }}>
                {t("service.cta.title")}
              </p>
              <h3 className="font-kalnia font-semibold text-xl mb-6" style={{ color: "var(--teal-dark)" }}>
                {service.title[lang]}
              </h3>
              <button
                onClick={() => { navigate("/"); setTimeout(() => { const el = document.querySelector("#iletisim"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" }); }, 350); }}
                className="w-full py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "var(--teal-dark)" }}
              >
                {t("service.cta.btn")}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 pt-16"
            style={{ borderTop: "1px solid rgba(13,49,67,0.12)" }}
          >
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-10" style={{ color: "var(--gold)" }}>
              {lang === "tr" ? "İlgili Hizmetler" : "Related Services"}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.12)" }}>
              {related.map((svc) => (
                <div
                  key={svc.slug}
                  onClick={() => { navigate(`/hizmetler/${svc.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group relative border-r border-b overflow-hidden cursor-pointer"
                  style={{ borderColor: "rgba(13,49,67,0.12)", height: "200px" }}
                >
                  <img src={svc.image} alt={svc.title[lang]} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]" style={{ filter: "brightness(0.5)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,49,67,0.9) 0%, transparent 100%)" }} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="w-5 h-[2px] mb-2" style={{ backgroundColor: "var(--gold-light)" }} />
                    <h4 className="font-kalnia font-semibold text-sm text-white leading-snug">{svc.title[lang]}</h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
