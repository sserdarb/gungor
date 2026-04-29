import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Layers, ArrowUpRight, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "@/lib/i18n";
import { getServiceBySlug } from "@/data/services";

/* ─── Service groups with verified Pexels images ──────────────────────── */
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

interface ServiceGroup {
  id: string;
  titleTr: string;
  titleEn: string;
  image: string;
  slugs: string[];
}

const waterGroups: ServiceGroup[] = [
  {
    id: "yapi-kabugu",
    titleTr: "Yapı Kabuğu Yalıtımı",
    titleEn: "Building Envelope Waterproofing",
    image: px(1552617),   // building envelope construction – verified
    slugs: ["temel-bohcalama", "perde-doseme-yalitim", "teras-cati-yalitim"],
  },
  {
    id: "ozel-hacimler",
    titleTr: "Özel Hacim Yalıtımı",
    titleEn: "Special Area Waterproofing",
    image: px(261106),    // pool – verified
    slugs: ["havuz-tank-yalitim", "islak-hacim-yalitim", "yesil-cati"],
  },
  {
    id: "onarim-detay",
    titleTr: "Onarım & Detay Yalıtımı",
    titleEn: "Repair & Detail Waterproofing",
    image: px(1267338),   // construction repair work – verified
    slugs: ["enjeksiyon", "dilatasyon-yalitim", "negatif-yalitim"],
  },
];

const floorGroups: ServiceGroup[] = [
  {
    id: "endustriyel-zemin",
    titleTr: "Endüstriyel Zemin Sistemleri",
    titleEn: "Industrial Flooring Systems",
    image: px(2041627),   // industrial flooring – verified
    slugs: ["epoksi-zemin", "poliuretan-zemin", "cimento-esasli-zemin", "beton-silim-parlatma"],
  },
  {
    id: "dekoratif-zemin",
    titleTr: "Dekoratif & Özel Zemin",
    titleEn: "Decorative & Special Flooring",
    image: px(1571458),   // interior decorative – verified
    slugs: ["dekoratif-zemin", "mikro-beton", "hazir-dekoratif-kaplamalar", "self-leveling-sap"],
  },
  {
    id: "otopark-yonlendirme",
    titleTr: "Otopark & Yönlendirme",
    titleEn: "Parking & Road Marking",
    image: px(1004409),   // parking lot floor – verified
    slugs: ["otopark-zemin", "yol-cizgi-yonlendirme"],
  },
  {
    id: "tavan-ozel",
    titleTr: "Tavan & Özel Kaplama",
    titleEn: "Ceiling & Special Covering",
    image: px(1680924),   // interior ceiling/space – verified
    slugs: ["asma-tavan", "esnek-zemin-pvc-lvt", "karo-hali", "yukseltilmis-doseme"],
  },
];

