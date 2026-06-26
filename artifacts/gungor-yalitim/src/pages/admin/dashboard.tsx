import { useQuery } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Briefcase, Plus, Settings, ShieldCheck, Menu, Languages, Users, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const { data: services = [] } = useQuery<any[]>({
    queryKey: ["/api/services"],
    queryFn: () => fetch("/api/services").then((res) => res.json()),
  });

  const { data: projects = [] } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });

  const { data: menuItems = [] } = useQuery<any[]>({
    queryKey: ["/api/menu-items"],
    queryFn: () => fetch("/api/menu-items").then((res) => res.json()),
  });

  const { data: translations = [] } = useQuery<any[]>({
    queryKey: ["/api/translations"],
    queryFn: () => fetch("/api/translations").then((res) => res.json()),
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold">Kontrol Paneli</h1>
          <p className="text-gray-500 mt-1">Güngör Yalıtım web sitesi yönetim ve güvenlik paneli.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Kayıtlı Hizmetler</CardTitle>
              <FileText className="h-6 w-6 text-[#A58E6A]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0D3143]">{services.length}</div>
              <CardDescription className="mt-1 text-xs">
                {services.filter(s => s.category === "water").length} Su Yalıtımı / {services.filter(s => s.category === "floor").length} Zemin
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

          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">İçerik &amp; Çeviri</CardTitle>
              <Languages className="h-6 w-6 text-[#A58E6A]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0D3143]">{translations.length}</div>
              <CardDescription className="mt-1 text-xs">
                Dinamik yönetilebilir metin anahtarı
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-[#A58E6A]/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Sistem Yöneticileri</CardTitle>
              <Users className="h-6 w-6 text-[#A58E6A]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0D3143]">{users.length}</div>
              <CardDescription className="mt-1 text-xs">
                Yönetici yetkisine sahip kullanıcı sayısı
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-[#18465C] text-white p-8 rounded-2xl border border-[#A58E6A]/30 shadow-lg space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-[#E8C895]" />
              <h2 className="text-2xl font-serif text-[#E8C895] font-semibold">Web Sitesi Yönetim Kısayolları</h2>
            </div>
            <p className="text-gray-300 max-w-3xl text-sm leading-relaxed">
              Güngör Mühendislik sitesinin tüm bölümlerini yönetmek için aşağıdaki kontrol alanlarını kullanabilirsiniz. Değişiklikler anında veritabanına işlenerek ziyaretçilere yansıtılır.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            <Link href="/admin/services">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-bold w-full flex items-center justify-between gap-2 py-6">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Hizmetler
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/projects">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-bold w-full flex items-center justify-between gap-2 py-6">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" /> Projeler
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/contents">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-bold w-full flex items-center justify-between gap-2 py-6">
                <span className="flex items-center gap-2">
                  <Languages className="w-5 h-5" /> İçerik/Çeviri
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/menus">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-bold w-full flex items-center justify-between gap-2 py-6">
                <span className="flex items-center gap-2">
                  <Menu className="w-5 h-5" /> Menüler
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/settings">
              <Button className="bg-[#E8C895] hover:bg-[#A58E6A] text-[#0D3143] font-bold w-full flex items-center justify-between gap-2 py-6">
                <span className="flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Sistem/SEO
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Security Alert Card */}
        <div className="bg-[#FDFDFD] border border-green-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
          <div className="p-3 bg-green-50 rounded-lg text-green-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#0D3143] font-bold">Güvenlik Durumu</h3>
            <p className="text-gray-600 text-sm mt-1">
              Sunucuda brute-force koruması ve güvenlik başlıkları (Helmet) aktif durumdadır. Tüm veri transferleri JWT korumalıdır.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
