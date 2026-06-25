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
import { Plus, Edit2, Trash2, ArrowLeft, Upload, Image, X } from "lucide-react";

export default function ProjectsManagement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);

  // Form states
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("water");
  const [year, setYear] = useState("2026");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [titleTr, setTitleTr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [clientTypeTr, setClientTypeTr] = useState("");
  const [clientTypeEn, setClientTypeEn] = useState("");
  const [scopeTr, setScopeTr] = useState("");
  const [scopeEn, setScopeEn] = useState("");
  const [descriptionTr, setDescriptionTr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  
  // Details Key-Value pairs list state (e.g. Area, Duration, system)
  const [details, setDetails] = useState<any[]>([]);
  const [newLabelTr, setNewLabelTr] = useState("");
  const [newLabelEn, setNewLabelEn] = useState("");
  const [newValueTr, setNewValueTr] = useState("");
  const [newValueEn, setNewValueEn] = useState("");

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Fetch Projects
  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });

  // Mutations
  const saveMutation = useMutation({
    mutationFn: async (projectData: any) => {
      const url = activeProject?.id 
        ? `/api/projects/${activeProject.id}` 
        : "/api/projects";
      const method = activeProject?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      });
      if (!res.ok) throw new Error("Proje kaydedilemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Başarılı", description: "Proje başarıyla kaydedildi." });
      closeForm();
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Proje silinemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Başarılı", description: "Proje silindi." });
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const openForm = (project: any = null) => {
    setActiveProject(project);
    if (project) {
      setSlug(project.slug || "");
      setCategory(project.category || "water");
      setYear(String(project.year || 2026));
      setLocation(project.location || "");
      setImage(project.image || "");
      setGallery(JSON.parse(project.gallery || "[]"));
      setTitleTr(project.titleTr || "");
      setTitleEn(project.titleEn || "");
      setClientTypeTr(project.clientTypeTr || "");
      setClientTypeEn(project.clientTypeEn || "");
      setScopeTr(project.scopeTr || "");
      setScopeEn(project.scopeEn || "");
      setDescriptionTr(project.descriptionTr || "");
      setDescriptionEn(project.descriptionEn || "");
      setDetails(JSON.parse(project.details || "[]"));
    } else {
      setSlug("");
      setCategory("water");
      setYear("2026");
      setLocation("");
      setImage("");
      setGallery([]);
      setTitleTr("");
      setTitleEn("");
      setClientTypeTr("");
      setClientTypeEn("");
      setScopeTr("");
      setScopeEn("");
      setDescriptionTr("");
      setDescriptionEn("");
      setDetails([]);
    }
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setActiveProject(null);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Kapak görseli yüklenemedi.");
      const data = await res.json();
      setImage(data.url);
      toast({ title: "Başarılı", description: "Kapak görseli yüklendi." });
    } catch (err: any) {
      toast({ title: "Yükleme Hatası", description: err.message, variant: "destructive" });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      }
      setGallery([...gallery, ...uploadedUrls]);
      toast({ title: "Başarılı", description: `${uploadedUrls.length} adet galeri görseli yüklendi.` });
    } catch (err: any) {
      toast({ title: "Yükleme Hatası", description: err.message, variant: "destructive" });
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setGallery(gallery.filter((_, idx) => idx !== indexToRemove));
  };

  const addDetail = () => {
    if (!newLabelTr || !newLabelEn || !newValueTr || !newValueEn) {
      toast({ title: "Hata", description: "Lütfen özellik alanlarının tümünü doldurun.", variant: "destructive" });
      return;
    }
    const newDetail = {
      label: { tr: newLabelTr, en: newLabelEn },
      value: { tr: newValueTr, en: newValueEn }
    };
    setDetails([...details, newDetail]);
    setNewLabelTr("");
    setNewLabelEn("");
    setNewValueTr("");
    setNewValueEn("");
  };

  const removeDetail = (indexToRemove: number) => {
    setDetails(details.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveMutation.mutate({
      slug,
      category,
      year: Number(year),
      location,
      image,
      gallery: JSON.stringify(gallery),
      titleTr,
      titleEn,
      clientTypeTr,
      clientTypeEn,
      scopeTr,
      scopeEn,
      descriptionTr,
      descriptionEn,
      details: JSON.stringify(details)
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-[#0D3143] font-bold">Projeler Yönetimi</h1>
            <p className="text-gray-500 mt-1">Projelerinizi/Referanslarınızı ekleyin veya düzenleyin.</p>
          </div>
          {!isEditing && (
            <Button onClick={() => openForm()} className="bg-[#0D3143] hover:bg-[#18465C] text-white">
              <Plus className="w-4 h-4 mr-2" /> Yeni Proje Ekle
            </Button>
          )}
        </div>

        {isEditing ? (
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle className="font-serif text-xl text-[#0D3143]">
                {activeProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
              </CardTitle>
              <Button variant="ghost" onClick={closeForm} className="text-gray-500">
                <ArrowLeft className="w-4 h-4 mr-2" /> Listeye Geri Dön
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General settings */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Proje Adı (TR)</Label>
                        <Input value={titleTr} onChange={e => setTitleTr(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Proje Adı (EN)</Label>
                        <Input value={titleEn} onChange={e => setTitleEn(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>URL Slug</Label>
                        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="endustriyel-epoksi-zemin" required />
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
                      <div className="space-y-2">
                        <Label>Proje Yılı</Label>
                        <Input type="number" value={year} onChange={e => setYear(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Lokasyon / Konum</Label>
                        <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="İzmir, Türkiye" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Müşteri Tipi (TR) (Örn: Üretim Tesisi)</Label>
                        <Input value={clientTypeTr} onChange={e => setClientTypeTr(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Müşteri Tipi (EN)</Label>
                        <Input value={clientTypeEn} onChange={e => setClientTypeEn(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Uygulama Kapsamı (TR) (Örn: Epoksi Kaplama)</Label>
                        <Input value={scopeTr} onChange={e => setScopeTr(e.target.value)} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Uygulama Kapsamı (EN)</Label>
                        <Input value={scopeEn} onChange={e => setScopeEn(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Kapak Görseli URL</Label>
                        <Input value={image} onChange={e => setImage(e.target.value)} required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Kapak Görseli Yükle</Label>
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" id="cover-file" />
                        <Label htmlFor="cover-file" className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors w-full justify-center">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span>{uploadingCover ? "Yükleniyor..." : "Dosya Seç"}</span>
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Açıklama (TR)</Label>
                      <Textarea value={descriptionTr} onChange={e => setDescriptionTr(e.target.value)} rows={4} required />
                    </div>

                    <div className="space-y-2">
                      <Label>Açıklama (EN)</Label>
                      <Textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={4} required />
                    </div>
                  </div>

                  {/* Gallery & specs builder */}
                  <div className="space-y-4">
                    {/* Gallery section */}
                    <div className="space-y-2">
                      <Label className="block">Proje Galeri Resimleri</Label>
                      <div className="flex items-center gap-2 mb-2">
                        <Input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" id="gallery-files" />
                        <Label htmlFor="gallery-files" className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors w-full justify-center">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span>{uploadingGallery ? "Yükleniyor..." : "Çoklu Resim Seçip Yükle"}</span>
                        </Label>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border p-2 rounded-lg bg-gray-50 max-h-48 overflow-y-auto">
                        {gallery.length === 0 ? (
                          <div className="col-span-3 text-center text-xs text-gray-400 py-6">Kayıtlı galeri görseli yok.</div>
                        ) : (
                          gallery.map((url, idx) => (
                            <div key={idx} className="relative group border rounded overflow-hidden h-20 bg-white">
                              <img src={url} alt={`proje-${idx}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Details builder */}
                    <div className="space-y-2 border p-4 rounded-lg bg-gray-50">
                      <Label className="font-semibold text-gray-700">Özel Detaylar (Alan, Süre, Kalınlık vb.)</Label>
                      <div className="space-y-2 my-2">
                        {details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border text-xs">
                            <div>
                              <span className="font-semibold">{detail.label.tr} / {detail.label.en}:</span>{" "}
                              <span>{detail.value.tr} / {detail.value.en}</span>
                            </div>
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => removeDetail(idx)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Özellik Adı (TR)</Label>
                          <Input size={1} className="h-8 text-xs" value={newLabelTr} onChange={e => setNewLabelTr(e.target.value)} placeholder="Alan" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Özellik Adı (EN)</Label>
                          <Input size={1} className="h-8 text-xs" value={newLabelEn} onChange={e => setNewLabelEn(e.target.value)} placeholder="Area" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Değer (TR)</Label>
                          <Input size={1} className="h-8 text-xs" value={newValueTr} onChange={e => setNewValueTr(e.target.value)} placeholder="3.200 m²" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Değer (EN)</Label>
                          <Input size={1} className="h-8 text-xs" value={newValueEn} onChange={e => setNewValueEn(e.target.value)} placeholder="3,200 m²" />
                        </div>
                      </div>
                      <Button type="button" onClick={addDetail} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 h-8 text-xs">
                        Özellik Ekle
                      </Button>
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
                <div className="p-12 text-center text-gray-500 font-serif">Projeler yükleniyor...</div>
              ) : projects.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-serif">Kayıtlı referans bulunamadı.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-16">Görsel</TableHead>
                      <TableHead>Proje Başlığı (TR)</TableHead>
                      <TableHead>Yıl</TableHead>
                      <TableHead>Konum</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <img src={project.image} alt={project.titleTr} className="w-10 h-10 object-cover rounded border" />
                        </TableCell>
                        <TableCell className="font-semibold text-[#0D3143]">{project.titleTr}</TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            project.category === "water" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {project.category === "water" ? "Su Yalıtımı" : "Zemin Çözümü"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="icon" variant="ghost" onClick={() => openForm(project)} className="text-blue-600 hover:text-blue-800">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800">
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
