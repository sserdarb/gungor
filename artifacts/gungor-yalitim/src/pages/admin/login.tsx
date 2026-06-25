import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Giriş başarısız.");
      }

      toast({
        title: "Başarılı",
        description: "Yönetim paneline yönlendiriliyorsunuz.",
      });
      setLocation("/admin");
    } catch (err: any) {
      toast({
        title: "Giriş Hatası",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D3143] px-4">
      <Card className="w-full max-w-md bg-[#18465C] text-white border-[#A58E6A]/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#A58E6A]/20 rounded-full flex items-center justify-center mb-4 border border-[#E8C895]">
            <Lock className="w-8 h-8 text-[#E8C895]" />
          </div>
          <CardTitle className="font-serif text-2xl text-[#E8C895]">Güngör Yalıtım</CardTitle>
          <CardDescription className="text-gray-300">Yönetim Paneli Girişi</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">Kullanıcı Adı</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 h-5 text-[#E8C895]/70" />
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınız"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-[#0D3143]/50 border-[#A58E6A]/30 text-white placeholder-gray-400 focus:border-[#E8C895]"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Şifre</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 h-5 text-[#E8C895]/70" />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#0D3143]/50 border-[#A58E6A]/30 text-white placeholder-gray-400 focus:border-[#E8C895]"
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#A58E6A] hover:bg-[#E8C895] text-[#0D3143] font-bold transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
