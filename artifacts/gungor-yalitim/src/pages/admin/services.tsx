import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, ArrowLeft, Upload, FileText } from "lucide-react";

export default function ServicesManagement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeService, setActiveService] = useState<any>(null);

  // Form states
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("water");
  const [image, setImage] = useState("");
  const [titleTr, setTitleTr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionTr, setDescriptionTr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [contentTr, setContentTr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [featuresTr, setFeaturesTr] = useState("");
  const [featuresEn, setFeaturesEn] = useState("");
  const [materialsTr, setMaterialsTr] = useState("");
  const [materialsEn, setMaterialsEn] = useState("");
  const [applicationsTr, setApplicationsTr] = useState("");
  const [applicationsEn, setApplicationsEn] = useState("");
  const [order, setOrder] = useState("0");
  const [uploading, setUploading] = useState(false);

  // Fetch Services
  const { data: services = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/services"],
    queryFn: () => fetch("/api/services").then((res) => res.json()),
  });

  // Mutations
  const saveMutation = useMutation({
    mutationFn: async (serviceData: any) => {
      const url = activeService?.id 
        ? `/api/services/${activeService.id}` 
        : "/api/services";
      const method = activeService?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData)
      });
      if (!res.ok) throw new Error("Hizmet kaydedilemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Başarılı", description: "Hizmet başarıyla kaydedildi." });
      closeForm();
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Hizmet silinemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Başarılı", description: "Hizmet silindi." });
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const openForm = (service: any = null) => {
    setActiveService(service);
    if (service) {
      setSlug(service.slug || "");
      setCategory(service.category || "water");
      setImage(service.image || "");
      setTitleTr(service.titleTr || "");
      setTitleEn(service.titleEn || "");
      setDescriptionTr(service.descriptionTr || "");
      setDescriptionEn(service.descriptionEn || "");
      setContentTr(service.contentTr || "");
      setContentEn(service.contentEn || "");
      // Convert arrays back to comma separated or stringified values for editing
      setFeaturesTr(JSON.parse(service.featuresTr || "[]").join("\n"));
      setFeaturesEn(JSON.parse(service.featuresEn || "[]").join("\n"));
      setMaterialsTr(JSON.parse(service.materialsTr || "[]").join("\n"));
      setMaterialsEn(JSON.parse(service.materialsEn || "[]").join("\n"));
      setApplicationsTr(JSON.parse(service.applicationsTr || "[]").join("\n"));
      setApplicationsEn(JSON.parse(service.applicationsEn || "[]").join("\n"));
      setOrder(String(service.order || 0));
    } else {
      setSlug("");
      setCategory("water");
      setImage("");
      setTitleTr("");
      setTitleEn("");
      setDescriptionTr("");
      setDescriptionEn("");
      setContentTr("");
      setContentEn("");
      setFeaturesTr("");
      setFeaturesEn("");
      setMaterialsTr("");
      setMaterialsEn("");
      setApplicationsTr("");
      setApplicationsEn("");
      setOrder("0");
    }
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setActiveService(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Görsel yüklenemedi.");
      const data = await res.json();
      setImage(data.url);
      toast({ title: "Başarılı", description: "Görsel yüklendi." });
    } catch (err: any) {
      toast({ title: "Yükleme Hatası", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Helper to turn newline-separated strings into string arrays
    const parseLines = (str: string) => JSON.stringify(str.split("\n").map(l => l.trim()).filter(Boolean));

    saveMutation.mutate({
      slug,
      category,
      image,
      titleTr,
      titleEn,
      descriptionTr,
      descriptionEn,
      contentTr,
      contentEn,
      featuresTr: parseLines(featuresTr),
      featuresEn: parseLines(featuresEn),
      materialsTr: parseLines(materialsTr),
      materialsEn: parseLines(materialsEn),
      applicationsTr: parseLines(applicationsTr),
      applicationsEn: parseLines(applicationsEn),
      order: Number(order)
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-[#0D3143] font-bold">Hizmetler Yönetimi</h1>
            <p className="text-gray-500 mt-1">Hizmetlerinizi ekleyin, düzenleyin veya kaldırın.</p>
          </div>
          {!isEditing && (
            <Button onClick={() => openForm()} className="bg-[#0D3143] hover:bg-[#18465C] text-white">
              <Plus className="w-4 h-4 mr-2" /> Yeni Hizmet Ekle
            </Button>
          )}
        </div>

        {isEditing ? (
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle className="font-serif text-xl text-[#0D3143]">
                {activeService ? "Hizmeti Düzenle" : "Yeni Hizmet Oluştur"}
              </CardTitle>
              <Button variant="ghost" onClick={closeForm} className="text-gray-500">
                <ArrowLeft className="w-4 h-4 mr-2" /> Listeye Geri Dön
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Hizmet Adı (TR)</Label>
                        <Input value={titleTr} onChange={e => setTitleTr(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Hizmet Adı (EN)</Label>
                        <Input value={titleEn} onChange={e => setTitleEn(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>URL Slug</Label>
                        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="temel-bohcalama" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="water">Su Yalıtımı (Waterproofing)</SelectItem>
                            <SelectItem value="floor">Zemin Çözümleri (Industrial Flooring)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Görsel URL / Yol</Label>
                        <Input value={image} onChange={e => setImage(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Görsel Yükle</Label>
                        <div className="flex items-center gap-2">
                          <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-file" />
                          <Label htmlFor="image-file" className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors w-full justify-center">
                            <Upload className="w-4 h-4 text-gray-500" />
                            <span>{uploading ? "Yükleniyor..." : "Dosya Seç"}</span>
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Kısa Açıklama (TR)</Label>
                      <Textarea value={descriptionTr} onChange={e => setDescriptionTr(e.target.value)} rows={3} required />
                    </div>

                    <div className="space-y-2">
                      <Label>Kısa Açıklama (EN)</Label>
                      <Textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3} required />
                    </div>
                  </div>

                  {/* Rich Content & Lists */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Detaylı İçerik / Açıklama (TR)</Label>
                      <Textarea value={contentTr} onChange={e => setContentTr(e.target.value)} rows={5} required />
                    </div>

                    <div className="space-y-2">
                      <Label>Detaylı İçerik / Açıklama (EN)</Label>
                      <Textarea value={contentEn} onChange={e => setContentEn(e.target.value)} rows={5} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Özellikler (TR) (Her satıra bir tane)</Label>
                        <Textarea value={featuresTr} onChange={e => setFeaturesTr(e.target.value)} rows={4} placeholder="25+ yıl ömür&#10;Hızlı kuruma" />
                      </div>
                      <div className="space-y-2">
                        <Label>Malzemeler (TR) (Her satıra bir tane)</Label>
                        <Textarea value={materialsTr} onChange={e => setMaterialsTr(e.target.value)} rows={4} placeholder="APP membran&#10;Epoksi astar" />
                      </div>
                      <div className="space-y-2">
                        <Label>Uygulama Alanları (TR) (Her satıra bir tane)</Label>
                        <Textarea value={applicationsTr} onChange={e => setApplicationsTr(e.target.value)} rows={4} placeholder="Otoparklar&#10;Fabrikalar" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Özellikler (EN) (Her satıra bir tane)</Label>
                        <Textarea value={featuresEn} onChange={e => setFeaturesEn(e.target.value)} rows={4} placeholder="25+ year lifespan&#10;Fast curing" />
                      </div>
                      <div className="space-y-2">
                        <Label>Malzemeler (EN) (Her satıra bir tane)</Label>
                        <Textarea value={materialsEn} onChange={e => setMaterialsEn(e.target.value)} rows={4} placeholder="APP membrane&#10;Epoxy primer" />
                      </div>
                      <div className="space-y-2">
                        <Label>Uygulama Alanları (EN) (Her satıra bir tane)</Label>
                        <Textarea value={applicationsEn} onChange={e => setApplicationsEn(e.target.value)} rows={4} placeholder="Parking lots&#10;Factories" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Sıralama Önceliği (Order)</Label>
                      <Input type="number" value={order} onChange={e => setOrder(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button type="button" variant="outline" onClick={closeForm}>İptal</Button>
                  <Button type="submit" className="bg-[#A58E6A] hover:bg-[#E8C895] text-[#0D3143] font-bold">Kaydet</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500 font-serif">Hizmetler yükleniyor...</div>
              ) : services.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-serif">Kayıtlı hizmet bulunamadı.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-16">Görsel</TableHead>
                      <TableHead>Hizmet Adı (TR)</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <img src={service.image} alt={service.titleTr} className="w-10 h-10 object-cover rounded border" />
                        </TableCell>
                        <TableCell className="font-semibold text-[#0D3143]">{service.titleTr}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            service.category === "water" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {service.category === "water" ? "Su Yalıtımı" : "Zemin Çözümü"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">{service.slug}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="icon" variant="ghost" onClick={() => openForm(service)} className="text-blue-600 hover:text-blue-800">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
