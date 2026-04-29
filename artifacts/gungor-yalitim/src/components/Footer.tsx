import { useLocation } from "wouter";
import { useLang } from "@/lib/i18n";
import { waterServices, floorServices } from "@/data/services";

export function Footer() {
  const [, navigate] = useLocation();
  const { lang, t } = useLang();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  const featuredWater = waterServices.slice(0, 4);
  const featuredFloor = floorServices.slice(0, 4);

  return (
    <footer className="py-16 md:py-20" style={{ backgroundColor: "#071e2b", borderTop: "1px solid rgba(232,200,149,0.12)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <img
              src="/images/logo.svg"
              alt="Güngör Yalıtım"
              className="mb-5 w-auto"
              style={{ height: "52px", filter: "brightness(0) invert(1)", opacity: 0.8 }}
            />
            <p className="font-urbanist text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("footer.tagline")}
            </p>
            <div className="mt-6 h-[1px] w-12" style={{ backgroundColor: "var(--gold)" }} />
          </div>

          {/* Water services */}
          <div>
            <p className="font-urbanist text-[9px] font-bold uppercase tracking-[0.28em] mb-5" style={{ color: "rgba(232,200,149,0.5)" }}>
              {lang === "tr" ? "Su Yalıtımı" : "Waterproofing"}
            </p>
            <ul className="space-y-3">
              {featuredWater.map((svc) => (
                <li key={svc.slug}>
                  <button
                    onClick={() => navigate(`/hizmetler/${svc.slug}`)}
                    className="font-urbanist text-sm text-left transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-light)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {svc.title[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Floor services */}
          <div>
            <p className="font-urbanist text-[9px] font-bold uppercase tracking-[0.28em] mb-5" style={{ color: "rgba(232,200,149,0.5)" }}>
              {lang === "tr" ? "Zemin & Tavan" : "Flooring & Ceiling"}
            </p>
            <ul className="space-y-3">
              {featuredFloor.map((svc) => (
                <li key={svc.slug}>
                  <button
                    onClick={() => navigate(`/hizmetler/${svc.slug}`)}
                    className="font-urbanist text-sm text-left transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-light)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {svc.title[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-urbanist text-[9px] font-bold uppercase tracking-[0.28em] mb-5" style={{ color: "rgba(232,200,149,0.5)" }}>
              {t("footer.contact")}
            </p>
            <ul className="space-y-3 font-urbanist text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              <li>Folkart Towers A Kule Kat:26</li>
              <li>35530 Bayraklı / İzmir</li>
              <li><a href="tel:+905545616483" className="transition-colors duration-300 hover:text-[#E8C895]">+90 554 561 64 83</a></li>
              <li><a href="mailto:info@gungoryalitim.com" className="transition-colors duration-300 hover:text-[#E8C895]">info@gungoryalitim.com</a></li>
            </ul>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate("/projeler")}
                className="font-urbanist text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 transition-all duration-300"
                style={{ border: "1px solid rgba(232,200,149,0.25)", color: "var(--gold-light)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,200,149,0.25)"; }}
              >
                {t("footer.projects")}
              </button>
              <button
                onClick={() => scrollTo("#iletisim")}
                className="font-urbanist text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 transition-all duration-300 text-white"
                style={{ backgroundColor: "var(--teal-mid)" }}
              >
                {t("footer.contact")}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-urbanist text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} Güngör Yalıtım Uygulama Çözümleri. {t("footer.rights")}
          </p>
          <p className="font-urbanist text-xs" style={{ color: "rgba(255,255,255,0.12)" }}>
            Adalet Mah. Manas Bulv. No:47/B, Bayraklı / İzmir
          </p>
        </div>
      </div>
    </footer>
  );
}
