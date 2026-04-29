import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "@/lib/i18n";

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate]                    = useLocation();
  const { lang, toggle, t }                     = useLang();

  const isHome = location === "/" || location === "";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  /* scroll-to or navigate-then-scroll */
  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
      }, 350);
      return;
    }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  const navLinks = [
    { name: t("nav.services"),   href: "#hizmetler" },
    { name: t("nav.solutions"),  href: "#cozumler" },
    { name: t("nav.whyus"),      href: "#neden-biz" },
    { name: t("nav.projects"),   href: "#projeler", isProjectsLink: true },
    { name: t("nav.contact"),    href: "#iletisim" },
  ];

  const showDark = isScrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showDark
            ? "py-2 bg-white/97 backdrop-blur-xl border-b border-[#E8C895]/40 shadow-sm"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="z-50 flex items-center"
          >
            <img
              src="/images/logo.svg"
              alt="Güngör Yalıtım Uygulama Çözümleri"
              className="w-auto transition-all duration-400"
              style={{
                height: "64px",
                filter: showDark ? "brightness(0)" : "brightness(0) invert(1)",
              }}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.isProjectsLink ? (
                  <a
                    href="/projeler"
                    onClick={(e) => { e.preventDefault(); navigate("/projeler"); }}
                    className={`font-urbanist text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      showDark ? "text-[#545454] hover:text-[#A58E6A]" : "text-white/80 hover:text-[#E8C895]"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className={`font-urbanist text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      showDark ? "text-[#545454] hover:text-[#A58E6A]" : "text-white/80 hover:text-[#E8C895]"
                    }`}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className={`font-urbanist text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 border transition-all duration-300 ${
                showDark
                  ? "border-[#0D3143]/30 text-[#0D3143] hover:bg-[#0D3143] hover:text-white"
                  : "border-white/30 text-white hover:border-[#E8C895] hover:text-[#E8C895]"
              }`}
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>

            <a
              href="#iletisim"
              onClick={(e) => scrollTo(e, "#iletisim")}
              data-testid="button-nav-teklif"
              className={`inline-flex items-center gap-2 px-6 py-2.5 font-urbanist text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${
                showDark
                  ? "bg-[#0D3143] text-white border-[#0D3143] hover:bg-[#18465C]"
                  : "bg-white/10 text-white border-[#E8C895]/50 hover:bg-[#E8C895]/20 backdrop-blur-sm"
              }`}
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Burger */}
          <button
            className="md:hidden z-50 w-8 h-8 flex flex-col justify-center gap-[6px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <span className={`block h-[2px] w-full transition-colors ${showDark ? "bg-[#0D3143]" : "bg-white"}`} />
                <span className={`block h-[2px] w-3/4 transition-colors ${showDark ? "bg-[#0D3143]" : "bg-white"}`} />
                <span className={`block h-[2px] w-full transition-colors ${showDark ? "bg-[#0D3143]" : "bg-white"}`} />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ right: "-100vw" }}
            animate={{ right: 0 }}
            exit={{ right: "-100vw" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#18465C]/95 backdrop-blur-xl flex flex-col items-end"
          >
            <div className="w-full flex flex-col justify-center items-center h-full gap-8 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.isProjectsLink ? "/projeler" : link.href}
                  onClick={(e) => {
                    if (link.isProjectsLink) { e.preventDefault(); navigate("/projeler"); setIsMobileMenuOpen(false); }
                    else scrollTo(e, link.href);
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  className="font-kalnia text-3xl font-semibold text-white hover:text-[#E8C895] transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                onClick={toggle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-urbanist text-sm font-bold uppercase tracking-[0.25em] border border-white/30 text-white px-6 py-2 hover:border-[#E8C895] hover:text-[#E8C895] transition-all"
              >
                {lang === "tr" ? "Switch to EN" : "TR'ye Geç"}
              </motion.button>
              <motion.a
                href="#iletisim"
                onClick={(e) => scrollTo(e, "#iletisim")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-3 border border-[#E8C895] text-[#E8C895] font-urbanist font-bold uppercase tracking-widest text-sm hover:bg-[#E8C895] hover:text-[#0D3143] transition-all duration-300"
              >
                {t("nav.cta")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
