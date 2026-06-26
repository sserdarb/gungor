import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Trash2, Globe, Calendar, ArrowRight, UserCheck, Bot, Search, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ChatSession {
  id: number;
  sessionId: string;
  lang: string;
  createdAt: number;
  messageCount: number;
  lastMessage: string;
}

interface ChatMessage {
  id: number;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export default function AdminChats() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLang, setFilterLang] = useState<string>("all");

  // Fetch Chat Sessions
  const { data: sessions = [], isLoading: isLoadingSessions } = useQuery<ChatSession[]>({
    queryKey: ["/api/admin/chat-sessions"],
    queryFn: () => fetch("/api/admin/chat-sessions").then((res) => res.json()),
  });

  // Fetch Selected Session Messages
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<ChatMessage[]>({
    queryKey: ["/api/admin/chat-sessions", selectedSessionId, "messages"],
    queryFn: () => {
      if (!selectedSessionId) return [];
      return fetch(`/api/admin/chat-sessions/${selectedSessionId}/messages`).then((res) => res.json());
    },
    enabled: !!selectedSessionId,
  });

  // Delete Session Mutation
  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch(`/api/admin/chat-sessions/${sessionId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Sohbet oturumu silinemedi.");
      return res.json();
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chat-sessions"] });
      toast({ title: "Başarılı", description: "Sohbet geçmişi silindi." });
      if (selectedSessionId === deletedId) {
        setSelectedSessionId(null);
      }
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the session when deleting
    if (confirm("Bu sohbet oturumunu ve tüm mesaj geçmişini silmek istediğinizden emin misiniz?")) {
      deleteSessionMutation.mutate(sessionId);
    }
  };

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    const matchSearch =
      s.sessionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLang = filterLang === "all" || s.lang === filterLang;
    return matchSearch && matchLang;
  });

  const selectedSessionDetails = sessions.find((s) => s.sessionId === selectedSessionId);

  return (
    <AdminLayout>
      <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-[#A58E6A]" /> Yapay Zeka Chatbot Yazışmaları
          </h1>
          <p className="text-gray-500 mt-1">Web sitesi ziyaretçilerinin yapay zeka chatbot ile yaptığı sohbet geçmişlerini ve yazışmaları gerçek zamanlı inceleyin.</p>
        </div>

        {/* Chat Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          {/* Left Panel: Chat Sessions List */}
          <div className="lg:col-span-5 flex flex-col min-h-0 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            {/* Search & Filter Header */}
            <div className="p-4 border-b border-gray-100 space-y-3 bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Oturum ID veya mesaj içeriği ara..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={filterLang === "all" ? "default" : "outline"}
                  onClick={() => setFilterLang("all")}
                  className={filterLang === "all" ? "bg-[#0D3143]" : "text-xs"}
                >
                  Tüm Diller
                </Button>
                <Button
                  size="sm"
                  variant={filterLang === "tr" ? "default" : "outline"}
                  onClick={() => setFilterLang("tr")}
                  className={filterLang === "tr" ? "bg-[#0D3143]" : "text-xs"}
                >
                  Türkçe
                </Button>
                <Button
                  size="sm"
                  variant={filterLang === "en" ? "default" : "outline"}
                  onClick={() => setFilterLang("en")}
                  className={filterLang === "en" ? "bg-[#0D3143]" : "text-xs"}
                >
                  English
                </Button>
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {isLoadingSessions ? (
                <div className="p-8 text-center text-gray-500 font-serif">Oturumlar yükleniyor...</div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 font-serif">Oturum bulunamadı.</div>
              ) : (
                filteredSessions.map((session) => (
                  <div
                    key={session.sessionId}
                    onClick={() => setSelectedSessionId(session.sessionId)}
                    className={`p-4 cursor-pointer transition-colors flex flex-col gap-2 relative group ${
                      selectedSessionId === session.sessionId
                        ? "bg-[#E8C895]/10 border-l-4 border-l-[#A58E6A]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="font-mono text-xs font-semibold text-gray-500 truncate max-w-[180px]">
                        ID: {session.sessionId.substring(0, 12)}...
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          <Globe className="w-2.5 h-2.5 mr-1" />
                          {session.lang.toUpperCase()}
                        </Badge>
                        <Badge className="bg-[#0D3143] text-[10px] px-1.5 py-0 hover:bg-[#0D3143]">
                          {session.messageCount} Mesaj
                        </Badge>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 line-clamp-2 pr-6">
                      {session.lastMessage || <span className="italic text-gray-400">Mesaj yok</span>}
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(session.createdAt).toLocaleDateString("tr-TR", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleDeleteSession(session.sessionId, e)}
                        className="h-6 w-6 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel: Chat Messages Log */}
          <div className="lg:col-span-7 flex flex-col min-h-0 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            {selectedSessionId ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-[#0D3143] text-sm md:text-base flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#A58E6A]" /> Oturum: {selectedSessionId}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {selectedSessionDetails &&
                          new Date(selectedSessionDetails.createdAt).toLocaleString("tr-TR")}
                      </span>
                      <span>•</span>
                      <span>Dil: <strong className="text-gray-700">{selectedSessionDetails?.lang.toUpperCase()}</strong></span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => handleDeleteSession(selectedSessionId, e)}
                    className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1.5" /> Oturumu Sil
                  </Button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                  {isLoadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-gray-500 font-serif">Mesajlar yükleniyor...</div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-gray-400 italic">Mesaj geçmişi boş.</div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isBot = message.role === "assistant";
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 max-w-[85%] ${
                            isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                              isBot
                                ? "bg-[#E8C895]/20 text-[#A58E6A] border-[#A58E6A]/20"
                                : "bg-[#0D3143] text-white border-transparent"
                            }`}
                          >
                            {isBot ? <Bot className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </div>

                          {/* Message bubble */}
                          <div className="space-y-1">
                            <div
                              className={`p-3.5 rounded-2xl shadow-sm text-sm ${
                                isBot
                                  ? "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                  : "bg-[#0D3143] text-white rounded-tr-none"
                              }`}
                            >
                              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <div
                              className={`text-[10px] text-gray-400 flex items-center gap-1 ${
                                isBot ? "justify-start pl-1" : "justify-end pr-1"
                              }`}
                            >
                              <Clock className="w-2.5 h-2.5" />
                              {new Date(message.createdAt).toLocaleTimeString("tr-TR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/20">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="font-serif text-lg font-semibold text-[#0D3143] mb-1">
                  Yazışma Geçmişi İncelemesi
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Mesaj detaylarını, kullanıcının sorduğu soruları ve chatbot'un verdiği yanıtları görmek için sol listeden bir sohbet oturumu seçin.
                </p>
                <ArrowRight className="w-5 h-5 text-[#A58E6A] mt-4 animate-pulse hidden lg:block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
