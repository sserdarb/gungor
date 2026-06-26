import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize session and welcome message
  useEffect(() => {
    let sId = sessionStorage.getItem("gungor_chat_session_id");
    if (!sId) {
      sId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("gungor_chat_session_id", sId);
    }
    setSessionId(sId);

    // Initial welcome message
    const welcomeTr = "Merhaba! Güngör Yalıtım akıllı asistanına hoş geldiniz. Size su yalıtımı, endüstriyel zemin kaplamaları veya projelerimiz hakkında nasıl yardımcı olabilirim? Teklif veya keşif taleplerinizi de buradan iletebilirsiniz.";
    const welcomeEn = "Hello! Welcome to Güngör Yalıtım's smart assistant. How can I help you today with waterproofing, floor coatings, or our projects? You can also request a quote or site survey here.";
    
    setMessages([
      {
        role: "assistant",
        content: lang === "en" ? welcomeEn : welcomeTr
      }
    ]);
  }, [lang]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMsg = inputVal.trim();
    setInputVal("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMsg,
          lang
        })
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error(err);
      const errTr = "Bağlantıda bir sorun oluştu. Lütfen daha sonra tekrar deneyin veya telefon numaramızdan bizimle doğrudan iletişime geçin.";
      const errEn = "There was a connection issue. Please try again later or contact us directly via our phone number.";
      setMessages((prev) => [...prev, { role: "assistant", content: lang === "en" ? errEn : errTr }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 180 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-24 z-50 w-14 h-14 flex items-center justify-center rounded-none shadow-[0_8px_30px_rgba(13,49,67,0.35)] border border-[#E8C895]/50 transition-all duration-300"
        style={{ backgroundColor: "var(--teal-dark)", color: "var(--gold-light)" }}
        aria-label="Akıllı Asistan ile sohbet edin"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 md:right-24 z-50 w-[350px] md:w-[400px] h-[500px] bg-white border border-[#E8C895]/40 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between text-white border-b border-[#E8C895]/30" style={{ backgroundColor: "var(--teal-dark)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center border border-[#E8C895]/40" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <Bot className="w-5 h-5 text-[#E8C895]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#E8C895]">Güngör Yalıtım Asistanı</h4>
                  <span className="text-[10px] text-green-400 flex items-center gap-1 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div key={idx} className={`flex items-start gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}>
                    {isAssistant && (
                      <div className="w-7 h-7 flex items-center justify-center shrink-0 border border-gray-200 bg-white">
                        <Bot className="w-4 h-4 text-[#0D3143]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                        isAssistant
                          ? "bg-white border border-gray-150 text-gray-700 shadow-sm"
                          : "bg-[#0D3143] text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {!isAssistant && (
                      <div className="w-7 h-7 flex items-center justify-center shrink-0 bg-gray-200 text-gray-600">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0 border border-gray-200 bg-white">
                    <Bot className="w-4 h-4 text-[#0D3143]" />
                  </div>
                  <div className="bg-white border border-gray-150 p-3 rounded-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 border-t bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={lang === "en" ? "Type your message..." : "Mesajınızı yazın..."}
                className="flex-1 h-10 px-3 border border-gray-200 text-xs focus:outline-none focus:border-[#0D3143] text-gray-700"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="w-10 h-10 flex items-center justify-center bg-[#0D3143] text-white hover:bg-[#18465C] disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
