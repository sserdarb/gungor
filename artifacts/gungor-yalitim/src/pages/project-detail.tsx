import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { lang, t } = useLang();

  const project = projects.find((p) => p.slug === slug);
  const related = projects.filter((p) => p.slug !== slug && p.category === project?.category).slice(0, 3);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "var(--bg-cream)", color: "var(--teal-dark)" }}>
        <Navbar />
        <p className="font-urbanist text-lg mt-24">Proje bulunamadı.</p>
        <button onClick={() => navigate("/projeler")} className="mt-6 font-urbanist text-sm font-bold uppercase tracking-widest px-8 py-3 text-white" style={{ backgroundColor: "var(--teal-dark)" }}>
          {t("projects.back")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-cream)" }}>
      <Navbar />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title[lang]}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.65)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,49,67,0.98) 0%, rgba(13,49,67,0.55) 50%, rgba(13,49,67,0.2) 100%)" }} />

        <div className="absolute inset-0 flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => navigate("/projeler")}
              className="inline-flex items-center gap-2 font-urbanist text-sm font-bold uppercase tracking-[0.15em] mb-8 transition-colors duration-300 hover:text-[#E8C895]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("projects.back")}
            </button>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-urbanist text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
                {project.scope[lang]}
              </span>
              <span className="font-urbanist text-[10px] text-white/35 uppercase tracking-[0.15em]">
                {project.location} · {project.year}
              </span>
            </div>
            <h1 className="font-kalnia font-semibold leading-[1.05] text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", maxWidth: "800px" }}>
              {project.title[lang]}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left: description */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold)" }}>
                {t("projects.detail.challenge")}
              </span>
              <p className="font-urbanist text-lg leading-relaxed" style={{ color: "#545454" }}>
                {project.description[lang]}
              </p>
            </motion.div>

            {/* Gallery */}
            {project.gallery.length > 1 && (
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.slice(1).map((img, i) => (
                    <div key={i} className="overflow-hidden aspect-[4/3]">
                      <img src={img} alt={project.title[lang]} className="w-full h-full object-cover" style={{ filter: "brightness(0.9) saturate(0.8)" }} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: project details */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="p-8" style={{ backgroundColor: "var(--teal-dark)" }}>
              <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: "var(--gold-light)" }}>
                {lang === "tr" ? "Proje Bilgileri" : "Project Info"}
              </span>
              <dl className="space-y-5">
                {project.details.map((d, i) => (
                  <div key={i} className="pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <dt className="font-urbanist text-[9px] font-bold uppercase tracking-[0.22em] mb-1" style={{ color: "var(--gold-light)" }}>
                      {d.label[lang]}
                    </dt>
                    <dd className="font-kalnia font-semibold text-xl text-white">{d.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="p-8" style={{ border: "2px solid rgba(232,200,149,0.3)", backgroundColor: "rgba(232,200,149,0.04)" }}>
              <p className="font-urbanist text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--gold)" }}>
                {t("projects.cta")}
              </p>
              <button
                onClick={() => { navigate("/projeler"); setTimeout(() => { const el = document.querySelector("#iletisim"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" }); }, 350); }}
                className="w-full py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] text-white transition-all duration-300"
                style={{ backgroundColor: "var(--teal-dark)" }}
              >
                {t("projects.cta.btn")}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-16"
            style={{ borderTop: "1px solid rgba(13,49,67,0.12)" }}
          >
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-10" style={{ color: "var(--gold)" }}>
              {lang === "tr" ? "Benzer Projeler" : "Similar Projects"}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.12)" }}>
              {related.map((p) => (
                <div
                  key={p.slug}
                  onClick={() => { navigate(`/projeler/${p.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group relative border-r border-b overflow-hidden cursor-pointer"
                  style={{ borderColor: "rgba(13,49,67,0.12)", height: "220px" }}
                >
                  <img src={p.image} alt={p.title[lang]} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-600" style={{ filter: "brightness(0.5)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,49,67,0.9) 0%, transparent 100%)" }} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="font-urbanist text-[8px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--gold-light)" }}>{p.scope[lang]}</span>
                    <h4 className="font-kalnia font-semibold text-sm text-white">{p.title[lang]}</h4>
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
