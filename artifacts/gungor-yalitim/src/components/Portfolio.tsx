import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "@/lib/i18n";
import { projects } from "@/data/projects";

export function Portfolio() {
  const [, navigate] = useLocation();
  const { lang, t } = useLang();

  const featured = projects.slice(0, 6);

  return (
    <section
      id="projeler"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-grey)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6"
        >
          <div>
            <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold)" }}>
              {t("portfolio.badge")}
            </span>
            <h2 className="font-kalnia font-semibold leading-[1.1]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--teal-dark)" }}>
              {t("portfolio.title")}
            </h2>
          </div>

          <button
            onClick={() => navigate("/projeler")}
            data-testid="link-portfolio-all"
            className="group inline-flex items-center gap-2 font-urbanist font-bold text-sm uppercase tracking-[0.15em] transition-colors duration-300"
            style={{ color: "var(--teal-dark)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--teal-dark)"; }}
          >
            {t("portfolio.viewAll")}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.12)" }}>
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              data-testid={`card-project-${project.slug}`}
              onClick={() => navigate(`/projeler/${project.slug}`)}
              className="group relative aspect-square border-r border-b overflow-hidden cursor-pointer"
              style={{ borderColor: "rgba(13,49,67,0.12)" }}
            >
              <img
                src={project.image}
                alt={project.title[lang]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                style={{ filter: "brightness(0.55) saturate(0.7)" }}
              />

              <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(13,49,67,0.92) 0%, rgba(13,49,67,0.5) 50%, rgba(13,49,67,0.2) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(232,200,149,0.15) 0%, transparent 60%)" }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ backgroundColor: "var(--gold-light)" }} />

              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <span
                  className="inline-block font-urbanist text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 mb-4"
                  style={{ border: "1px solid rgba(232,200,149,0.45)", color: "var(--gold-light)", backgroundColor: "rgba(232,200,149,0.08)" }}
                >
                  {project.scope[lang]}
                </span>
                <h3 className="font-kalnia font-semibold text-xl text-white leading-snug">{project.title[lang]}</h3>
              </div>

              <div className="absolute top-5 right-6 font-kalnia font-bold text-6xl opacity-[0.12] leading-none pointer-events-none" style={{ color: "var(--gold-light)" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>

              <ArrowUpRight className="absolute top-5 left-5 w-5 h-5 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigate("/projeler")}
            className="inline-flex items-center gap-3 px-10 py-4 font-urbanist font-bold text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--teal-dark)" }}
          >
            {t("portfolio.viewAll")}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
