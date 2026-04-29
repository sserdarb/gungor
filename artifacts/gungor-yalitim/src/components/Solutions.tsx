import { motion } from "framer-motion";
import { Building2, Factory, Hospital, UtensilsCrossed, Home, Waves } from "lucide-react";
import { useLang } from "@/lib/i18n";

const solutionData = [
  {
    id: "otoparklar",
    icon: Building2,
    trTitle: "Otoparklar",
    enTitle: "Parking Facilities",
    trDesc: "Ağır trafik yüküne, kimyasallara ve lastik izlerine dayanıklı otopark zemin çözümleri ve yönlendirme uygulamaları.",
    enDesc: "Parking floor solutions and directional applications resistant to heavy traffic loads, chemicals, and tire marks.",
  },
  {
    id: "fabrikalar",
    icon: Factory,
    trTitle: "Fabrikalar & Depolar",
    enTitle: "Factories & Warehouses",
    trDesc: "Ağır sanayi şartlarına uygun, darbe dayanımı yüksek, tozumaz ve kolay temizlenebilir endüstriyel zeminler.",
    enDesc: "Industrial floors suitable for heavy industrial conditions, with high impact resistance, dust-free, and easily cleanable.",
  },
  {
    id: "saglik",
    icon: Hospital,
    trTitle: "Sağlık Tesisleri",
    enTitle: "Healthcare Facilities",
    trDesc: "Antibakteriyel, hijyenik, derzsiz ve sterilizasyon standartlarına tam uyumlu kaplama sistemleri.",
    enDesc: "Antibacterial, hygienic, seamless coating systems fully compliant with sterilization standards.",
  },
  {
    id: "gida",
    icon: UtensilsCrossed,
    trTitle: "Gıda Tesisleri",
    enTitle: "Food Facilities",
    trDesc: "Gıda güvenliği yönetmeliklerine uygun, asit ve kimyasallara dayanıklı, kaymaz zemin uygulamaları.",
    enDesc: "Anti-slip floor applications compliant with food safety regulations and resistant to acids and chemicals.",
  },
  {
    id: "konut",
    icon: Home,
    trTitle: "Konut & Teras",
    enTitle: "Residential & Terrace",
    trDesc: "Kesin sızdırmazlık sağlayan teras su yalıtımı ve estetik değer katan dekoratif zemin sistemleri.",
    enDesc: "Terrace waterproofing with definitive impermeability and decorative floor systems that add aesthetic value.",
  },
  {
    id: "havuz",
    icon: Waves,
    trTitle: "Havuz & Tank",
    enTitle: "Pool & Tank",
    trDesc: "Sürekli su basıncına ve kimyasallara maruz kalan alanlar için garantili yalıtım çözümleri.",
    enDesc: "Guaranteed insulation solutions for areas exposed to continuous water pressure and chemicals.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: "easeOut" },
  }),
};

export function Solutions() {
  const { lang, t } = useLang();

  return (
    <section
      id="cozumler"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-grey)" }}
    >
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(232,200,149,0.12) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 md:mb-28">
          <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold)" }}>
            {t("solutions.badge")}
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-kalnia font-semibold leading-[1.1]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--teal-dark)" }}>
              {t("solutions.title")}
            </h2>
            <p className="font-urbanist text-base leading-relaxed max-w-md" style={{ color: "#545454" }}>
              {t("solutions.sub")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t" style={{ borderColor: "rgba(13,49,67,0.1)" }}>
          {solutionData.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                data-testid={`card-solution-${solution.id}`}
                className="group bg-white border-r border-b p-10 hover:bg-[#0D3143] transition-colors duration-400 cursor-default"
                style={{ borderColor: "rgba(13,49,67,0.1)" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 border transition-all duration-400 group-hover:border-[#E8C895]/40"
                  style={{ borderColor: "rgba(13,49,67,0.15)" }}
                >
                  <Icon className="w-5 h-5 transition-colors duration-400" style={{ color: "var(--teal-dark)" }} />
                </div>

                <h3 className="font-kalnia font-semibold text-xl mb-3 transition-colors duration-400 text-[#0D3143] group-hover:text-[#E8C895]">
                  {lang === "tr" ? solution.trTitle : solution.enTitle}
                </h3>

                <p className="font-urbanist text-sm leading-relaxed transition-colors duration-400 text-[#545454] group-hover:text-white/75">
                  {lang === "tr" ? solution.trDesc : solution.enDesc}
                </p>

                <div className="mt-8 h-[1px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "var(--gold-light)" }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
