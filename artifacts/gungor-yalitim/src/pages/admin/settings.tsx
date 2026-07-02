import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Settings, ShieldAlert, Globe, MessageSquare, Megaphone, Video } from "lucide-react";

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Form states
  const [titleTr, setTitleTr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionTr, setDescriptionTr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [keywordsTr, setKeywordsTr] = useState("");
  const [keywordsEn, setKeywordsEn] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [googleSearchConsoleId, setGoogleSearchConsoleId] = useState("");
  const [googleTagManagerId, setGoogleTagManagerId] = useState("");
  const [facebookPixelId, setFacebookPixelId] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddressTr, setContactAddressTr] = useState("");
  const [contactAddressEn, setContactAddressEn] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [heroVideoUrl, setHeroVideoUrl] = useState("");

  // Fetch Settings
  const { data: settings, isLoading } = useQuery<any>({
    queryKey: ["/api/settings"],
    queryFn: () => fetch("/api/settings").then((res) => res.json()),
  });

  // Sync state with fetched settings
  useEffect(() => {
    if (settings) {
      setTitleTr(settings.titleTr || "");
      setTitleEn(settings.titleEn || "");
      setDescriptionTr(settings.descriptionTr || "");
      setDescriptionEn(settings.descriptionEn || "");
      setKeywordsTr(settings.keywordsTr || "");
      setKeywordsEn(settings.keywordsEn || "");
      setGoogleAnalyticsId(settings.googleAnalyticsId || "");
      setGoogleSearchConsoleId(settings.googleSearchConsoleId || "");
      setGoogleTagManagerId(settings.googleTagManagerId || "");
      setFacebookPixelId(settings.facebookPixelId || "");
      setWhatsappNumber(settings.whatsappNumber || "");
      setContactEmail(settings.contactEmail || "");
      setContactPhone(settings.contactPhone || "");
      setContactAddressTr(settings.contactAddressTr || "");
      setContactAddressEn(settings.contactAddressEn || "");
      setSocialFacebook(settings.socialFacebook || "");
      setSocialInstagram(settings.socialInstagram || "");
      setSocialLinkedin(settings.socialLinkedin || "");
      setHeroVideoUrl(settings.heroVideoUrl || "");
    }
  }, [settings]);

  // Mutation for saving settings
  const saveMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Ayarlar kaydedilemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Başarılı", description: "Sistem ve SEO ayarları başarıyla güncellendi." });
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      titleTr,
      titleEn,
      descriptionTr,
      descriptionEn,
      keywordsTr,
      keywordsEn,
      googleAnalyticsId: googleAnalyticsId || null,
      googleSearchConsoleId: googleSearchConsoleId || null,
      googleTagManagerId: googleTagManagerId || null,
      facebookPixelId: facebookPixelId || null,
      whatsappNumber,
      contactEmail,
      contactPhone,
      contactAddressTr,
      contactAddressEn,
      socialFacebook: socialFacebook || null,
      socialInstagram: socialInstagram || null,
      socialLinkedin: socialLinkedin || null,
      heroVideoUrl: heroVideoUrl || null,
    });
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
              <Settings className="w-8 h-8 text-[#A58E6A]" /> Sistem &amp; SEO Ayarları
            </h1>
            <p className="text-gray-500 mt-1">Sitenin genel bilgilerini, Google entegrasyonlarını ve SEO etiketlerini yönetin.</p>
          </div>
          <Button type="submit" disabled={saveMutation.isPending} className="bg-[#0D3143] hover:bg-[#18465C] text-white">
            <Save className="w-4 h-4 mr-2" /> {saveMutation.isPending ? "Kaydediliyor..." : "Ayarları Kaydet"}
          </Button>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-serif">Ayarlar yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section 1: Contact info */}
            <Card className="border-[#A58E6A]/20 shadow-md">
              <CardHeader className="border-b pb-4 flex flex-row items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#A58E6A]" />
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">İletişim &amp; Kurumsal Bilgiler</CardTitle>
                  <CardDescription>Sitedeki telefon, e-posta, adres ve WhatsApp numaraları</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Telefon (Uluslararası formatta, örn: 905541624638)</Label>
                    <Input id="whatsapp" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">İletişim Telefonu (Ekranda görünecek formatta)</Label>
                    <Input id="phone" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Kurumsal E-posta Adresi</Label>
                  <Input id="email" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressTr">Fiziksel Adres (TR)</Label>
                  <Textarea id="addressTr" value={contactAddressTr} onChange={e => setContactAddressTr(e.target.value)} rows={2} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressEn">Fiziksel Adres (EN)</Label>
                  <Textarea id="addressEn" value={contactAddressEn} onChange={e => setContactAddressEn(e.target.value)} rows={2} required />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Social Media links */}
            <Card className="border-[#A58E6A]/20 shadow-md">
              <CardHeader className="border-b pb-4 flex flex-row items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#A58E6A]" />
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">Sosyal Medya Hesapları</CardTitle>
                  <CardDescription>Sitenin alt bilgisinde (Footer) görüntülenecek linkler</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook Sayfa Linki</Label>
                  <Input id="facebook" type="url" value={socialFacebook} onChange={e => setSocialFacebook(e.target.value)} placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Profil Linki</Label>
                  <Input id="instagram" type="url" value={socialInstagram} onChange={e => setSocialInstagram(e.target.value)} placeholder="https://instagram.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Sayfa Linki</Label>
                  <Input id="linkedin" type="url" value={socialLinkedin} onChange={e => setSocialLinkedin(e.target.value)} placeholder="https://linkedin.com/company/..." />
                </div>
              </CardContent>
            </Card>

            {/* Section: Ana Sayfa Yönetimi - Hero Video */}
            <Card className="border-[#A58E6A]/20 shadow-md lg:col-span-2 border-l-4 border-l-[#A58E6A]">
              <CardHeader className="border-b pb-4 flex flex-row items-center gap-2">
                <Video className="w-5 h-5 text-[#A58E6A]" />
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">Ana Sayfa Yönetimi — Hero Video</CardTitle>
                  <CardDescription>Ana sayfanın arka plan videosunu yönetin. MP4 URL'si veya /videos/dosya.mp4 şeklinde sunucu yolu girin.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroVideoUrl">Hero Video URL veya Dosya Yolu</Label>
                  <Input
                    id="heroVideoUrl"
                    value={heroVideoUrl}
                    onChange={e => setHeroVideoUrl(e.target.value)}
                    placeholder="/videos/waterproofing_flooring_services.mp4 veya https://..."
                  />
                  <p className="text-xs text-gray-500">Örnek: <code className="bg-gray-100 px-1 rounded">/videos/waterproofing_flooring_services.mp4</code> — Boş bırakırsanız varsayılan video kullanılır.</p>
                </div>
                {heroVideoUrl && (
                  <div className="mt-4 rounded overflow-hidden border border-[#A58E6A]/20">
                    <video
                      src={heroVideoUrl}
                      className="w-full max-h-48 object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                    />
                    <p className="text-xs text-center text-gray-400 py-1 bg-gray-50">Önizleme</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 3: SEO Metadata */}
            <Card className="border-[#A58E6A]/20 shadow-md lg:col-span-2">
              <CardHeader className="border-b pb-4 flex flex-row items-center gap-2">
                <Globe className="w-5 h-5 text-[#A58E6A]" />
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">SEO Meta Bilgileri</CardTitle>
                  <CardDescription>Arama motorları için başlık (Title), açıklama (Description) ve anahtar kelimeler (Keywords)</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-serif font-semibold text-sm text-[#0D3143] border-b pb-1">Türkçe Arama Sonuçları</h3>
                    <div className="space-y-2">
                      <Label htmlFor="titleTr">Sayfa Başlığı (Title) - TR</Label>
                      <Input id="titleTr" value={titleTr} onChange={e => setTitleTr(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descTr">Sayfa Açıklaması (Meta Description) - TR</Label>
                      <Textarea id="descTr" value={descriptionTr} onChange={e => setDescriptionTr(e.target.value)} rows={3} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keysTr">Anahtar Kelimeler (Meta Keywords) - TR (Virgülle ayırın)</Label>
                      <Input id="keysTr" value={keywordsTr} onChange={e => setKeywordsTr(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif font-semibold text-sm text-[#0D3143] border-b pb-1">İngilizce Arama Sonuçları</h3>
                    <div className="space-y-2">
                      <Label htmlFor="titleEn">Sayfa Başlığı (Title) - EN</Label>
                      <Input id="titleEn" value={titleEn} onChange={e => setTitleEn(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descEn">Sayfa Açıklaması (Meta Description) - EN</Label>
                      <Textarea id="descEn" value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keysEn">Anahtar Kelimeler (Meta Keywords) - EN (Virgülle ayırın)</Label>
                      <Input id="keysEn" value={keywordsEn} onChange={e => setKeywordsEn(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Integrations */}
            <Card className="border-[#A58E6A]/20 shadow-md lg:col-span-2">
              <CardHeader className="border-b pb-4 flex flex-row items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#A58E6A]" />
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">Pazarlama ve Analitik Entegrasyonları</CardTitle>
                  <CardDescription>İzleme kodları, ölçüm kimlikleri ve doğrulama kodları</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gaId">Google Analytics Ölçüm Kimliği (GA4, örn: G-XXXXXXXXXX)</Label>
                  <Input id="gaId" value={googleAnalyticsId} onChange={e => setGoogleAnalyticsId(e.target.value)} placeholder="G-XXXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gtmId">Google Tag Manager Kimliği (GTM, örn: GTM-XXXXXXX)</Label>
                  <Input id="gtmId" value={googleTagManagerId} onChange={e => setGoogleTagManagerId(e.target.value)} placeholder="GTM-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gscId">Google Search Console Doğrulama Kodu</Label>
                  <Input id="gscId" value={googleSearchConsoleId} onChange={e => setGoogleSearchConsoleId(e.target.value)} placeholder="Uzun doğrulama anahtarı" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fbPixel">Facebook Pixel ID</Label>
                  <Input id="fbPixel" value={facebookPixelId} onChange={e => setFacebookPixelId(e.target.value)} placeholder="Örn: 1234567890" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </form>
    </AdminLayout>
  );
}
