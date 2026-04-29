import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Contact } from "@/components/Contact";

type Filter = "all" | "water" | "floor";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [, navigate] = useLocation();
  const { lang, t } = useLang();

  const filtered = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-grey)" }}>
      <Navbar />

      {/* Page header */}
      <div
        className="pt-40 pb-20 relative overflow-hidden"
        style={{ backgroundColor: "var(--teal-dark)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(232,200,149,0.1) 0%, transparent 60%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold-light)" }}>
              {t("projects.badge")}
            </span>
            <h1
              className="font-kalnia font-semibold leading-[1.05] text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {t("projects.title")}
            </h1>
            <p className="font-urbanist text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("projects.sub")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 border-b" style={{ backgroundColor: "var(--bg-cream)", borderColor: "rgba(13,49,67,0.1)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex items-center gap-2 py-4">
          {(["all", "water", "floor"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-urbanist text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300"
              style={{
                backgroundColor: filter === f ? "var(--teal-dark)" : "transparent",
                color: filter === f ? "white" : "var(--teal-dark)",
                border: "1px solid",
                borderColor: filter === f ? "var(--teal-dark)" : "rgba(13,49,67,0.2)",
              }}
            >
              {t(`projects.filter.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.12)" }}>
          {filtered.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
              data-testid={`card-project-${project.slug}`}
              onClick={() => navigate(`/projeler/${project.slug}`)}
              className="group relative border-r border-b overflow-hidden cursor-pointer"
              style={{ borderColor: "rgba(13,49,67,0.12)", minHeight: "360px" }}
            >
              <img
                src={project.image}
                alt={project.title[lang]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                style={{ filter: "brightness(0.55) saturate(0.7)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,49,67,0.95) 0%, rgba(13,49,67,0.5) 55%, rgba(13,49,67,0.1) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(135deg, rgba(232,200,149,0.12) 0%, transparent 60%)" }} />

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-block font-urbanist text-[9px] font-bold uppercase tracking-[0.22em] px-3 py-1.5"
                    style={{ border: "1px solid rgba(232,200,149,0.4)", color: "var(--gold-light)", backgroundColor: "rgba(232,200,149,0.08)" }}
                  >
                    {project.scope[lang]}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div>
                  <div className="font-urbanist text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">
                    {project.location} · {project.year}
                  </div>
                  <h3 className="font-kalnia font-semibold text-xl text-white leading-snug">{project.title[lang]}</h3>
                </div>
              </div>

              {/* Number watermark */}
              <div className="absolute top-5 right-6 font-kalnia font-bold text-7xl opacity-[0.1] leading-none pointer-events-none" style={{ color: "var(--gold-light)" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
