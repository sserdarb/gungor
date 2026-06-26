import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Languages, Search, Edit2, Check, X, FileEdit } from "lucide-react";

interface TranslationItem {
  id: number;
  key: string;
  tr: string;
  en: string;
}

export default function AdminContents() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [editingItem, setEditingItem] = useState<TranslationItem | null>(null);

  // Form edit states
  const [editTr, setEditTr] = useState("");
  const [editEn, setEditEn] = useState("");

  // Fetch Translations
  const { data: translations = [], isLoading } = useQuery<TranslationItem[]>({
    queryKey: ["/api/translations"],
    queryFn: () => fetch("/api/translations").then((res) => res.json()),
  });

  // Mutation for saving translations
  const saveMutation = useMutation({
    mutationFn: async (transData: { key: string; tr: string; en: string }) => {
      const res = await fetch("/api/translations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transData),
      });
      if (!res.ok) throw new Error("Çeviri kaydedilemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/translations"] });
      toast({ title: "Başarılı", description: "Çeviri başarıyla güncellendi." });
      setEditingItem(null);
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const handleStartEdit = (item: TranslationItem) => {
    setEditingItem(item);
    setEditTr(item.tr);
    setEditEn(item.en);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    saveMutation.mutate({
      key: editingItem.key,
      tr: editTr,
      en: editEn,
    });
  };

  const tabs = [
    { id: "all", label: "Tüm İçerikler" },
    { id: "nav", label: "Navigasyon & Menü" },
    { id: "hero", label: "Hero (Giriş)" },
    { id: "services", label: "Hizmetler" },
    { id: "whyus", label: "Neden Biz / Hakkımızda" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "İletişim" },
    { id: "footer", label: "Footer (Alt Bilgi)" },
  ];

  // Filtering logic
  const filteredTranslations = translations.filter((item) => {
    // 1. Search Query Filter
    const matchesSearch =
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.en.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Section Tab Filter
    if (activeTab === "all") return true;
    if (activeTab === "nav") return item.key.startsWith("nav.") || item.key.startsWith("general.");
    if (activeTab === "hero") return item.key.startsWith("hero.");
    if (activeTab === "services") return item.key.startsWith("services.") || item.key.startsWith("service.");
    if (activeTab === "whyus") return item.key.startsWith("whyus.");
    if (activeTab === "projects") return item.key.startsWith("portfolio.") || item.key.startsWith("projects.");
    if (activeTab === "contact") return item.key.startsWith("contact.");
    if (activeTab === "footer") return item.key.startsWith("footer.");

    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
            <Languages className="w-8 h-8 text-[#A58E6A]" /> İçerik &amp; Çeviri Yönetimi
          </h1>
          <p className="text-gray-500 mt-1">Web sitesindeki tüm statik metinleri, başlıkları ve açıklamaları Türkçe &amp; İngilizce olarak düzenleyin.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
              }}
              className={
                activeTab === tab.id
                  ? "bg-[#0D3143] text-white hover:bg-[#18465C]"
                  : "text-gray-600 border-gray-200 hover:bg-gray-100"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Search and Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-[#A58E6A]/20 shadow-md">
              <CardHeader className="pb-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif text-lg text-[#0D3143]">Metin Listesi</CardTitle>
                    <CardDescription>Bölüm kriterine uygun {filteredTranslations.length} kayıt listelendi</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Anahtar kelime veya metin ara..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-12 text-center text-gray-500 font-serif">Metinler yükleniyor...</div>
                ) : filteredTranslations.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 font-serif">Kriterlere uygun metin bulunamadı.</div>
                ) : (
                  <div className="max-h-[600px] overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-white z-10 shadow-sm border-b">
                        <TableRow>
                          <TableHead className="w-1/3">Etiket/Anahtar (Key)</TableHead>
                          <TableHead>Metin İçeriği (Türkçe)</TableHead>
                          <TableHead className="text-right w-24">İşlem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTranslations.map((item) => (
                          <TableRow key={item.id} className={editingItem?.id === item.id ? "bg-amber-50/50" : ""}>
                            <TableCell className="font-mono text-xs text-gray-500 font-semibold break-all">
                              {item.key}
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-sm">
                              {item.tr}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleStartEdit(item)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit2 className="w-4 h-4 mr-1" /> Düzenle
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Edit Panel */}
          <div>
            {editingItem ? (
              <Card className="border-[#A58E6A] shadow-lg sticky top-6">
                <CardHeader className="bg-amber-50/40 border-b pb-4 flex flex-row items-center gap-2">
                  <FileEdit className="w-5 h-5 text-[#A58E6A]" />
                  <div>
                    <CardTitle className="font-serif text-lg text-[#0D3143]">Metin Düzenleyici</CardTitle>
                    <CardDescription className="break-all font-mono text-xs mt-1 text-[#A58E6A]">
                      {editingItem.key}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTr">Türkçe İçerik (TR)</Label>
                    <Textarea
                      id="editTr"
                      value={editTr}
                      onChange={(e) => setEditTr(e.target.value)}
                      rows={5}
                      className="resize-y"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editEn">İngilizce İçerik (EN)</Label>
                    <Textarea
                      id="editEn"
                      value={editEn}
                      onChange={(e) => setEditEn(e.target.value)}
                      rows={5}
                      className="resize-y"
                    />
                  </div>

                  <div className="flex gap-2 border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-1/2"
                      onClick={() => setEditingItem(null)}
                    >
                      <X className="w-4 h-4 mr-1" /> İptal
                    </Button>
                    <Button
                      disabled={saveMutation.isPending}
                      className="bg-[#0D3143] hover:bg-[#18465C] text-white w-1/2"
                      onClick={handleSaveEdit}
                    >
                      <Check className="w-4 h-4 mr-1" /> {saveMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-gray-300 bg-gray-50/50 p-6 text-center text-gray-500 font-serif">
                <Languages className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p>Düzenlemek istediğiniz metnin sağındaki <strong>Düzenle</strong> butonuna tıklayarak metin düzenleyiciyi açın.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
