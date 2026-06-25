import { useQuery } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Briefcase, Plus, Settings, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const { data: services = [] } = useQuery<any[]>({
    queryKey: ["/api/services"],
    queryFn: () => fetch("/api/services").then((res) => res.json()),
  });

  const { data: projects = [] } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold">Kontrol Paneli</h1>
          <p className="text-gray-500 mt-1">Güngör Yalıtım web sitesi içerik yönetimi.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Kayıtlı Hizmetler</CardTitle>
              <FileText className="h-6 w-6 text-[#A58E6A]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0D3143]">{services.length}</div>
              <CardDescription className="mt-1 text-xs">
                {services.filter(s => s.category === "water").length} Su Yalıtımı / {services.filter(s => s.category === "floor").length} Zemin Çözümü
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Kayıtlı Projeler</CardTitle>
              <Briefcase className="h-6 w-6 text-[#A58E6A]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0D3143]">{projects.length}</div>
              <CardDescription className="mt-1 text-xs">
                Referans olarak sergilenen tamamlanmış işler
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-[#A58E6A]/20 shadow-md col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Sistem Güvenliği</CardTitle>
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-green-600">Aktif & Güvenli</div>
              <CardDescription className="mt-1 text-xs">
                SQLite veritabanı aktif, yetkili erişim devrede.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#18465C] text-white p-6 rounded-xl border border-[#A58E6A]/30 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[#E8C895]" />
            <h2 className="text-xl font-serif text-[#E8C895] font-semibold">Hızlı İşlemler</h2>
          </div>
          <p className="text-gray-300 max-w-2xl text-sm">
            Web sitenizdeki mevcut içerikleri düzenlemek veya yeni bir hizmet/proje eklemek için aşağıdaki kısayolları kullanabilirsiniz. Yaptığınız değişiklikler anında canlı sitede güncellenecektir.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/admin/services">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Yeni Hizmet Ekle
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Yeni Proje Ekle
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
