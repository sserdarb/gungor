import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Trash2, Phone, Mail, User, Clock, CheckCircle2, MessageSquare, AlertCircle, Eye, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Lead {
  id: number;
  sessionId?: string;
  source: "chatbot" | "form";
  type: "quote" | "contact";
  name: string;
  phone: string;
  email: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "completed";
  createdAt: number;
}

export default function AdminLeads() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Fetch Leads
  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: () => fetch("/api/admin/leads").then((res) => res.json()),
  });

  // Status Update Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Durum güncellenemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Başarılı", description: "Talep durumu güncellendi." });
      if (selectedLead) {
        // Update selected lead details dynamically in view
        const updated = leads.find((l) => l.id === selectedLead.id);
        if (updated) {
          setSelectedLead({ ...selectedLead, status: updated.status });
        }
      }
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Talep silinemedi.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Başarılı", description: "Talep kaydı silindi." });
      setSelectedLead(null);
    },
    onError: (err: any) => {
      toast({ title: "Hata", description: err.message, variant: "destructive" });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Bu talebi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50 flex items-center gap-1 w-fit"><AlertCircle className="w-3 h-3" /> Yeni</Badge>;
      case "contacted":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> İletişime Geçildi</Badge>;
      case "completed":
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3" /> Tamamlandı</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50 w-fit">{status}</Badge>;
    }
  };

  const getSourceBadge = (source: string) => {
    if (source === "chatbot") {
      return <Badge className="bg-[#E8C895]/20 text-[#A58E6A] border-[#A58E6A]/30 hover:bg-[#E8C895]/20 flex items-center gap-1 w-fit"><MessageSquare className="w-3 h-3" /> Chatbot</Badge>;
    }
    return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 flex items-center gap-1 w-fit"><ClipboardList className="w-3 h-3" /> Form</Badge>;
  };

  const getTypeLabel = (type: string) => {
    return type === "quote" ? "Teklif Talebi" : "İletişim Talebi";
  };

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchSource = filterSource === "all" || lead.source === filterSource;
    const matchStatus = filterStatus === "all" || lead.status === filterStatus;
    return matchSource && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-[#0D3143] font-bold flex items-center gap-2">
            <ClipboardList className="w-8 h-8 text-[#A58E6A]" /> İletişim ve Teklif Talepleri
          </h1>
          <p className="text-gray-500 mt-1">Gerek web sitesindeki iletişim formundan gerekse yapay zeka chatbot üzerinden gelen tüm müşteri taleplerini buradan yönetin.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#A58E6A]" />
            <span className="text-sm font-semibold text-gray-600">Filtrele:</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filterSource === "all" ? "default" : "outline"}
              onClick={() => setFilterSource("all")}
              className={filterSource === "all" ? "bg-[#0D3143]" : ""}
            >
              Tüm Kaynaklar
            </Button>
            <Button
              size="sm"
              variant={filterSource === "form" ? "default" : "outline"}
              onClick={() => setFilterSource("form")}
              className={filterSource === "form" ? "bg-[#0D3143]" : ""}
            >
              Sadece Formlar
            </Button>
            <Button
              size="sm"
              variant={filterSource === "chatbot" ? "default" : "outline"}
              onClick={() => setFilterSource("chatbot")}
              className={filterSource === "chatbot" ? "bg-[#0D3143]" : ""}
            >
              Sadece Chatbot
            </Button>
          </div>

          <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={filterStatus === "all" ? "bg-[#0D3143]" : ""}
            >
              Tüm Durumlar
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "new" ? "default" : "outline"}
              onClick={() => setFilterStatus("new")}
              className={filterStatus === "new" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
            >
              Yeni
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "contacted" ? "default" : "outline"}
              onClick={() => setFilterStatus("contacted")}
              className={filterStatus === "contacted" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
            >
              İletişime Geçildi
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
              className={filterStatus === "completed" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
            >
              Tamamlandı
            </Button>
          </div>
        </div>

        {/* Leads Table Card */}
        <Card className="border-[#A58E6A]/20 shadow-md">
          <CardHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="font-serif text-lg text-[#0D3143]">Talepler Listesi ({filteredLeads.length})</CardTitle>
                <CardDescription>Müşteriler tarafından gönderilen teklif istekleri ve mesajlar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-gray-500 font-serif">Veriler yükleniyor...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-serif">Seçilen filtrelere uygun talep bulunamadı.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Hizmet</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-semibold text-[#0D3143]">
                        {lead.name}
                      </TableCell>
                      <TableCell>{getSourceBadge(lead.source)}</TableCell>
                      <TableCell className="text-sm font-medium">{getTypeLabel(lead.type)}</TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate">{lead.service || "-"}</TableCell>
                      <TableCell className="space-y-1">
                        <div className="text-xs flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" /> {lead.phone}
                        </div>
                        {lead.email && (
                          <div className="text-xs flex items-center gap-1 text-gray-500">
                            <Mail className="w-3 h-3 text-gray-400" /> {lead.email}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button size="icon" variant="ghost" onClick={() => setSelectedLead(lead)} className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(lead.id)} className="text-red-600 hover:text-red-800">
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

      {/* Details Dialog */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
          <DialogContent className="max-w-2xl bg-white border border-[#A58E6A]/20">
            <DialogHeader className="border-b pb-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <DialogTitle className="font-serif text-xl text-[#0D3143] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#A58E6A]" /> {selectedLead.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {getTypeLabel(selectedLead.type)} ({getSourceBadge(selectedLead.source)})
                  </DialogDescription>
                </div>
                <div className="pr-6">
                  {getStatusBadge(selectedLead.status)}
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-sm">
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-700">İletişim Bilgileri</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-[#A58E6A]" />
                  <a href={`tel:${selectedLead.phone}`} className="hover:underline font-medium">{selectedLead.phone}</a>
                </div>
                {selectedLead.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-[#A58E6A]" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline font-medium">{selectedLead.email}</a>
                  </div>
                )}
              </div>

              <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-700">Talep Detayları</h3>
                <div>
                  <span className="text-gray-500">Tarih: </span>
                  <span className="font-medium text-gray-800">
                    {new Date(selectedLead.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
                {selectedLead.service && (
                  <div>
                    <span className="text-gray-500">Hizmet/Konu: </span>
                    <span className="font-semibold text-[#0D3143]">
                      {selectedLead.service}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 py-2">
              <h3 className="font-semibold text-gray-700 text-sm">Müşteri Mesajı / Talep İçeriği</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </div>
            </div>

            {selectedLead.sessionId && (
              <div className="text-xs text-gray-400 italic">
                Chatbot Oturum ID: {selectedLead.sessionId}
              </div>
            )}

            <DialogFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2 sm:justify-between items-center">
              <div className="flex gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-500 self-center hidden sm:block">Durumu Güncelle:</span>
                <Button
                  size="sm"
                  variant={selectedLead.status === "new" ? "default" : "outline"}
                  onClick={() => handleStatusChange(selectedLead.id, "new")}
                  className={selectedLead.status === "new" ? "bg-red-600 text-white hover:bg-red-700" : "text-red-600 hover:text-red-700"}
                >
                  Yeni Yap
                </Button>
                <Button
                  size="sm"
                  variant={selectedLead.status === "contacted" ? "default" : "outline"}
                  onClick={() => handleStatusChange(selectedLead.id, "contacted")}
                  className={selectedLead.status === "contacted" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-blue-600 hover:text-blue-700"}
                >
                  İletişime Geçildi
                </Button>
                <Button
                  size="sm"
                  variant={selectedLead.status === "completed" ? "default" : "outline"}
                  onClick={() => handleStatusChange(selectedLead.id, "completed")}
                  className={selectedLead.status === "completed" ? "bg-green-600 text-white hover:bg-green-700" : "text-green-600 hover:text-green-700"}
                >
                  Tamamlandı
                </Button>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Button variant="outline" onClick={() => setSelectedLead(null)}>Kapat</Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedLead.id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Sil
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}
