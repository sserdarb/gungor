import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, FileText, Briefcase, LogOut, Home, Menu, X, Globe, Settings, ListCollapse, Users, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("Oturum bulunamadı.");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setLocation("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({ title: "Başarılı", description: "Çıkış yapıldı." });
      setLocation("/admin/login");
    } catch (err) {
      toast({ title: "Hata", description: "Çıkış yapılırken bir hata oluştu.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D3143] text-white flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-[#E8C895] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-lg text-[#E8C895]">Yükleniyor...</p>
      </div>
    );
  }

  const sidebarLinks = [
    { href: "/admin", label: "Kontrol Paneli", icon: LayoutDashboard },
    { href: "/admin/services", label: "Hizmetler Yönetimi", icon: FileText },
    { href: "/admin/projects", label: "Projeler Yönetimi", icon: Briefcase },
    { href: "/admin/contents", label: "İçerik Yönetimi", icon: Languages },
    { href: "/admin/menus", label: "Menü Yönetimi", icon: ListCollapse },
    { href: "/admin/users", label: "Yöneticiler", icon: Users },
    { href: "/admin/settings", label: "Sistem & SEO Ayarları", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-[#0D3143] text-white flex-col border-r border-[#A58E6A]/20">
        <div className="p-6 border-b border-[#A58E6A]/20 flex flex-col items-center">
          <Globe className="w-8 h-8 text-[#E8C895] mb-2 animate-pulse" />
          <h2 className="font-serif text-xl text-[#E8C895] font-semibold text-center">Güngör Yalıtım</h2>
          <span className="text-xs text-gray-400 mt-1">Yönetim Paneli</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#18465C] transition-colors text-gray-300 hover:text-white border border-transparent hover:border-[#A58E6A]/20">
                  <Icon className="w-5 h-5 text-[#E8C895]" />
                  <span>{link.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#A58E6A]/20 space-y-2">
          <div className="text-xs text-gray-400 px-4 py-2">
            Giriş yapan: <span className="font-semibold text-white">{user?.username}</span>
          </div>
          <Link href="/">
            <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm">
              <Home className="w-4 h-4" />
              <span>Web Sitesine Git</span>
            </a>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-sm text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#0D3143] text-white p-4 flex items-center justify-between border-b border-[#A58E6A]/20">
        <h2 className="font-serif text-lg text-[#E8C895]">Güngör Yalıtım</h2>
        <Button variant="ghost" className="text-[#E8C895]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D3143] text-white p-4 space-y-2 border-b border-[#A58E6A]/20">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#18465C] text-gray-300 hover:text-white">
                  <Icon className="w-5 h-5 text-[#E8C895]" />
                  <span>{link.label}</span>
                </a>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#A58E6A]/20 space-y-2 text-sm">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <a className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white">
                <Home className="w-4 h-4" />
                <span>Web Sitesine Git</span>
              </a>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
