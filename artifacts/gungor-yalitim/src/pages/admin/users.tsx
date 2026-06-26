import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, KeyRound, Trash2, ShieldCheck } from "lucide-react";

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [updatedPassword, setUpdatedPassword] = useState("");

  // Fetch Users
  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (userData: any) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Yönetici oluşturulamadı.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "Başarılı", description: "Yeni yönetici başarıyla oluşturuldu." });
      setNewUsername("");
      setNewPassword("");
      setShowAddForm(false);
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Şifre güncellenemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "Başarılı", description: "Şifre başarıyla güncellendi." });
      setUpdatedPassword("");
      setSelectedUser(null);
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Yönetici silinemedi.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "Başarılı", description: "Yönetici silindi." });
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ username: newUsername, password: newPassword });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    updateMutation.mutate({
      id: selectedUser.id,
      data: { password: updatedPassword }
    });
  };

  const handleDelete = (id: number, username: string) => {
    if (confirm(`"${username}" isimli yöneticiyi silmek istediğinizden emin misiniz?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-[#A58E6A]" /> Yönetici Kullanıcılar
          </h1>
          <p className="text-gray-500 mt-1">Admin paneline erişimi olan kullanıcı hesaplarını yönetin, şifre sıfırlayın veya yeni yönetici ekleyin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel: Users Table */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-[#A58E6A]/20 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div>
                  <CardTitle className="font-serif text-lg text-[#0D3143]">Kayıtlı Yöneticiler</CardTitle>
                  <CardDescription>Sistemde tanımlı tüm admin hesapları</CardDescription>
                </div>
                {!showAddForm && (
                  <Button onClick={() => setShowAddForm(true)} className="bg-[#0D3143] hover:bg-[#18465C] text-white">
                    <UserPlus className="w-4 h-4 mr-2" /> Yeni Admin Ekle
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-12 text-center text-gray-500 font-serif">Kullanıcılar yükleniyor...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Kullanıcı Adı</TableHead>
                        <TableHead>Kayıt Tarihi</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-semibold text-[#0D3143] flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#A58E6A]" /> {u.username}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">
                            {new Date(u.createdAt).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedUser(u)} className="text-blue-600 hover:text-blue-800">
                              <KeyRound className="w-4 h-4 mr-1" /> Şifre Değiştir
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(u.id, u.username)} className="text-red-600 hover:text-red-800">
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
          </div>

          {/* Right panel: Sidebar Forms */}
          <div className="space-y-6">
            {showAddForm && (
              <Card className="border-[#A58E6A]/20 shadow-md">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="font-serif text-lg text-[#0D3143] flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#A58E6A]" /> Yeni Yönetici Ekle
                  </CardTitle>
                  <CardDescription>Sisteme yeni bir admin yetkisi verin</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="regUsername">Kullanıcı Adı</Label>
                      <Input id="regUsername" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Parola</Label>
                      <Input id="regPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>İptal</Button>
                      <Button type="submit" disabled={createMutation.isPending} className="bg-[#A58E6A] hover:bg-[#E8C895] text-[#0D3143] font-bold">Oluştur</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {selectedUser && (
              <Card className="border-[#A58E6A]/20 shadow-md">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="font-serif text-lg text-[#0D3143] flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-[#A58E6A]" /> Şifre Değiştir
                  </CardTitle>
                  <CardDescription><strong>{selectedUser.username}</strong> hesabının şifresini güncelleyin</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPass">Yeni Şifre</Label>
                      <Input id="newPass" type="password" value={updatedPassword} onChange={e => setUpdatedPassword(e.target.value)} required />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>İptal</Button>
                      <Button type="submit" disabled={updateMutation.isPending} className="bg-[#A58E6A] hover:bg-[#E8C895] text-[#0D3143] font-bold">Güncelle</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
