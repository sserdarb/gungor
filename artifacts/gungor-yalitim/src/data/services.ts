export type ServiceCategory = "water" | "floor";

export interface ServiceItem {
  slug: string;
  category: ServiceCategory;
  image: string;
  title: { tr: string; en: string };
  shortDesc: { tr: string; en: string };
  longDesc: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  materials: { tr: string[]; en: string[] };
  applications: { tr: string[]; en: string[] };
}

/* ─── Pexels CDN: format = https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1200 ─── */
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export const services: ServiceItem[] = [
  /* ═══════════════ SU YALITIMI ═══════════════ */
  {
    slug: "temel-bohcalama",
    category: "water",
    image: px(2219600),
    title: { tr: "Temel Bohçalama Su Yalıtımı", en: "Foundation Waterproofing" },
    shortDesc: {
      tr: "Binanın temel kısmını çevreleyen kapsamlı membran ve kristalize sistemler ile kalıcı su yalıtımı.",
      en: "Permanent waterproofing of building foundations using comprehensive membrane and crystalline systems.",
    },
    longDesc: {
      tr: "Temel bohçalama, binanın toprak ile temas eden tüm yüzeylerini bitümlü, polimerik veya kristalize membranlarla eksiksiz şekilde sararak yere altı sularından kaynaklanan nem ve sızıntıları kalıcı olarak önleme yöntemidir. Uygulamadan önce yüzey hazırlığı (kurutma, zımparalama, astar) büyük önem taşır. Doğru uygulandığında 25+ yıl ömür sunar.",
      en: "Foundation wrapping waterproofing is the method of completely wrapping all surfaces in contact with the soil using bituminous, polymeric, or crystalline membranes to permanently prevent moisture and leaks from groundwater. Surface preparation (drying, grinding, primer) is critical before application. When correctly applied, it offers 25+ years of service life.",
    },
    features: {
      tr: ["Çift katlı membran uygulama", "Köşe ve detay geçişleri özel bantla", "Astar uygulaması dahil", "25+ yıl garantili ömür", "Zemin suyuna tam direnç"],
      en: ["Dual-layer membrane application", "Corner and detail transitions with special tape", "Primer included", "25+ year guaranteed lifespan", "Full resistance to groundwater"],
    },
    materials: {
      tr: ["SBS modifiye bitümlü membran", "APP modifiye membran", "Kristalize su yalıtım malzemeleri", "Polimerik astar", "Köşe takviye bantları"],
      en: ["SBS modified bituminous membrane", "APP modified membrane", "Crystalline waterproofing materials", "Polymeric primer", "Corner reinforcement tapes"],
    },
    applications: {
      tr: ["Bodrum katı temelleri", "Yeraltı otopark yapıları", "Konut binaları temeli", "Ticari ve endüstriyel yapılar", "Metro ve tünel yapıları"],
      en: ["Basement foundations", "Underground parking structures", "Residential building foundations", "Commercial and industrial buildings", "Metro and tunnel structures"],
    },
  },

  {
    slug: "perde-doseme-yalitim",
    category: "water",
    image: px(1481958),
    title: { tr: "Perde ve Döşeme Su Yalıtımı", en: "Wall & Slab Waterproofing" },
    shortDesc: {
      tr: "Bodrum katı perde duvarları ve zemin döşemelerine yönelik çift katlı yüksek performanslı yalıtım uygulaması.",
      en: "High-performance dual-layer waterproofing for basement retaining walls and floor slabs.",
    },
    longDesc: {
      tr: "Bodrum ve yarı bodrum katı perde duvarlarında ve beton döşemelerinde su tutma ve nem önleme amacıyla uygulanan kapsamlı su yalıtımı sistemidir. Yeraltı su baskısına karşı esnek, yüksek yapışma özellikli membranlar tercih edilir.",
      en: "A comprehensive waterproofing system applied to basement retaining walls and concrete slabs to prevent water retention and moisture. Flexible, high-adhesion membranes resistant to hydrostatic pressure are preferred.",
    },
    features: {
      tr: ["Hidrostatik basınca dayanım", "Esnek yapı hareketi toleransı", "Yüksek yapışma gücü", "Sürekli derzsiz yüzey", "UV ve kimyasal direnç"],
      en: ["Resistance to hydrostatic pressure", "Flexible structural movement tolerance", "High adhesion strength", "Continuous seamless surface", "UV and chemical resistance"],
    },
    materials: {
      tr: ["Polimerik su yalıtım membranı", "Bitümlü membran", "Çift taraflı yapışkanlı bant", "Mineral dolgu astar", "Mineral takviye kumaş"],
      en: ["Polymeric waterproofing membrane", "Bituminous membrane", "Double-sided adhesive tape", "Mineral fill primer", "Mineral reinforcement fabric"],
    },
    applications: {
      tr: ["Bodrum kat perde duvarları", "Zemin döşemeleri", "Su deposu duvar ve tabanı", "Yeraltı geçişleri", "Sığınak yapıları"],
      en: ["Basement retaining walls", "Floor slabs", "Water tank walls and bases", "Underground passages", "Shelter structures"],
    },
  },

  {
    slug: "teras-cati-yalitim",
    category: "water",
    image: px(323780),
    title: { tr: "Teras ve Çatı Su Yalıtımı", en: "Terrace & Roof Waterproofing" },
    shortDesc: {
      tr: "Düz çatı ve teras alanlarının PVC, TPO veya bitümlü membran sistemleriyle uzun ömürlü yalıtımı.",
      en: "Long-lasting waterproofing of flat roofs and terraces with PVC, TPO or bituminous membrane systems.",
    },
    longDesc: {
      tr: "Teras ve düz çatı alanlarındaki su yalıtımı, binanın en kritik noktalardaki koruma katmanıdır. Yağmur suyu birikintisi, UV ışınları ve termal şoklara dayanıklı özel membranlarla hem işlevsel hem estetik yüzeyler elde edilir. Tahliye sistemi planlaması ile entegre çözümler sunulmaktadır.",
      en: "Waterproofing of terraces and flat roofs is the protective layer at the most critical points of a building. Functional and aesthetic surfaces are achieved with special membranes resistant to rainwater accumulation, UV rays, and thermal shocks. Integrated solutions are provided with drainage system planning.",
    },
    features: {
      tr: ["UV dayanımlı membran", "Termal hareket toleransı", "Tahliye sistemi entegrasyonu", "Çatı bahçesi uyumlu", "Üzerine seramik veya ahşap döşeme imkanı"],
      en: ["UV-resistant membrane", "Thermal movement tolerance", "Drainage system integration", "Compatible with roof gardens", "Option to tile ceramic or wood over"],
    },
    materials: {
      tr: ["PVC membran", "TPO membran", "SBS modifiye membran", "XPS ısı yalıtımı", "Geotekstil filtre kumaşı"],
      en: ["PVC membrane", "TPO membrane", "SBS modified membrane", "XPS thermal insulation", "Geotextile filter fabric"],
    },
    applications: {
      tr: ["Konut çatıları", "AVM ve ticari binalar", "Endüstriyel yapı çatıları", "Teras balkonlar", "Çatı bahçeleri"],
      en: ["Residential roofs", "Shopping centers and commercial buildings", "Industrial building roofs", "Terrace balconies", "Roof gardens"],
    },
  },

  {
    slug: "havuz-tank-yalitim",
    category: "water",
    image: px(261106),
    title: { tr: "Havuz ve Tank Su Yalıtımı", en: "Pool & Tank Waterproofing" },
    shortDesc: {
      tr: "Su altında kalan yapılar için kristalize ve elastomerik membran bazlı su geçirimsiz kaplama çözümleri.",
      en: "Waterproof coating solutions based on crystalline and elastomeric membranes for submerged structures.",
    },
    longDesc: {
      tr: "Havuz ve depo tanklarında sürekli su baskısı, kimyasal madde teması ve bakteri üremesine karşı özel formülasyonlar uygulanır. Derzsiz ve hijyenik yüzey oluşturan kristalize veya esnek kaplama sistemleri uzun ömürlü koruma sağlar. Uygulama sonrası dolum testi protokolleri eksiksiz uygulanır.",
      en: "Special formulations are applied in pools and storage tanks against continuous water pressure, chemical contact, and bacterial growth. Crystalline or flexible coating systems that create a seamless and hygienic surface provide long-lasting protection. Post-application filling test protocols are fully implemented.",
    },
    features: {
      tr: ["Sürekli su baskısına tam direnç", "Kimyasal ve klorin dayanımı", "Derzsiz, hijyenik yüzey", "NSF sertifikalı gıda güvenli malzeme", "Uzun dönem dolum testi dahil"],
      en: ["Full resistance to continuous water pressure", "Chemical and chlorine resistance", "Seamless, hygienic surface", "NSF-certified food-safe material", "Long-term filling test included"],
    },
    materials: {
      tr: ["Çift bileşenli su yalıtım harcı", "Kristalize kaplama", "Elastomerik membran", "Epoksi kaplama", "Dolgu ve tamir harcı"],
      en: ["Two-component waterproofing mortar", "Crystalline coating", "Elastomeric membrane", "Epoxy coating", "Filler and repair mortar"],
    },
    applications: {
      tr: ["Yüzme havuzları", "Su depoları ve sarnıçlar", "Arıtma tesisleri", "Yangın suyu tankları", "Endüstriyel kimyasal tanklar"],
      en: ["Swimming pools", "Water tanks and cisterns", "Treatment plants", "Fire water tanks", "Industrial chemical tanks"],
    },
  },

  {
    slug: "islak-hacim-yalitim",
    category: "water",
    image: px(1454806),
    title: { tr: "Islak Hacimler Su Yalıtımı", en: "Wet Area Waterproofing" },
    shortDesc: {
      tr: "Banyo, mutfak, tesisat şaftı gibi ıslak hacimlerin neme ve suya karşı esnek membranlarla korunması.",
      en: "Protection of wet areas such as bathrooms, kitchens, and pipe shafts from moisture and water using flexible membranes.",
    },
    longDesc: {
      tr: "Islak hacimler; banyolar, mutfaklar, çamaşır odaları ve tesisat şaftlarında nem sızıntısı, küf ve yapısal hasara karşı esnek membran uygulamaları ile korunur. Fayans altına uygulanan ince, elastik membranlar hem kullanım esnasındaki tüm hareketi karşılar hem de yoğun nem ortamında hiçbir şekilde çözünmez.",
      en: "Wet areas such as bathrooms, kitchens, laundry rooms, and pipe shafts are protected against moisture leakage, mold, and structural damage using flexible membrane applications. Thin, elastic membranes applied under tiles accommodate all movement during use and never dissolve in high-humidity environments.",
    },
    features: {
      tr: ["Fayans altına ince uygulama", "Elastik yapı – çatlakları kapsar", "Hızlı kuruma süresi", "Köşe ve boru bağlantısı dahil", "Uzun dönem nem direnci"],
      en: ["Thin application under tiles", "Elastic structure – bridges cracks", "Fast curing time", "Corner and pipe connection included", "Long-term moisture resistance"],
    },
    materials: {
      tr: ["Tek bileşenli elastik membran", "Çift bileşenli esnek membran", "Köşe bant ve manşet", "Boru geçiş manşeti", "Astar"],
      en: ["Single-component elastic membrane", "Two-component flexible membrane", "Corner tape and sleeve", "Pipe penetration sleeve", "Primer"],
    },
    applications: {
      tr: ["Banyo ve WC", "Mutfak tezgah altı", "Çamaşır makinesi nişi", "Otel ve hastane banyoları", "Spor tesisi duşları"],
      en: ["Bathrooms and WCs", "Under kitchen counters", "Washing machine niche", "Hotel and hospital bathrooms", "Sports facility showers"],
    },
  },

  {
    slug: "enjeksiyon",
    category: "water",
    image: px(277559),
    title: { tr: "Enjeksiyon İşleri", en: "Injection Works" },
    shortDesc: {
      tr: "Mevcut yapılarda aktif su kaçaklarının basınçlı poliüretan veya akrilik enjeksiyon ile yerinde giderilmesi.",
      en: "On-site elimination of active water leaks in existing structures using pressure polyurethane or acrylic injection.",
    },
    longDesc: {
      tr: "Enjeksiyon yöntemi, mevcut yapılardaki aktif su sızıntısını yapıyı sökmeden yerinde onarmanın en hızlı ve etkili yoludur. Basınçlı enjeksiyon pompasıyla çatlak ve boşluklara poliüretan veya akrilik reçine pompalanır; malzeme su ile temas edince genişleyerek yolu tıkar ve kalıcı sızıntı önleme sağlanır.",
      en: "Injection is the fastest and most effective way to repair active water seepage in existing structures without demolition. Using a pressure injection pump, polyurethane or acrylic resin is pumped into cracks and voids; the material expands upon contact with water, blocking the path and providing permanent leak prevention.",
    },
    features: {
      tr: ["Yapıyı sökmeden yerinde onarım", "Aktif sızdırma anında durdurulur", "Çatlak dolgu ve yol kesilme", "Yüksek basınç uygulama kapasitesi", "Hızlı müdahale imkanı"],
      en: ["On-site repair without demolition", "Active seepage stopped immediately", "Crack filling and path sealing", "High-pressure application capacity", "Fast response capability"],
    },
    materials: {
      tr: ["Tek bileşenli PU enjeksiyon reçinesi", "Çift bileşenli PU enjeksiyon", "Akrilik jel enjeksiyon", "Epoksi enjeksiyon", "Basınç pakerler"],
      en: ["Single-component PU injection resin", "Two-component PU injection", "Acrylic gel injection", "Epoxy injection", "Pressure packers"],
    },
    applications: {
      tr: ["Bodrum duvarı su kaçakları", "Tünel ve köprü onarımı", "Boru geçiş sızıntıları", "Dilatasyon derzi sızıntısı", "Beton çatlak onarımı"],
      en: ["Basement wall water leaks", "Tunnel and bridge repair", "Pipe penetration leaks", "Expansion joint leakage", "Concrete crack repair"],
    },
  },

  {
    slug: "dilatasyon-yalitim",
    category: "water",
    image: px(534151),
    title: { tr: "Dilatasyon Su Yalıtımı", en: "Expansion Joint Waterproofing" },
    shortDesc: {
      tr: "Yapı bünyesindeki dilatasyon ve hareket derzlerinin özel profil ve yalıtım bantlarıyla kalıcı yalıtımı.",
      en: "Permanent waterproofing of structural expansion and movement joints with special profiles and sealing tapes.",
    },
    longDesc: {
      tr: "Dilatasyon derzi su yalıtımı, yapısal hareketlere bağlı oluşan sızıntıların önlenmesinde kritik bir uygulama alanıdır. Hareket toleransı yüksek, özel profil ve bantlar kullanılarak hem su geçirimsizliği hem de yapısal hareket serbestisi sağlanır.",
      en: "Expansion joint waterproofing is a critical application area for preventing leaks caused by structural movements. High movement-tolerance special profiles and tapes are used to achieve both water impermeability and structural movement freedom.",
    },
    features: {
      tr: ["Hareket toleransı yüksek sistem", "Su basıncına tam direnç", "Prefabrik köşe ve T parçaları", "Uzun dönem elastiklik", "UV ve kimyasal dayanım"],
      en: ["High movement tolerance system", "Full resistance to water pressure", "Prefabricated corner and T-pieces", "Long-term elasticity", "UV and chemical resistance"],
    },
    materials: {
      tr: ["Swellable waterstop", "PVC waterstop profil", "Enjekte edilebilir hortum", "EPDM köprüleme bandı", "Epoksi dolgu harcı"],
      en: ["Swellable waterstop", "PVC waterstop profile", "Injectable hose", "EPDM bridging tape", "Epoxy filler mortar"],
    },
    applications: {
      tr: ["Yapı dilatasyon derzi", "Perde–döşeme birleşim yerleri", "Tünel derz geçişleri", "Otopark dilatasyon hatları", "Köprü dilatasyon derzi"],
      en: ["Structural expansion joints", "Wall–slab junctions", "Tunnel joint transitions", "Parking expansion lines", "Bridge expansion joints"],
    },
  },

  {
    slug: "yesil-cati",
    category: "water",
    image: px(1400375),
    title: { tr: "Yeşil Çatı Sistemleri", en: "Green Roof Systems" },
    shortDesc: {
      tr: "Bitki örtüsü taşıyan çatı katmanlarının drene edici ve köklere dirençli su yalıtım sistemiyle korunması.",
      en: "Protection of vegetation-bearing roof layers with draining and root-resistant waterproofing systems.",
    },
    longDesc: {
      tr: "Yeşil çatı sistemleri, ekstra kök geçirme dirençli (FLL sertifikalı) membranlar, drene edici levhalar ve filtre geotekstillerden oluşan katmanlı bir sistem ile bitkisel çatı bahçelerinin altındaki yapıyı kalıcı olarak korur. Sürdürülebilir yapı sertifikalarına (LEED, BREEAM) katkı sağlar.",
      en: "Green roof systems permanently protect the structure beneath planted roof gardens with a layered system of extra root-penetration resistant (FLL-certified) membranes, drainage boards, and filter geotextiles. They contribute to sustainable building certifications (LEED, BREEAM).",
    },
    features: {
      tr: ["FLL sertifikalı kök direnci", "Entegre drenaj katmanı", "Düşük ağırlıklı hafif çözümler", "LEED & BREEAM uyumlu", "Uzun dönem performans garantisi"],
      en: ["FLL-certified root resistance", "Integrated drainage layer", "Lightweight low-weight solutions", "LEED & BREEAM compliant", "Long-term performance guarantee"],
    },
    materials: {
      tr: ["Kök geçirme dirençli FLL membran", "Drenaj levhası", "Filtre geotekstil", "Uygun dolgu materyali", "Kenar profilleri"],
      en: ["Root-penetration resistant FLL membrane", "Drainage board", "Filter geotextile", "Appropriate growing medium", "Edge profiles"],
    },
    applications: {
      tr: ["Çatı bahçeleri", "Yeşil çatı parkları", "Sürdürülebilir konut projeleri", "LEED sertifikalı binalar", "Teras üzeri peyzaj"],
      en: ["Roof gardens", "Green roof parks", "Sustainable housing projects", "LEED-certified buildings", "Terrace landscaping"],
    },
  },

  {
    slug: "negatif-yalitim",
    category: "water",
    image: px(1553836),
    title: { tr: "Negatif Su Yalıtımı", en: "Negative-Side Waterproofing" },
    shortDesc: {
      tr: "Su baskısı altındaki yüzeylerde iç mekândan uygulanan kristalize bazlı baskı altı yalıtım sistemi.",
      en: "Crystalline pressure-side waterproofing system applied from the interior on surfaces under water pressure.",
    },
    longDesc: {
      tr: "Negatif yönlü su yalıtımı; kazı ve dış cephe yalıtımının mümkün olmadığı mevcut yapılarda, bodrum kat içinden yüzeylere uygulanan kristalize veya mineral tabanlı malzemeler ile gerçekleştirilir. Malzeme su ile reaksiyona girerek beton içinde kristal oluşturur ve geçirgenliği kalıcı olarak kapatır.",
      en: "Negative-side waterproofing is performed in existing structures where excavation and external waterproofing are not possible, using crystalline or mineral-based materials applied to surfaces from inside the basement. The material reacts with water to form crystals within the concrete, permanently sealing porosity.",
    },
    features: {
      tr: ["Dış kazı gerektirmez", "Kristal büyüme mekanizması", "Yıllar içinde kendi kendine iyileşir", "Nefes alabilir yüzey", "Yüksek su baskısına direnç"],
      en: ["No external excavation required", "Crystal growth mechanism", "Self-healing over years", "Breathable surface", "Resistance to high water pressure"],
    },
    materials: {
      tr: ["Kristalize su yalıtım harcı", "Sızdırmazlık pençeleri", "Mineral astar", "Epoksi enjeksiyon", "Su durdurucu harç"],
      en: ["Crystalline waterproofing mortar", "Hydraulic cement plugs", "Mineral primer", "Epoxy injection", "Hydraulic stop mortar"],
    },
    applications: {
      tr: ["Mevcut bodrum katları", "Tarihi yapı onarımı", "Tünel iç yüzeyi", "Yeralti su deposu", "Sığınak iç yüzeyleri"],
      en: ["Existing basements", "Historic building restoration", "Tunnel inner surfaces", "Underground water tanks", "Shelter interior surfaces"],
    },
  },

  /* ═══════════════ ENDÜSTRİYEL ZEMİN ═══════════════ */
  {
    slug: "epoksi-zemin",
    category: "floor",
    image: px(1338526),
    title: { tr: "Epoksi Zemin Kaplama", en: "Epoxy Floor Coating" },
    shortDesc: {
      tr: "Yüksek kimyasal ve mekanik dirence sahip epoksi reçine bazlı zemin kaplamaları; fabrika, depo ve gıda tesisleri için ideal.",
      en: "Epoxy resin-based floor coatings with high chemical and mechanical resistance; ideal for factories, warehouses, and food facilities.",
    },
    longDesc: {
      tr: "Epoksi zemin kaplama, iki bileşenli epoksi reçine sisteminin beton zemin üzerine birden fazla kat halinde uygulanmasıyla elde edilen yüksek performanslı bir yüzey koruma sistemidir. Kimyasal maddeler, yağ ve darbelere karşı mükemmel direnç gösterir. Tozumaz, parlak ve kolay temizlenebilir yüzeyler oluşturur.",
      en: "Epoxy floor coating is a high-performance surface protection system achieved by applying two-component epoxy resin systems in multiple layers on concrete floors. It exhibits excellent resistance to chemicals, oils, and impacts. It creates dust-free, glossy, and easily cleanable surfaces.",
    },
    features: {
      tr: ["Yüksek kimyasal direnç", "Mekanik darbe dayanımı", "Tozumaz, parlak yüzey", "Kaymaz yüzey seçeneği", "Geniş renk seçeneği"],
      en: ["High chemical resistance", "Mechanical impact resistance", "Dust-free, glossy surface", "Anti-slip surface option", "Wide color selection"],
    },
    materials: {
      tr: ["Çift bileşenli epoksi reçine", "Kuvars kum dolgu", "Epoksi astar", "Epoksi son kat", "Poliüretan son kat seçeneği"],
      en: ["Two-component epoxy resin", "Quartz sand filler", "Epoxy primer", "Epoxy topcoat", "Polyurethane topcoat option"],
    },
    applications: {
      tr: ["Fabrika üretim alanları", "Gıda işleme tesisleri", "Depo ve lojistik alanları", "Hastane koridorları", "Otomotiv servisi"],
      en: ["Factory production areas", "Food processing facilities", "Warehouse and logistics areas", "Hospital corridors", "Automotive service centers"],
    },
  },

  {
    slug: "poliuretan-zemin",
    category: "floor",
    image: px(3584924),
    title: { tr: "Poliüretan Zemin Kaplama", en: "Polyurethane Floor Coating" },
    shortDesc: {
      tr: "Elastik yapısı sayesinde termal şok ve darbelere karşı dirençli poliüretan esaslı zemin sistemleri.",
      en: "Polyurethane-based floor systems resistant to thermal shock and impacts thanks to their elastic structure.",
    },
    longDesc: {
      tr: "Poliüretan zemin kaplamalar, epoksiye kıyasla daha yüksek esnekliğe sahip olup termal şoklara, kimyasal etkilere ve ağır trafik yüküne dayanabilir. Gıda tesislerinde özellikle tercih edilen bu sistem, -20°C ile +80°C arası çalışma ortamlarına uygundur.",
      en: "Polyurethane floor coatings have higher flexibility compared to epoxy and can withstand thermal shocks, chemical effects, and heavy traffic loads. This system, particularly preferred in food facilities, is suitable for working environments between -20°C and +80°C.",
    },
    features: {
      tr: ["Termal şoka tam direnç", "Yüksek esneklik", "Gıda güvenli formülasyon", "Kaymaz yüzey", "Kolay temizlik"],
      en: ["Full resistance to thermal shock", "High flexibility", "Food-safe formulation", "Anti-slip surface", "Easy cleaning"],
    },
    materials: {
      tr: ["Çift bileşenli PU zemin reçinesi", "PU astar", "Kuvars dolgu", "PU son kat", "Kaymaz agrega"],
      en: ["Two-component PU floor resin", "PU primer", "Quartz filler", "PU topcoat", "Anti-slip aggregate"],
    },
    applications: {
      tr: ["Soğuk hava depoları", "Gıda üretim tesisleri", "İçecek fabrikaları", "Kesimhane ve et işleme", "Endüstriyel mutfaklar"],
      en: ["Cold storage warehouses", "Food production facilities", "Beverage factories", "Slaughterhouses and meat processing", "Industrial kitchens"],
    },
  },

  {
    slug: "cimento-esasli-zemin",
    category: "floor",
    image: px(1553838),
    title: { tr: "Çimento Esaslı Zemin Kaplama", en: "Cementitious Floor Coating" },
    shortDesc: {
      tr: "Yüksek trafikli endüstriyel alanlara uygun, çimento bazlı aşınma direnci yüksek zemin kaplamaları.",
      en: "Cement-based floor coatings with high abrasion resistance suitable for high-traffic industrial areas.",
    },
    longDesc: {
      tr: "Çimento esaslı zemin kaplamaları, özellikle gıda tesisleri ve kimyasal etki altındaki endüstriyel alanlarda, düşük kalınlıkta uygulanabilen ve su geçirimsizlik sağlayan işlevsel zemin sistemidir. 6–9 mm kalınlıkta uygulanır, yüksek aşınma direnci sunar.",
      en: "Cementitious floor coatings are functional floor systems that can be applied in thin layers and provide water impermeability, especially in food facilities and industrial areas under chemical influence. Applied at 6–9 mm thickness, they offer high abrasion resistance.",
    },
    features: {
      tr: ["Yüksek aşınma direnci", "Kimyasal dayanım", "Derzsiz uygulama", "Antibakteriyel seçenek", "Hızlı servis süresi"],
      en: ["High abrasion resistance", "Chemical resistance", "Seamless application", "Antibacterial option", "Fast service time"],
    },
    materials: {
      tr: ["Çimento esaslı aşınma katmanı", "Kuvars dolgu", "Astar", "Polipropilen fiber", "Son kat koruma"],
      en: ["Cementitious wearing course", "Quartz filler", "Primer", "Polypropylene fiber", "Topcoat protection"],
    },
    applications: {
      tr: ["Gıda ve içecek fabrikaları", "İlaç tesisleri", "Hastane zeminleri", "Boya ve kimya fabrikaları", "Büyük lojistik merkezler"],
      en: ["Food and beverage factories", "Pharmaceutical facilities", "Hospital floors", "Paint and chemical factories", "Large logistics centers"],
    },
  },

  {
    slug: "self-leveling-sap",
    category: "floor",
    image: px(1283219),
    title: { tr: "Self Leveling Şap", en: "Self-Leveling Screed" },
    shortDesc: {
      tr: "Kendiliğinden yayılan, pürüzsüz ve yüksek mukavemetli zemin tesviye şapı; kaplama öncesi mükemmel zemin tabanı.",
      en: "Self-spreading, smooth and high-strength floor leveling screed; the perfect base before applying floor coverings.",
    },
    longDesc: {
      tr: "Self leveling şap, özel su ve katkı maddesi ilave edilerek hazırlanan ve zemin üzerine döküldüğünde yer çekimi etkisiyle kendi kendine yayılarak mükemmel düz yüzey oluşturan çimento bazlı bir zemin tesviye sistemidir. Kaplama öncesi ideal alt zemin hazırlar.",
      en: "Self-leveling screed is a cement-based floor leveling system that, when poured onto the floor, spreads by gravity to create a perfectly flat surface. It prepares the ideal subfloor before covering.",
    },
    features: {
      tr: ["Kendiliğinden yayılma özelliği", "3–30 mm arasında uygulama", "Hızlı kuruma süresi", "Yüksek basınç dayanımı", "Esnek kaplama sistemlerine uygun"],
      en: ["Self-spreading property", "Application between 3–30 mm", "Fast curing time", "High compressive strength", "Compatible with flexible covering systems"],
    },
    materials: {
      tr: ["Çimento bazlı self leveling şap", "Astar (primer)", "Köpük macun (genleşme bandı)", "Katkı malzemeleri"],
      en: ["Cement-based self-leveling screed", "Primer", "Foam sealant (expansion tape)", "Additives"],
    },
    applications: {
      tr: ["Yerden ısıtma sistemi üzeri", "Ahşap döşeme altı", "LVT/PVC zemin altı", "Halı altı", "Seramik kaplama altı"],
      en: ["Underfloor heating systems", "Under wooden flooring", "Under LVT/PVC flooring", "Under carpet", "Under ceramic tiles"],
    },
  },

  {
    slug: "dekoratif-zemin",
    category: "floor",
    image: px(1571458),
    title: { tr: "Dekoratif Zemin Kaplama", en: "Decorative Floor Coating" },
    shortDesc: {
      tr: "Metalik efekt, quartz ve renk pigmentli dekoratif epoksi sistemler ile estetik ve fonksiyonel zemin çözümleri.",
      en: "Aesthetic and functional floor solutions with metallic effect, quartz, and color-pigmented decorative epoxy systems.",
    },
    longDesc: {
      tr: "Dekoratif epoksi zemin kaplamalar; metalik efektli, quartz yüklü veya renkli pigmentli sistemler halinde mekanlara benzersiz estetik katarken fonksiyonel korumayı da eksiksiz sağlar. Ofis, showroom, mağaza ve konut projelerinde sıkça tercih edilir.",
      en: "Decorative epoxy floor coatings add unique aesthetics to spaces through metallic effect, quartz-loaded, or color-pigmented systems while providing complete functional protection. They are frequently preferred in office, showroom, retail, and residential projects.",
    },
    features: {
      tr: ["Metalik 3D görünüm efekti", "Sonsuz renk seçeneği", "Derzsiz seamless yüzey", "UV dayanımlı son kat", "Kolay temizleme"],
      en: ["Metallic 3D visual effect", "Endless color options", "Seamless surface", "UV-resistant topcoat", "Easy cleaning"],
    },
    materials: {
      tr: ["Metalik pigment", "Epoksi base kat", "Renkli kuvars", "UV dayanımlı poliüretan son kat", "Astar"],
      en: ["Metallic pigment", "Epoxy base coat", "Colored quartz", "UV-resistant polyurethane topcoat", "Primer"],
    },
    applications: {
      tr: ["Showroom ve mağazalar", "Ofis ve çalışma alanları", "Konut yaşam alanları", "Restoran ve kafeler", "Müze ve galerileri"],
      en: ["Showrooms and retail", "Offices and workspaces", "Residential living areas", "Restaurants and cafes", "Museums and galleries"],
    },
  },

  {
    slug: "mikro-beton",
    category: "floor",
    image: px(1571460),
    title: { tr: "Mikro Beton Uygulamaları", en: "Micro Concrete Applications" },
    shortDesc: {
      tr: "2–3 mm ince katman teknolojisiyle uygulanan endüstriyel görünümlü mikro beton; mevcut zemine doğrudan uygulanır.",
      en: "Industrial-looking micro concrete applied with 2–3 mm thin-layer technology; applied directly over existing floors.",
    },
    longDesc: {
      tr: "Mikro beton (aynı zamanda mikro çimento olarak da bilinir), çimento, polimer ve pigmentlerden oluşan ince bir kaplama sistemidir. Mevcut beton, seramik veya ahşap zemin üzerine sadece 2–3 mm kalınlıkta uygulanarak endüstriyel estetik sunar. Yüksek aşınma direnci ve su geçirimsizliği sağlar.",
      en: "Micro concrete (also known as micro cement) is a thin coating system composed of cement, polymers, and pigments. Applied at just 2–3 mm over existing concrete, ceramic, or wooden floors, it offers industrial aesthetics. It provides high abrasion resistance and water impermeability.",
    },
    features: {
      tr: ["2–3 mm ince uygulama", "Mevcut zemin söküm yok", "Derzsiz yüzey", "Her yüzeye uygulanabilir", "Renk özelleştirme"],
      en: ["2–3 mm thin application", "No removal of existing floor", "Seamless surface", "Applicable on any surface", "Color customization"],
    },
    materials: {
      tr: ["Çimento bazlı mikro beton", "Polimer katkı", "Pigment renklendirici", "Koruyucu vernik", "Astar"],
      en: ["Cement-based micro concrete", "Polymer additive", "Pigment colorant", "Protective varnish", "Primer"],
    },
    applications: {
      tr: ["Konut mutfak ve banyosu", "Otel lobi ve odaları", "Restoran iç mekanı", "Mağaza showroom", "Ofis alanları"],
      en: ["Residential kitchens and bathrooms", "Hotel lobbies and rooms", "Restaurant interiors", "Store showrooms", "Office areas"],
    },
  },

  {
    slug: "beton-silim-parlatma",
    category: "floor",
    image: px(209251),
    title: { tr: "Beton Silim ve Parlatma", en: "Concrete Grinding & Polishing" },
    shortDesc: {
      tr: "Mevcut beton zeminlerin elmas taşlama ve polisaj işlemleri ile pürüzsüz, ışıltılı yüzeylere kavuşturulması.",
      en: "Transforming existing concrete floors into smooth, glossy surfaces through diamond grinding and polishing processes.",
    },
    longDesc: {
      tr: "Beton silim ve parlatma; mevcut beton döşemelerin önce elmas taşlama ile tesviyesi, ardından kademeli kum numaralı elmas disklerle parlatılması ve son olarak litium silikat yoğunlaştırıcı uygulanmasından oluşan çok aşamalı bir işlemdir. Sonuçta yüksek reflektifliğe sahip, tozumaz ve son derece dayanıklı yüzeyler elde edilir.",
      en: "Concrete grinding and polishing is a multi-step process involving leveling existing concrete slabs with diamond grinding, then polishing with progressively finer diamond discs, and finally applying a lithium silicate densifier. The result is highly reflective, dust-free, and extremely durable surfaces.",
    },
    features: {
      tr: ["Yüksek ışıltı ve reflektivite", "Kimyasal ve aşınmaya direnç", "Tozumaz yüzey", "Uzun ömür", "Düşük bakım maliyeti"],
      en: ["High shine and reflectivity", "Resistance to chemicals and abrasion", "Dust-free surface", "Long lifespan", "Low maintenance cost"],
    },
    materials: {
      tr: ["Elmas taşlama diski", "Litium silikat yoğunlaştırıcı", "Koruyucu parlak vernik", "Kuru silim ekipmanı"],
      en: ["Diamond grinding disc", "Lithium silicate densifier", "Protective gloss varnish", "Dry polishing equipment"],
    },
    applications: {
      tr: ["Sanayi yapıları", "Depo ve lojistik merkezler", "Showroom ve mağazalar", "Okul ve üniversiteler", "Müze ve galerileri"],
      en: ["Industrial buildings", "Warehouse and logistics centers", "Showrooms and retail", "Schools and universities", "Museums and galleries"],
    },
  },

  {
    slug: "otopark-zemin",
    category: "floor",
    image: px(2034718),
    title: { tr: "Otopark Zemin Kaplama", en: "Parking Lot Floor Coating" },
    shortDesc: {
      tr: "Araç trafiğine ve kimyasallara dayanıklı, kaymaya karşı güvenli otopark zemin kaplama sistemleri.",
      en: "Safe anti-slip parking floor coating systems resistant to vehicle traffic and chemicals.",
    },
    longDesc: {
      tr: "Otopark zemin kaplamaları, yoğun araç trafiği, lastik aşınması, yakıt ve yağ sızıntıları ile iklim koşullarına dayanacak şekilde tasarlanmış özel sistemlerdir. Yüksek yapışma gücü, kaymaz yüzey ve renklendirme özellikleriyle güvenli trafik akışı sağlar.",
      en: "Parking floor coatings are specially designed systems to withstand heavy vehicle traffic, tire wear, fuel and oil spills, and climatic conditions. They ensure safe traffic flow with high adhesion strength, anti-slip surfaces, and color coding.",
    },
    features: {
      tr: ["Araç trafiğine tam direnç", "Yakıt ve yağa dayanım", "Kaymaz kuvars yüzey", "Renk kodlama imkanı", "Köprü güvertesi sistemi"],
      en: ["Full resistance to vehicle traffic", "Resistance to fuel and oil", "Anti-slip quartz surface", "Color coding capability", "Bridge deck system"],
    },
    materials: {
      tr: ["Poliüretan zemin reçinesi", "Epoksi astar", "Kuvars kaymaz agrega", "PU son kat", "Trafik boyası"],
      en: ["Polyurethane floor resin", "Epoxy primer", "Quartz anti-slip aggregate", "PU topcoat", "Traffic paint"],
    },
    applications: {
      tr: ["Açık ve kapalı otoparklar", "AVM otopark katları", "Üniversite kampüsü", "Havalimanı otopark", "Hastane otopark"],
      en: ["Open and covered parking lots", "Shopping mall parking floors", "University campuses", "Airport parking", "Hospital parking"],
    },
  },

  {
    slug: "yol-cizgi-yonlendirme",
    category: "floor",
    image: px(1590567),
    title: { tr: "Yol Çizgi ve Yönlendirme", en: "Road Marking & Signage" },
    shortDesc: {
      tr: "Otopark ve tesis içi güvenli trafik akışı için çizgi, ok ve yönlendirme boyaları ile işaretleme sistemleri.",
      en: "Line, arrow, and directional paint marking systems for safe traffic flow in parking lots and facilities.",
    },
    longDesc: {
      tr: "Yol çizgisi ve yönlendirme uygulamaları, otopark, fabrika içi yol ve lojistik alanlarda trafik düzenini sağlamak için uygulanır. Dayanıklı poliüretan veya epoksi boyalar ile şerit, ok, park yeri ve uyarı sembolleri çizilir.",
      en: "Road marking and directional applications are applied in parking lots, factory internal roads, and logistics areas to regulate traffic. Durable polyurethane or epoxy paints are used to mark lanes, arrows, parking spaces, and warning symbols.",
    },
    features: {
      tr: ["Uzun ömürlü boya sistemi", "Geniş renk seçeneği", "Reflektif (gece görünür) seçenek", "Hızlı kuruma", "Yoğun trafiğe dayanım"],
      en: ["Long-lasting paint system", "Wide color selection", "Reflective (night-visible) option", "Fast drying", "Resistance to heavy traffic"],
    },
    materials: {
      tr: ["Epoksi yol boyası", "Poliüretan yol boyası", "Reflektif boncuk", "Şablon", "Termoplatik çizgi boya"],
      en: ["Epoxy road paint", "Polyurethane road paint", "Reflective beads", "Stencil", "Thermoplastic line paint"],
    },
    applications: {
      tr: ["Otopark şeridi ve yön okları", "Fabrika içi trafik düzeni", "Lojistik depo çizgileri", "Yaya yolu işaretleri", "Engelli park yeri sembolü"],
      en: ["Parking lot lanes and directional arrows", "Factory internal traffic layout", "Logistics warehouse lines", "Pedestrian path markings", "Disabled parking space symbol"],
    },
  },

  {
    slug: "hazir-dekoratif-kaplamalar",
    category: "floor",
    image: px(1470168),
    title: { tr: "Hazır Dekoratif Kaplamalar", en: "Ready Decorative Coatings" },
    shortDesc: {
      tr: "Kolay ve hızlı uygulanan desen, doku ve efektli hazır dekoratif zemin kaplama sistemleri.",
      en: "Ready-to-apply decorative floor coating systems with patterns, textures, and effects.",
    },
    longDesc: {
      tr: "Hazır dekoratif kaplamalar; fabrikada hazırlanmış, sahaya getirilerek kolaylıkla uygulanan zemin kaplama sistemleridir. Taş, mermer veya ahşap imitasyonu yapabilen bu sistemler, hız ve maliyet avantajı sağlar.",
      en: "Ready decorative coatings are factory-prepared floor covering systems that can be easily applied on-site. These systems can simulate stone, marble, or wood and provide speed and cost advantages.",
    },
    features: {
      tr: ["Hızlı uygulama", "Mermer/taş imitasyonu", "Geniş desen seçeneği", "Uygun maliyet", "Bakımı kolay"],
      en: ["Fast application", "Marble/stone imitation", "Wide pattern selection", "Cost-effective", "Easy to maintain"],
    },
    materials: {
      tr: ["Hazır çimento bazlı kaplama", "Renk pigment", "Taş agregası", "Koruyucu son kat", "Astar"],
      en: ["Ready cement-based coating", "Color pigment", "Stone aggregate", "Protective topcoat", "Primer"],
    },
    applications: {
      tr: ["Konut iç mekanları", "Ticari alanlar", "Ofis binaları", "Eğitim kurumları", "Sağlık tesisleri"],
      en: ["Residential interiors", "Commercial spaces", "Office buildings", "Educational institutions", "Healthcare facilities"],
    },
  },

  {
    slug: "asma-tavan",
    category: "floor",
    image: px(1693675),
    title: { tr: "Asma Tavan (Metal & Taşyünü)", en: "Suspended Ceiling (Metal & Mineral Wool)" },
    shortDesc: {
      tr: "Akustik performans ve estetik görünüm sunan metal panel ve taşyünü modüllü asma tavan sistemleri.",
      en: "Suspended ceiling systems with metal panel and mineral wool modules offering acoustic performance and aesthetic appearance.",
    },
    longDesc: {
      tr: "Asma tavan sistemleri; metal panel, taşyünü, alçıpan veya PVC kaset modüllerinden oluşan, gizli veya görünür taşıyıcı sisteme monte edilen dekoratif ve işlevsel tavan çözümleridir. Akustik ses yutumu, ışıklandırma entegrasyonu ve teknik tesisat gizleme imkanı sağlar.",
      en: "Suspended ceiling systems are decorative and functional ceiling solutions consisting of metal panel, mineral wool, plasterboard, or PVC cassette modules mounted on hidden or exposed carrier systems. They provide acoustic sound absorption, lighting integration, and technical installation concealment.",
    },
    features: {
      tr: ["Yüksek akustik performans", "Teknik tesisat gizleme", "Aydınlatma entegrasyonu", "Gizli ve görünür taşıyıcı seçeneği", "Yangın dayanımlı seçenek"],
      en: ["High acoustic performance", "Technical installation concealment", "Lighting integration", "Hidden and exposed carrier options", "Fire-resistant option"],
    },
    materials: {
      tr: ["Metal tavan kaseti", "Taşyünü tavan paneli", "Alçıpan tavan", "Taşıyıcı profil sistemi", "Askı elemanları"],
      en: ["Metal ceiling cassette", "Mineral wool ceiling panel", "Plasterboard ceiling", "Carrier profile system", "Suspension elements"],
    },
    applications: {
      tr: ["Ofis binaları", "Alışveriş merkezleri", "Havalimanı terminalleri", "Hastane koridorları", "Eğitim kurumları"],
      en: ["Office buildings", "Shopping malls", "Airport terminals", "Hospital corridors", "Educational institutions"],
    },
  },

  {
    slug: "esnek-zemin-pvc-lvt",
    category: "floor",
    image: px(4846461),
    title: { tr: "Esnek Zemin Kaplamaları (PVC, LVT)", en: "Flexible Floor Coverings (PVC, LVT)" },
    shortDesc: {
      tr: "Konforlu yürüme yüzeyi sunan PVC ve LVT esnek zemin kaplamalar; ofis, hastane ve eğitim alanlarına uygun.",
      en: "PVC and LVT flexible floor coverings offering a comfortable walking surface; suitable for offices, hospitals, and educational areas.",
    },
    longDesc: {
      tr: "PVC ve LVT (Luxury Vinyl Tile) esnek zemin kaplamalar, yürüme konforu, ses yutumu ve görsel çeşitlilik açısından öne çıkan modern zemin çözümleridir. Rulolu PVC veya tıklama sistemiyle uygulanan LVT kalemler hızla döşenebilir ve çok çeşitli desen seçenekleri sunar.",
      en: "PVC and LVT (Luxury Vinyl Tile) flexible floor coverings are modern floor solutions that stand out in terms of walking comfort, sound absorption, and visual variety. Roll PVC or click-system LVT can be installed quickly and offers a wide variety of pattern options.",
    },
    features: {
      tr: ["Ses yutumu ve adım sesi azaltma", "Nem ve su direnci", "Antibakteriyel yüzey", "Kolay kesme ve montaj", "Geniş desen kataloğu"],
      en: ["Sound absorption and footstep noise reduction", "Moisture and water resistance", "Antibacterial surface", "Easy cutting and installation", "Wide pattern catalog"],
    },
    materials: {
      tr: ["Homojen PVC zemin", "LVT tıklama sistemi", "PVC yapışkan döşeme", "Alt zemin astar", "Kenar profili"],
      en: ["Homogeneous PVC flooring", "LVT click system", "PVC adhesive laying", "Sub-floor primer", "Edge profile"],
    },
    applications: {
      tr: ["Hastane ve klinikler", "Okullar ve anaokulları", "Ofis binaları", "Yaşlı bakım tesisleri", "Çocuk oyun alanları"],
      en: ["Hospitals and clinics", "Schools and kindergartens", "Office buildings", "Elderly care facilities", "Children's play areas"],
    },
  },

  {
    slug: "karo-hali",
    category: "floor",
    image: px(1595655),
    title: { tr: "Karo Halı", en: "Carpet Tiles" },
    shortDesc: {
      tr: "Modüler yapısıyla kolay değiştirilebilen, akustik konfor sağlayan karo halı döşeme sistemleri.",
      en: "Carpet tile flooring systems that are easily replaceable thanks to their modular structure and provide acoustic comfort.",
    },
    longDesc: {
      tr: "Karo halı; modüler 50×50 cm veya 60×60 cm kalemler halinde üretilen, kolayca değiştirilebilen ve akustik yutum sağlayan halı döşeme sistemidir. Yoğun kullanımlı ofislerde sıklıkla tercih edilir; hasarlı kalemlerin tek tek değiştirilebilmesi uzun dönem maliyet avantajı sağlar.",
      en: "Carpet tiles are a flooring system produced in modular 50×50 cm or 60×60 cm pieces that are easily replaceable and provide acoustic absorption. Frequently preferred in high-traffic offices; the ability to replace individual damaged pieces provides a long-term cost advantage.",
    },
    features: {
      tr: ["Modüler – tek tek değiştirilebilir", "Yüksek akustik yutum", "Antistatik seçenek", "Hızlı montaj", "Geniş renk ve desen"],
      en: ["Modular – individually replaceable", "High acoustic absorption", "Antistatic option", "Fast installation", "Wide color and pattern range"],
    },
    materials: {
      tr: ["Karo halı (looptufted/cut pile)", "Halı yapıştırıcı", "Kenar tırtıklı profil", "Alt zemin nemlenme bariyeri"],
      en: ["Carpet tile (looptufted/cut pile)", "Carpet adhesive", "Serrated edge profile", "Sub-floor moisture barrier"],
    },
    applications: {
      tr: ["Açık ofis planları", "Konferans salonları", "Otel koridorları", "Eğitim kurumları", "Çağrı merkezleri"],
      en: ["Open office plans", "Conference halls", "Hotel corridors", "Educational institutions", "Call centers"],
    },
  },

  {
    slug: "yukseltilmis-doseme",
    category: "floor",
    image: px(325229),
    title: { tr: "Yükseltilmiş Döşeme", en: "Raised Access Floor" },
    shortDesc: {
      tr: "Veri merkezi, kontrol odası ve ofis alanları için teknik kablo yönetimi sağlayan yükseltilmiş döşeme sistemleri.",
      en: "Raised access floor systems providing technical cable management for data centers, control rooms, and office areas.",
    },
    longDesc: {
      tr: "Yükseltilmiş döşeme (erişilebilir döşeme), montaj ayakları üzerine oturan çelik veya çimento esaslı panel sisteminden oluşur. Alt bölmede elektrik, veri, iklim ve tesisat kablolarının düzenli yönetimini sağlar; panel kaldırılarak kolayca erişim mümkündür.",
      en: "Raised access floor (accessible floor) consists of a steel or cement-based panel system resting on mounting legs. It enables organized management of electrical, data, climate, and installation cables in the underfloor cavity; easy access is possible by lifting panels.",
    },
    features: {
      tr: ["Kablo yönetim kolaylığı", "Hava sirkülasyonu (soğutma)", "İstenen yüksekliğe ayarlanabilir", "Antistatik panel seçeneği", "Yangın dayanımlı kaplama"],
      en: ["Ease of cable management", "Air circulation (cooling)", "Adjustable to desired height", "Antistatic panel option", "Fire-resistant covering"],
    },
    materials: {
      tr: ["Çelik yükseltilmiş döşeme paneli", "Çimento esaslı panel", "Montaj ayakları", "Kilit profilleri", "Üst yüzey kaplaması (HPL, halı, PVC)"],
      en: ["Steel raised floor panel", "Cement-based panel", "Mounting legs", "Locking profiles", "Top surface covering (HPL, carpet, PVC)"],
    },
    applications: {
      tr: ["Veri merkezleri", "Kontrol ve komuta odaları", "Banka arka ofisleri", "Hastane yoğun bakım", "TV yayın stüdyoları"],
      en: ["Data centers", "Control and command rooms", "Bank back offices", "Hospital intensive care", "TV broadcast studios"],
    },
  },
];

export const waterServices = services.filter((s) => s.category === "water");
export const floorServices = services.filter((s) => s.category === "floor");

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}
