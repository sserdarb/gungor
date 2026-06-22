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
              <li><a href="mailto:info@gungormuhendislik.com.tr" className="transition-colors duration-300 hover:text-[#E8C895]">info@gungormuhendislik.com.tr</a></li>
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

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-urbanist text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} Güngör Yalıtım Uygulama Çözümleri. {t("footer.rights")}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/gungor.muhendislik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(232,200,149,0.18)", color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-light)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,200,149,0.18)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/g%C3%BCng%C3%B6r-m%C3%BChendislik-yal%C4%B1t%C4%B1m-uygulama-%C3%A7%C3%B6z%C3%BCmleri/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(232,200,149,0.18)", color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-light)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,200,149,0.18)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <p className="font-urbanist text-xs" style={{ color: "rgba(255,255,255,0.12)" }}>
            Adalet Mah. Manas Bulv. No:47/B, Bayraklı / İzmir
          </p>
        </div>
      </div>
    </footer>
  );
}
