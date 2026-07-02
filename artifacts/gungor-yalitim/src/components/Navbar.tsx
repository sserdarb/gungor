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

  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu items");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        }
      })
      .catch((err) => {
        console.error("Error loading menu items, using defaults:", err);
      });
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.includes("#") ? href.split("#")[1] : "";
      const selector = `#${hash}`;
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(selector);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
        }, 350);
        return;
      }
      const el = document.querySelector(selector);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
      return;
    }

    if (href === "/") {
      if (!isHome) {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = menuItems.length > 0
    ? menuItems.map((item) => ({
        name: lang === "tr" ? item.labelTr : item.labelEn,
        href: item.link,
      }))
    : [
        { name: t("nav.services"),   href: "#hizmetler" },
        { name: t("nav.solutions"),  href: "#cozumler" },
        { name: t("nav.whyus"),      href: "#neden-biz" },
        { name: t("nav.projects"),   href: "/projeler" },
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
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-urbanist text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                    showDark ? "text-[#545454] hover:text-[#A58E6A]" : "text-white/80 hover:text-[#E8C895]"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-3.5 mr-2">
              <a
                href="https://www.instagram.com/gungor.muhendislik"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-colors duration-300 ${
                  showDark ? "text-[#545454] hover:text-[#A58E6A]" : "text-white/80 hover:text-[#E8C895]"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/g%C3%BCng%C3%B6r-m%C3%BChendislik-yal%C4%B1t%C4%B1m-uygulama-%C3%A7%C3%B6z%C3%BCmleri/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition-colors duration-300 ${
                  showDark ? "text-[#545454] hover:text-[#A58E6A]" : "text-white/80 hover:text-[#E8C895]"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

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
              onClick={(e) => handleLinkClick(e, "#iletisim")}
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

          {/* Mobile Social Links */}
          <div className={`flex md:hidden items-center gap-4 mr-3 ml-auto z-50 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <a
              href="https://www.instagram.com/gungor.muhendislik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-5 h-5 flex items-center justify-center transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <defs>
                  <linearGradient id="instagram-grad-mobile" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#instagram-grad-mobile)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/g%C3%BCng%C3%B6r-m%C3%BChendislik-yal%C4%B1t%C4%B1m-uygulama-%C3%A7%C3%B6z%C3%BCmleri/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-5 h-5 flex items-center justify-center transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
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
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  className="font-kalnia text-3xl font-semibold text-white hover:text-[#E8C895] transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-5 mt-4"
              >
                <a
                  href="https://www.instagram.com/gungor.muhendislik"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/80 hover:text-[#E8C895] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/g%C3%BCng%C3%B6r-m%C3%BChendislik-yal%C4%B1t%C4%B1m-uygulama-%C3%A7%C3%B6z%C3%BCmleri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/80 hover:text-[#E8C895] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </motion.div>

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
                onClick={(e) => handleLinkClick(e, "#iletisim")}
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
