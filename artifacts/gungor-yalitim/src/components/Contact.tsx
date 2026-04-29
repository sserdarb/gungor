import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function Contact() {
  const { lang, t } = useLang();

  const contactItems = [
    {
      icon: MapPin,
      labelKey: "contact.address",
      content: "Adalet Mah. Manas Bulv. No:47/B\nFolkart Towers A Kule Kat:26 D:2601\n35530 Bayraklı / İzmir",
      href: undefined as string | undefined,
    },
    {
      icon: Phone,
      labelKey: "contact.phone_label",
      content: "+90 554 561 64 83",
      href: "tel:+905545616483",
    },
    {
      icon: Mail,
      labelKey: "contact.email",
      content: "info@gungoryalitim.com",
      href: "mailto:info@gungoryalitim.com",
    },
  ];

  return (
    <section
      id="iletisim"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--teal-dark)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />
      <div className="absolute top-0 left-0 w-[45vw] h-[45vw] max-w-[600px] pointer-events-none opacity-70" style={{ background: "radial-gradient(ellipse at 15% 10%, rgba(232,200,149,0.14) 0%, transparent 65%)" }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20">
          <span className="inline-block font-urbanist text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold-light)" }}>
            {t("contact.badge")}
          </span>
          <h2 className="font-kalnia font-semibold text-white leading-[1.1]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {t("contact.title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-2 flex flex-col justify-center gap-10">
            <p className="font-urbanist text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("contact.sub")}
            </p>

            {contactItems.map(({ icon: Icon, labelKey, content, href }, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(232,200,149,0.3)", color: "var(--gold-light)" }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-urbanist text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {t(labelKey)}
                  </p>
                  {href ? (
                    <a href={href} className="font-urbanist text-sm leading-relaxed text-white/75 hover:text-[#E8C895] transition-colors duration-300 whitespace-pre-line">{content}</a>
                  ) : (
                    <p className="font-urbanist text-sm leading-relaxed text-white/75 whitespace-pre-line">{content}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/905545616483"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-contact-whatsapp"
              className="inline-flex items-center gap-3 px-6 py-3.5 font-urbanist font-bold text-sm uppercase tracking-widest transition-all duration-300 w-fit"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.112.552 4.09 1.519 5.812L0 24l6.374-1.492A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.728 9.728 0 01-5.04-1.408l-.361-.214-3.79.886.916-3.677-.235-.38A9.73 9.73 0 012.25 12c0-5.376 4.374-9.75 9.75-9.75S21.75 6.624 21.75 12s-4.374 9.75-9.75 9.75z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-3">
            <div className="p-10 md:p-12" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,200,149,0.2)" }}>
              <h3 className="font-kalnia font-semibold text-2xl text-white mb-8">
                {lang === "tr" ? "Mesaj Gönderin" : "Send a Message"}
              </h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: "name",  labelKey: "contact.name",  placeholder: lang === "tr" ? "Adınız Soyadınız" : "Full Name", type: "text",  testId: "input-name" },
                    { id: "phone", labelKey: "contact.phone", placeholder: "05XX XXX XX XX",   type: "tel",   testId: "input-phone" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="block font-urbanist text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(232,200,149,0.6)" }}>
                        {t(field.labelKey)}
                      </label>
                      <Input
                        id={field.id}
                        type={field.type}
                        data-testid={field.testId}
                        placeholder={field.placeholder}
                        className="h-12 font-urbanist text-white placeholder:text-white/25 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-[#E8C895]"
                        style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block font-urbanist text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(232,200,149,0.6)" }}>
                    {t("contact.service")}
                  </label>
                  <select
                    id="service"
                    data-testid="select-service"
                    className="w-full h-12 font-urbanist text-sm text-white/70 focus:outline-none pb-2"
                    style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <option value="" className="text-[#0D3143] bg-white">{lang === "tr" ? "Seçiniz..." : "Select..."}</option>
                    <option value="su-yalitimi" className="text-[#0D3143] bg-white">{lang === "tr" ? "Su Yalıtımı Sistemleri" : "Waterproofing Systems"}</option>
                    <option value="zemin-kaplama" className="text-[#0D3143] bg-white">{lang === "tr" ? "Endüstriyel Zemin Kaplama" : "Industrial Flooring"}</option>
                    <option value="asma-tavan" className="text-[#0D3143] bg-white">{lang === "tr" ? "Asma Tavan Sistemleri" : "Suspended Ceiling Systems"}</option>
                    <option value="diger" className="text-[#0D3143] bg-white">{lang === "tr" ? "Diğer" : "Other"}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-urbanist text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(232,200,149,0.6)" }}>
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    data-testid="input-message"
                    placeholder={lang === "tr" ? "Projeniz hakkında kısaca bilgi verebilirsiniz..." : "Tell us briefly about your project..."}
                    className="min-h-[120px] font-urbanist text-white placeholder:text-white/25 rounded-none border-0 border-b focus-visible:ring-0 resize-none"
                    style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  />
                </div>

                <button
                  type="submit"
                  data-testid="button-form-submit"
                  className="w-full h-14 flex items-center justify-center gap-3 font-urbanist font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300"
                  style={{ backgroundColor: "var(--gold-light)", color: "var(--teal-dark)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold-light)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--teal-dark)"; }}
                >
                  <Send className="w-4 h-4" />
                  {t("contact.send")}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
