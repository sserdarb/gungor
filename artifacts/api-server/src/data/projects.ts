export interface Project {
  slug: string;
  category: "water" | "floor";
  year: number;
  location: string;
  image: string;
  gallery: string[];
  title: { tr: string; en: string };
  clientType: { tr: string; en: string };
  scope: { tr: string; en: string };
  description: { tr: string; en: string };
  details: { label: { tr: string; en: string }; value: { tr: string; en: string } }[];
}

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export const projects: Project[] = [
  {
    slug: "endustriyel-tesis-epoksi",
    category: "floor",
    year: 2024,
    location: "İzmir, Türkiye",
    image: px(1338526),
    gallery: [px(1338526), px(1553838), px(209251)],
    title: { tr: "Endüstriyel Tesis Epoksi Zemin", en: "Industrial Facility Epoxy Floor" },
    clientType: { tr: "Üretim Tesisi", en: "Manufacturing Facility" },
    scope: { tr: "Epoksi Zemin Kaplama", en: "Epoxy Floor Coating" },
    description: {
      tr: "İzmir'de faaliyet gösteren büyük ölçekli bir üretim tesisinin 3.200 m² üretim alanına çift bileşenli epoksi zemin kaplama sistemi uygulandı. Yüksek kimyasal yük ve sürekli forklift trafiğine dayanacak şekilde tasarlanan sistem, tesisin 10 yıllık zemin sorununun kalıcı çözümü oldu.",
      en: "A two-component epoxy floor coating system was applied to the 3,200 m² production area of a large-scale manufacturing facility operating in İzmir. The system, designed to withstand high chemical loads and continuous forklift traffic, became the permanent solution to the facility's 10-year floor problem.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "3.200 m²", en: "3,200 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "2K Epoksi + Kuvars", en: "2K Epoxy + Quartz" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "12 Gün", en: "12 Days" } },
      { label: { tr: "Kalınlık", en: "Thickness" }, value: { tr: "3 mm", en: "3 mm" } },
    ],
  },
  {
    slug: "ticari-teras-yalitim",
    category: "water",
    year: 2024,
    location: "İzmir, Türkiye",
    image: px(323780),
    gallery: [px(323780), px(1643383), px(5691659)],
    title: { tr: "Ticari Bina Teras Su Yalıtımı", en: "Commercial Building Terrace Waterproofing" },
    clientType: { tr: "Ticari Bina", en: "Commercial Building" },
    scope: { tr: "Teras ve Çatı Su Yalıtımı", en: "Terrace & Roof Waterproofing" },
    description: {
      tr: "İzmir Bayraklı'da bulunan 8 katlı ticari binanın teras katındaki su sızıntısı sorunu, SBS modifiye membran sistemi ile kalıcı olarak çözüme kavuşturuldu. Mevcut kaplamalar kaldırıldıktan sonra tam bir teras yenileme uygulaması gerçekleştirildi.",
      en: "The water leakage problem on the terrace floor of an 8-story commercial building in İzmir Bayraklı was permanently resolved with an SBS modified membrane system. After removing existing coatings, a complete terrace renovation was carried out.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "850 m²", en: "850 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "SBS Membran + XPS", en: "SBS Membrane + XPS" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "8 Gün", en: "8 Days" } },
      { label: { tr: "Garanti", en: "Warranty" }, value: { tr: "10 Yıl", en: "10 Years" } },
    ],
  },
  {
    slug: "avm-otopark-poliuretan",
    category: "floor",
    year: 2024,
    location: "İzmir, Türkiye",
    image: px(1004409),
    gallery: [px(1004409), px(1553838), px(1338526)],
    title: { tr: "AVM Otopark Poliüretan Zemin", en: "Shopping Mall Parking Polyurethane Floor" },
    clientType: { tr: "Alışveriş Merkezi", en: "Shopping Mall" },
    scope: { tr: "Otopark Zemin Kaplama & Çizgi", en: "Parking Floor Coating & Marking" },
    description: {
      tr: "3 katlı ve yaklaşık 5.000 araç kapasiteli AVM otoparkına poliüretan esaslı zemin kaplama ve tam yönlendirme çizgi sistemi uygulandı. Araç trafiği ve kimyasal etkilere karşı dayanıklı sistem, bölüm renk kodlaması ile birlikte uygulandı.",
      en: "A polyurethane-based floor coating and complete directional marking system was applied to the 3-story shopping mall parking lot with a capacity of approximately 5,000 vehicles. The system, resistant to vehicle traffic and chemical effects, was applied together with section color coding.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "12.400 m²", en: "12,400 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "PU Zemin + Çizgi", en: "PU Floor + Marking" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "21 Gün", en: "21 Days" } },
      { label: { tr: "Kat Sayısı", en: "Floor Count" }, value: { tr: "3 Kat", en: "3 Floors" } },
    ],
  },
  {
    slug: "gida-tesisi-kaymaz",
    category: "floor",
    year: 2024,
    location: "Manisa, Türkiye",
    image: px(3584924),
    gallery: [px(3584924), px(1553838), px(1338526)],
    title: { tr: "Gıda Tesisi Kaymaz Epoksi", en: "Food Facility Anti-Slip Epoxy" },
    clientType: { tr: "Gıda Üretim Tesisi", en: "Food Production Facility" },
    scope: { tr: "Poliüretan Zemin Kaplama", en: "Polyurethane Floor Coating" },
    description: {
      tr: "Manisa'daki gıda işleme tesisinin üretim alanında gıda güvenli poliüretan zemin kaplama sistemi uygulandı. NSF onaylı malzemeler kullanılarak hem HACCP uyumluluğu sağlandı hem de yüksek kaymaz yüzey elde edildi.",
      en: "A food-safe polyurethane floor coating system was applied to the production area of a food processing facility in Manisa. Using NSF-approved materials, both HACCP compliance was ensured and a highly anti-slip surface was achieved.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "1.800 m²", en: "1,800 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "PU Gıda Güvenli", en: "PU Food Safe" } },
      { label: { tr: "Sertifika", en: "Certificate" }, value: { tr: "NSF / HACCP", en: "NSF / HACCP" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "9 Gün", en: "9 Days" } },
    ],
  },
  {
    slug: "havuz-tank-yalitim-projesi",
    category: "water",
    year: 2024,
    location: "İzmir, Türkiye",
    image: px(261106),
    gallery: [px(261106), px(1553836), px(1454806)],
    title: { tr: "Havuz & Tank Su Yalıtımı", en: "Pool & Tank Waterproofing" },
    clientType: { tr: "Konut Projesi", en: "Residential Project" },
    scope: { tr: "Havuz ve Tank Su Yalıtımı", en: "Pool & Tank Waterproofing" },
    description: {
      tr: "İzmir'in kuzey yakasındaki konut projesi kapsamında 3 ayrı yüzme havuzu ve 2 adet yangın suyu deposuna kristalize ve elastomerik membran bazlı su yalıtım sistemi uygulandı. Uygulama sonrası dolum testleri başarıyla tamamlandı.",
      en: "As part of a residential project on the north side of İzmir, crystalline and elastomeric membrane-based waterproofing system was applied to 3 separate swimming pools and 2 fire water tanks. Post-application filling tests were successfully completed.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "920 m²", en: "920 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "Kristalize + Elastomerik", en: "Crystalline + Elastomeric" } },
      { label: { tr: "Havuz Sayısı", en: "Pool Count" }, value: { tr: "3 Havuz", en: "3 Pools" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "14 Gün", en: "14 Days" } },
    ],
  },
  {
    slug: "ofis-zemin-renovasyon",
    category: "floor",
    year: 2024,
    location: "İzmir, Türkiye",
    image: px(1571458),
    gallery: [px(1571458), px(1571460), px(209251)],
    title: { tr: "Kurumsal Ofis Zemin Renovasyonu", en: "Corporate Office Floor Renovation" },
    clientType: { tr: "Kurumsal Ofis", en: "Corporate Office" },
    scope: { tr: "Dekoratif Epoksi Zemin", en: "Decorative Epoxy Floor" },
    description: {
      tr: "İzmir'in Folkart Towers ofis kulesinde 4 katlı kurumsal ofis alanının zemin renovasyonunda metalik efektli dekoratif epoksi kaplama sistemi uygulandı. Her katta farklı renk tonlamasıyla katların kimliği oluşturuldu.",
      en: "A metallic effect decorative epoxy coating system was applied in the floor renovation of the 4-floor corporate office area in İzmir's Folkart Towers office tower. Each floor was given its own identity with different color tones.",
    },
    details: [
      { label: { tr: "Alan", en: "Area" }, value: { tr: "2.100 m²", en: "2,100 m²" } },
      { label: { tr: "Sistem", en: "System" }, value: { tr: "Metalik Epoksi", en: "Metallic Epoxy" } },
      { label: { tr: "Kat Sayısı", en: "Floor Count" }, value: { tr: "4 Kat", en: "4 Floors" } },
      { label: { tr: "Süre", en: "Duration" }, value: { tr: "16 Gün", en: "16 Days" } },
    ],
  },
];
