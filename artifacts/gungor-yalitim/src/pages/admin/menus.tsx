import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, ArrowLeft, Menu, Save } from "lucide-react";

export default function AdminMenus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  // Form states
  const [labelTr, setLabelTr] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState("0");

  // Fetch Menu Items
  const { data: menuItems = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/menu-items"],
    queryFn: () => fetch("/api/menu-items").then((res) => res.json()),
  });

  // Mutations
  const saveMutation = useMutation({
    mutationFn: async (itemData: any) => {
      const url = activeItem?.id 
        ? `/api/menu-items/${activeItem.id}` 
        : "/api/menu-items";
      const method = activeItem?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData)
      });
      if (!res.ok) throw new Error("Menü ögesi kaydedilemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "Başarılı", description: "Menü başarıyla kaydedildi." });
      closeForm();
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/menu-items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Menü ögesi silinemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "Başarılı", description: "Menü ögesi silindi." });
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    }
  });

  const openForm = (item: any = null) => {
    setActiveItem(item);
    if (item) {
      setLabelTr(item.labelTr || "");
      setLabelEn(item.labelEn || "");
      setLink(item.link || "");
      setOrder(String(item.order || 0));
    } else {
      setLabelTr("");
      setLabelEn("");
      setLink("");
      setOrder(String(menuItems.length + 1));
    }
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setActiveItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      labelTr,
      labelEn,
      link,
      order: Number(order)
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu menü ögesini silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
              <Menu className="w-8 h-8 text-[#A58E6A]" /> Menü Yönetimi
            </h1>
            <p className="text-gray-500 mt-1">Navbar ve sitenin ana yönlendirme menü bağlantılarını düzenleyin.</p>
          </div>
          {!isEditing && (
            <Button onClick={() => openForm()} className="bg-[#0D3143] hover:bg-[#18465C] text-white">
              <Plus className="w-4 h-4 mr-2" /> Yeni Menü Bağlantısı Ekle
            </Button>
          )}
        </div>

        {isEditing ? (
          <Card className="border-[#A58E6A]/20 shadow-md max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle className="font-serif text-xl text-[#0D3143]">
                {activeItem ? "Menü Ögesini Düzenle" : "Yeni Menü Ögesi Oluştur"}
              </CardTitle>
              <Button variant="ghost" onClick={closeForm} className="text-gray-500">
                <ArrowLeft className="w-4 h-4 mr-2" /> Listeye Geri Dön
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="labelTr">Menü Başlığı (TR)</Label>
                    <Input id="labelTr" value={labelTr} onChange={e => setLabelTr(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labelEn">Menü Başlığı (EN)</Label>
                    <Input id="labelEn" value={labelEn} onChange={e => setLabelEn(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Bağlantı Adresi (Örn: /projeler veya #hizmetler veya https://...)</Label>
                  <Input id="link" value={link} onChange={e => setLink(e.target.value)} placeholder="/projeler veya #hizmetler" required />
                  <p className="text-xs text-gray-400">
                    Sitedeki bölümlere yönlendirmek için: <strong>#hizmetler</strong>, <strong>#cozumler</strong>, <strong>#neden-biz</strong>, <strong>#iletisim</strong> kullanın.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Sıralama Önceliği (Order)</Label>
                  <Input id="order" type="number" value={order} onChange={e => setOrder(e.target.value)} required />
                </div>

                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button type="button" variant="outline" onClick={closeForm}>İptal</Button>
                  <Button type="submit" disabled={saveMutation.isPending} className="bg-[#A58E6A] hover:bg-[#E8C895] text-[#0D3143] font-bold">
                    <Save className="w-4 h-4 mr-2" /> Kaydet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500 font-serif">Menü ögeleri yükleniyor...</div>
              ) : menuItems.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-serif">Kayıtlı menü bulunamadı.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-16">Sıra</TableHead>
                      <TableHead>Başlık (TR)</TableHead>
                      <TableHead>Başlık (EN)</TableHead>
                      <TableHead>Bağlantı</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-xs">{item.order}</TableCell>
                        <TableCell className="font-semibold text-[#0D3143]">{item.labelTr}</TableCell>
                        <TableCell className="text-gray-600">{item.labelEn}</TableCell>
                        <TableCell className="font-mono text-xs text-gray-500">{item.link}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="icon" variant="ghost" onClick={() => openForm(item)} className="text-blue-600 hover:text-blue-800">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
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
