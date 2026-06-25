import { useQuery } from "@tanstack/react-query";
import { services as staticServices } from "@/data/services";
import { projects as staticProjects } from "@/data/projects";

export function useServices() {
  return useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Hizmetler yüklenemedi");
      const data = await res.json();
      
      // Map database schema back to frontend ServiceItem structure
      return data.map((s: any) => ({
        id: s.id,
        slug: s.slug,
        category: s.category,
        image: s.image,
        title: { tr: s.titleTr, en: s.titleEn },
        shortDesc: { tr: s.descriptionTr, en: s.descriptionEn },
        longDesc: { tr: s.contentTr, en: s.contentEn },
        features: s.features || { tr: JSON.parse(s.featuresTr || "[]"), en: JSON.parse(s.featuresEn || "[]") },
        materials: s.materials || { tr: JSON.parse(s.materialsTr || "[]"), en: JSON.parse(s.materialsEn || "[]") },
        applications: s.applications || { tr: JSON.parse(s.applicationsTr || "[]"), en: JSON.parse(s.applicationsEn || "[]") },
        order: s.order || 0
      }));
    },
    // Fallback data if loading or failed
    initialData: staticServices,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Projeler yüklenemedi");
      const data = await res.json();

      // Map database schema back to frontend Project structure
      return data.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        category: p.category,
        year: p.year,
        location: p.location,
        image: p.image,
        gallery: typeof p.gallery === "string" ? JSON.parse(p.gallery) : p.gallery,
        title: { tr: p.titleTr, en: p.titleEn },
        clientType: { tr: p.clientTypeTr, en: p.clientTypeEn },
        scope: { tr: p.scopeTr, en: p.scopeEn },
        description: { tr: p.descriptionTr, en: p.descriptionEn },
        details: typeof p.details === "string" ? JSON.parse(p.details) : p.details
      }));
    },
    // Fallback data if loading or failed
    initialData: staticProjects,
  });
}