/* ─── GroupCard – styled identical to project cards ─────────────────── */
function GroupCard({
  group,
  index,
  isOpen,
  onToggle,
}: {
  group: ServiceGroup;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { lang } = useLang();
  const title = lang === "tr" ? group.titleTr : group.titleEn;
  const services = group.slugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      data-testid={`group-card-${group.id}`}
      onClick={onToggle}
      className="group relative border-r border-b overflow-hidden cursor-pointer"
      style={{
        borderColor: "rgba(13,49,67,0.12)",
        minHeight: "320px",
      }}
    >
      {/* Background image */}
      <img
        src={group.image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        style={{ filter: "brightness(0.55) saturate(0.7)" }}
      />

      {/* Gradient overlay – same as projects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,49,67,0.95) 0%, rgba(13,49,67,0.5) 55%, rgba(13,49,67,0.1) 100%)",
        }}
      />

      {/* Gold shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,200,149,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Active (open) gold top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-colors duration-300"
        style={{ backgroundColor: isOpen ? "var(--gold-light)" : "transparent" }}
      />

      {/* Card content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
        {/* Top row: badge + arrow */}
        <div className="flex items-center justify-between">
          <span
            className="inline-block font-urbanist text-[9px] font-bold uppercase tracking-[0.22em] px-3 py-1.5"
            style={{
              border: "1px solid rgba(232,200,149,0.4)",
              color: "var(--gold-light)",
              backgroundColor: "rgba(232,200,149,0.08)",
            }}
          >
            {services.length} {lang === "tr" ? "Hizmet" : "Services"}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-400 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            style={{ color: "var(--gold-light)" }}
          />
        </div>

        {/* Bottom: title */}
        <div>
          <div className="w-5 h-[2px] mb-3" style={{ backgroundColor: "var(--gold-light)" }} />
          <h4 className="font-kalnia font-semibold text-white text-base leading-snug">
            {title}
          </h4>
        </div>
      </div>

      {/* Number watermark – same as projects */}
      <div
        className="absolute top-4 right-6 font-kalnia font-bold text-7xl opacity-[0.08] leading-none pointer-events-none"
        style={{ color: "var(--gold-light)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

/* ─── GroupGrid + inline expand panel ────────────────────────────────── */
function CategoryBlock({
  groups,
  cols,
  openId,
  setOpenId,
}: {
  groups: ServiceGroup[];
  cols: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const [, navigate] = useLocation();
  const { lang } = useLang();

  const activeGroup = openId ? groups.find((g) => g.id === openId) : null;
  const activeServices = activeGroup
    ? activeGroup.slugs
        .map((s) => getServiceBySlug(s))
        .filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[]
    : [];

  return (
    <div>
      {/* Group cards grid – border-based like projects */}
      <div className={`grid ${cols} gap-0 border-l border-t`} style={{ borderColor: "rgba(13,49,67,0.12)" }}>
        {groups.map((group, idx) => (
          <GroupCard
            key={group.id}
            group={group}
            index={idx}
            isOpen={openId === group.id}
            onToggle={() => setOpenId(openId === group.id ? null : group.id)}
          />
        ))}
      </div>

      {/* Expanded service panel – slides in below the grid */}
      <AnimatePresence initial={false}>
        {activeGroup && (
          <motion.div
            key={activeGroup.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="overflow-hidden border-l border-r border-b"
            style={{ borderColor: "rgba(13,49,67,0.12)", backgroundColor: "#fff" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y" style={{ borderColor: "rgba(13,49,67,0.07)" }}>
              {activeServices.map((svc, i) => (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  data-testid={`service-link-${svc.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/hizmetler/${svc.slug}`);
                  }}
                  className="group/item flex items-center justify-between gap-3 px-6 py-5 cursor-pointer transition-colors duration-200 hover:bg-[#f7f5f0]"
                  style={{ borderColor: "rgba(13,49,67,0.07)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--gold)" }}
                    />
                    <span className="font-urbanist text-sm text-[#2a2a2a] group-hover/item:text-[var(--teal-dark)] transition-colors duration-200 truncate">
                      {svc.title[lang]}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 opacity-0 group-hover/item:opacity-100 transition-all duration-200"
                    style={{ color: "var(--gold)" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Services section ───────────────────────────────────────────────── */
export function Services() {
  const { t } = useLang();
  const [openWaterId, setOpenWaterId] = useState<string | null>(null);
  const [openFloorId, setOpenFloorId] = useState<string | null>(null);

  return (
    <section
      id="hizmetler"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-cream)" }}
    >
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #0D3143 0px, #0D3143 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20 md:mb-28"
        >
          <span
            className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6"
            style={{ color: "var(--gold)" }}
          >
            {t("services.badge")}
          </span>
          <h2
            className="font-kalnia font-semibold leading-[1.1] mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--teal-dark)" }}
          >
            {t("services.title")
              .split("\n")
              .map((l, i) => (
                <span key={i}>
                  {l}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
          <p className="font-urbanist text-lg leading-relaxed" style={{ color: "#545454" }}>
            {t("services.sub")}
          </p>
        </motion.div>

        {/* ── Su Yalıtımı ── */}
        <div className="mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--gold-light)", color: "var(--teal-dark)" }}
            >
              <Droplets className="w-4 h-4" />
            </div>
            <h3
              className="font-kalnia font-semibold text-xl md:text-2xl"
              style={{ color: "var(--teal-dark)" }}
            >
              {t("services.cat1")}
            </h3>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(13,49,67,0.12)" }} />
            <span
              className="font-urbanist text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--gold)" }}
            >
              {t("services.cat1Count")}
            </span>
          </motion.div>

          <CategoryBlock
            groups={waterGroups}
            cols="grid-cols-1 md:grid-cols-3"
            openId={openWaterId}
            setOpenId={setOpenWaterId}
          />
        </div>

        {/* ── Endüstriyel Zemin ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--gold-light)", color: "var(--teal-dark)" }}
            >
              <Layers className="w-4 h-4" />
            </div>
            <h3
              className="font-kalnia font-semibold text-xl md:text-2xl"
              style={{ color: "var(--teal-dark)" }}
            >
              {t("services.cat2")}
            </h3>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(13,49,67,0.12)" }} />
            <span
              className="font-urbanist text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--gold)" }}
            >
              {t("services.cat2Count")}
            </span>
          </motion.div>

          <CategoryBlock
            groups={floorGroups}
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            openId={openFloorId}
            setOpenId={setOpenFloorId}
          />
        </div>

        {/* ── CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ backgroundColor: "var(--teal-dark)" }}
        >
          <div className="max-w-xl">
            <p
              className="font-urbanist text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--gold-light)" }}
            >
              {t("services.ctaBadge")}
            </p>
            <h3 className="font-kalnia font-semibold text-2xl md:text-3xl text-white leading-snug">
              {t("services.ctaTitle")}
            </h3>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector("#iletisim");
              if (el)
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.scrollY - 72,
                  behavior: "smooth",
                });
            }}
            data-testid="button-services-cta"
            className="shrink-0 inline-flex items-center gap-3 px-9 py-4 font-urbanist font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300"
            style={{ backgroundColor: "var(--gold-light)", color: "var(--teal-dark)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--gold-light)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--teal-dark)";
            }}
          >
            {t("services.ctaBtn")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
