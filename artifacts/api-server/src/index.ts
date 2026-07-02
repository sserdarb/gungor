import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { db, usersTable, servicesTable, projectsTable, settingsTable, menuItemsTable, translationsTable, chatSessionsTable, chatMessagesTable, leadsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

// Import existing static data for seeding if database is empty
import { services as staticServices } from "./data/services";
import { projects as staticProjects } from "./data/projects";
import { defaultTranslations } from "./data/translations";

const JWT_SECRET = process.env.JWT_SECRET || "gungor-secret-key-2026";
const PORT = process.env.PORT || 5000;

const app = express();

// Apply security headers
app.use(helmet({
  contentSecurityPolicy: false, // Bypass CSP to allow embedding third-party analytics scripts easily
}));

// Apply Rate Limiting to prevent brute-force attacks and DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1' || req.path === '/api/health',
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use("/api", limiter);

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Setup uploads directory
const uploadsDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Seeding function
async function seedDatabase() {
  try {
    // 1. Seed Admin User
    const users = await db.select().from(usersTable).limit(1);
    if (users.length === 0) {
      const defaultUsername = process.env.ADMIN_USER || "admin";
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await db.insert(usersTable).values({
        username: defaultUsername,
        password: hashedPassword
      });
      console.log(`Default admin user created: Username = ${defaultUsername}`);
    }

    // 2. Seed Services
    const dbServices = await db.select().from(servicesTable).limit(1);
    if (dbServices.length === 0) {
      console.log("Seeding services database...");
      for (const service of staticServices) {
        await db.insert(servicesTable).values({
          slug: service.slug,
          category: service.category,
          image: service.image,
          titleTr: service.title.tr,
          titleEn: service.title.en,
          descriptionTr: service.shortDesc.tr,
          descriptionEn: service.shortDesc.en,
          contentTr: service.longDesc.tr,
          contentEn: service.longDesc.en,
          featuresTr: JSON.stringify(service.features.tr),
          featuresEn: JSON.stringify(service.features.en),
          materialsTr: JSON.stringify(service.materials.tr),
          materialsEn: JSON.stringify(service.materials.en),
          applicationsTr: JSON.stringify(service.applications.tr),
          applicationsEn: JSON.stringify(service.applications.en),
        });
      }
      console.log(`Successfully seeded ${staticServices.length} services.`);
    }

    // 3. Seed Projects
    const dbProjects = await db.select().from(projectsTable).limit(1);
    if (dbProjects.length === 0) {
      console.log("Seeding projects database...");
      for (const project of staticProjects) {
        await db.insert(projectsTable).values({
          slug: project.slug,
          category: project.category,
          year: project.year,
          location: project.location,
          image: project.image,
          gallery: JSON.stringify(project.gallery),
          titleTr: project.title.tr,
          titleEn: project.title.en,
          clientTypeTr: project.clientType.tr,
          clientTypeEn: project.clientType.en,
          scopeTr: project.scope.tr,
          scopeEn: project.scope.en,
          descriptionTr: project.description.tr,
          descriptionEn: project.description.en,
          details: JSON.stringify(project.details),
        });
      }
      console.log(`Successfully seeded ${staticProjects.length} projects.`);
    }

    // 4. Seed Settings
    const settings = await db.select().from(settingsTable).limit(1);
    if (settings.length === 0) {
      console.log("Seeding default settings database...");
      await db.insert(settingsTable).values({
        titleTr: "Güngör Yalıtım Uygulama Çözümleri | İzmir Su Yalıtımı ve Zemin Kaplama",
        titleEn: "Gungor Waterproofing & Industrial Flooring Systems | Izmir",
        descriptionTr: "İzmir merkezli Güngör Yalıtım Uygulama Çözümleri; 18+ yıllık tecrübeyle su yalıtımı, endüstriyel zemin kaplama ve asma tavan sistemlerinde anahtar teslim, garantili profesyonel çözümler sunar.",
        descriptionEn: "Izmir-based Gungor Waterproofing; turnkey, guaranteed professional solutions in waterproofing and industrial flooring with 18+ years exp.",
        keywordsTr: "su yalıtımı, epoksi zemin kaplama, poliüretan zemin, izolasyon, izmir yalıtım, güngör yalıtım",
        keywordsEn: "waterproofing, epoxy flooring, polyurethane flooring, insulation, izmir waterproofing, gungor",
        whatsappNumber: "905541624638",
        contactEmail: "info@gungormuhendislik.com.tr",
        contactPhone: "+90 232 123 45 67",
        contactAddressTr: "İzmir, Türkiye",
        contactAddressEn: "Izmir, Turkey",
        socialFacebook: "https://www.facebook.com/gungor.muhendislik",
        socialInstagram: "https://www.instagram.com/gungor.muhendislik",
        socialLinkedin: "https://www.linkedin.com/company/g%C3%BCng%C3%B6r-m%C3%BChendislik",
        heroVideoUrl: "/videos/waterproofing_flooring_services.mp4"
      });
      console.log("Default settings created successfully.");
    }

    // 5. Seed Menu Items
    const menus = await db.select().from(menuItemsTable).limit(1);
    if (menus.length === 0) {
      console.log("Seeding default menus database...");
      const defaultMenus = [
        { labelTr: "Ana Sayfa", labelEn: "Home", link: "/", order: 1 },
        { labelTr: "Hizmetler", labelEn: "Services", link: "/#hizmetler", order: 2 },
        { labelTr: "Çözüm Alanları", labelEn: "Solutions", link: "/#cozumler", order: 3 },
        { labelTr: "Neden Biz?", labelEn: "Why Us?", link: "/#neden-biz", order: 4 },
        { labelTr: "Projelerimiz", labelEn: "Projects", link: "/projeler", order: 5 },
        { labelTr: "İletişim", labelEn: "Contact", link: "/#iletisim", order: 6 },
      ];
      for (const menu of defaultMenus) {
        await db.insert(menuItemsTable).values(menu);
      }
      console.log("Default menus created successfully.");
    }

    // 6. Seed Translations
    const existingTranslations = await db.select().from(translationsTable).limit(1);
    if (existingTranslations.length === 0) {
      console.log("Seeding default translations database...");
      for (const [key, val] of Object.entries(defaultTranslations)) {
        await db.insert(translationsTable).values({
          key,
          tr: val.tr,
          en: val.en
        });
      }
      console.log("Successfully seeded translation keys.");
    }
  } catch (err) {
    console.error("Database seeding error:", err);
  }
}

// Authentication middleware
function requireAuth(req: any, res: any, next: any) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

// --- Auth Routes ---
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Username and password required" });
    return;
  }

  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict"
    });

    res.json({ user: { id: user.id, username: user.username } });
    return;
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
    return;
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

app.get("/api/auth/me", requireAuth, (req: any, res) => {
  res.json({ user: req.user });
});

// --- Services Routes ---
app.get("/api/services", async (req, res) => {
  try {
    const services = await db.select().from(servicesTable).all();
    // Parse JSON fields
    const parsedServices = services.map(s => ({
      ...s,
      features: { tr: JSON.parse(s.featuresTr), en: JSON.parse(s.featuresEn) },
      materials: { tr: JSON.parse(s.materialsTr), en: JSON.parse(s.materialsEn) },
      applications: { tr: JSON.parse(s.applicationsTr), en: JSON.parse(s.applicationsEn) }
    }));
    res.json(parsedServices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

app.post("/api/services", requireAuth, async (req, res) => {
  try {
    const {
      slug, category, image, titleTr, titleEn,
      descriptionTr, descriptionEn, contentTr, contentEn,
      featuresTr, featuresEn, materialsTr, materialsEn, applicationsTr, applicationsEn, order
    } = req.body;

    const newService = await db.insert(servicesTable).values({
      slug, category, image, titleTr, titleEn,
      descriptionTr, descriptionEn, contentTr, contentEn,
      featuresTr: featuresTr || "[]",
      featuresEn: featuresEn || "[]",
      materialsTr: materialsTr || "[]",
      materialsEn: materialsEn || "[]",
      applicationsTr: applicationsTr || "[]",
      applicationsEn: applicationsEn || "[]",
      order: Number(order) || 0
    }).returning().get();

    res.status(201).json(newService);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error creating service" });
  }
});

app.put("/api/services/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const {
      slug, category, image, titleTr, titleEn,
      descriptionTr, descriptionEn, contentTr, contentEn,
      featuresTr, featuresEn, materialsTr, materialsEn, applicationsTr, applicationsEn, order
    } = req.body;

    await db.update(servicesTable)
      .set({
        slug, category, image, titleTr, titleEn,
        descriptionTr, descriptionEn, contentTr, contentEn,
        featuresTr, featuresEn,
        materialsTr, materialsEn,
        applicationsTr, applicationsEn,
        order: Number(order) || 0
      })
      .where(eq(servicesTable.id, Number(id)));

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating service" });
  }
});

app.delete("/api/services/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(servicesTable).where(eq(servicesTable.id, Number(id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error deleting service" });
  }
});

// --- Projects Routes ---
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await db.select().from(projectsTable).all();
    // Parse JSON fields
    const parsedProjects = projects.map(p => ({
      ...p,
      gallery: JSON.parse(p.gallery),
      details: JSON.parse(p.details)
    }));
    res.json(parsedProjects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

app.post("/api/projects", requireAuth, async (req, res) => {
  try {
    const {
      slug, category, year, location, image, gallery,
      titleTr, titleEn, clientTypeTr, clientTypeEn,
      scopeTr, scopeEn, descriptionTr, descriptionEn, details
    } = req.body;

    const newProject = await db.insert(projectsTable).values({
      slug, category,
      year: Number(year),
      location, image,
      gallery: gallery || "[]",
      titleTr, titleEn,
      clientTypeTr, clientTypeEn,
      scopeTr, scopeEn,
      descriptionTr, descriptionEn,
      details: details || "[]"
    }).returning().get();

    res.status(201).json(newProject);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error creating project" });
  }
});

app.put("/api/projects/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const {
      slug, category, year, location, image, gallery,
      titleTr, titleEn, clientTypeTr, clientTypeEn,
      scopeTr, scopeEn, descriptionTr, descriptionEn, details
    } = req.body;

    await db.update(projectsTable)
      .set({
        slug, category,
        year: Number(year),
        location, image,
        gallery,
        titleTr, titleEn,
        clientTypeTr, clientTypeEn,
        scopeTr, scopeEn,
        descriptionTr, descriptionEn,
        details
      })
      .where(eq(projectsTable.id, Number(id)));

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating project" });
  }
});

app.delete("/api/projects/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, Number(id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error deleting project" });
  }
});

// --- Settings Routes ---
app.get("/api/settings", async (req, res) => {
  try {
    const settings = await db.select().from(settingsTable).limit(1).get();
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching settings" });
  }
});

app.put("/api/settings", requireAuth, async (req, res) => {
  try {
    const {
      titleTr, titleEn, descriptionTr, descriptionEn, keywordsTr, keywordsEn,
      googleAnalyticsId, googleSearchConsoleId, googleTagManagerId, facebookPixelId,
      whatsappNumber, contactEmail, contactPhone, contactAddressTr, contactAddressEn,
      socialFacebook, socialInstagram, socialLinkedin, heroVideoUrl
    } = req.body;

    const existing = await db.select().from(settingsTable).limit(1).get();
    if (existing) {
      await db.update(settingsTable)
        .set({
          titleTr, titleEn, descriptionTr, descriptionEn, keywordsTr, keywordsEn,
          googleAnalyticsId, googleSearchConsoleId, googleTagManagerId, facebookPixelId,
          whatsappNumber, contactEmail, contactPhone, contactAddressTr, contactAddressEn,
          socialFacebook, socialInstagram, socialLinkedin, heroVideoUrl
        })
        .where(eq(settingsTable.id, existing.id));
    } else {
      await db.insert(settingsTable).values({
        titleTr, titleEn, descriptionTr, descriptionEn, keywordsTr, keywordsEn,
        googleAnalyticsId, googleSearchConsoleId, googleTagManagerId, facebookPixelId,
        whatsappNumber, contactEmail, contactPhone, contactAddressTr, contactAddressEn,
        socialFacebook, socialInstagram, socialLinkedin, heroVideoUrl
      });
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating settings" });
  }
});

// --- Menu Items Routes ---
app.get("/api/menu-items", async (req, res) => {
  try {
    const menus = await db.select().from(menuItemsTable).all();
    menus.sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

app.post("/api/menu-items", requireAuth, async (req, res) => {
  try {
    const { labelTr, labelEn, link, order } = req.body;
    const newItem = await db.insert(menuItemsTable).values({
      labelTr, labelEn, link, order: Number(order) || 0
    }).returning().get();
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error creating menu item" });
  }
});

app.put("/api/menu-items/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const { labelTr, labelEn, link, order } = req.body;
    await db.update(menuItemsTable)
      .set({ labelTr, labelEn, link, order: Number(order) || 0 })
      .where(eq(menuItemsTable.id, Number(id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating menu item" });
  }
});

app.delete("/api/menu-items/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(menuItemsTable).where(eq(menuItemsTable.id, Number(id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error deleting menu item" });
  }
});

// --- Translations Routes ---
app.get("/api/translations", async (req, res) => {
  try {
    const trans = await db.select().from(translationsTable).all();
    res.json(trans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching translations" });
  }
});

app.put("/api/translations", requireAuth, async (req, res) => {
  try {
    const { key, tr, en } = req.body;
    if (!key) {
      res.status(400).json({ message: "Key is required" });
      return;
    }
    const existing = await db.select().from(translationsTable).where(eq(translationsTable.key, key)).get();
    if (existing) {
      await db.update(translationsTable)
        .set({ tr, en })
        .where(eq(translationsTable.key, key));
    } else {
      await db.insert(translationsTable).values({ key, tr, en });
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating translation" });
  }
});

// --- Users Management Routes ---
app.get("/api/users", requireAuth, async (req, res) => {
  try {
    const users = await db.select().from(usersTable).all();
    const sanitizedUsers = users.map(u => ({ id: u.id, username: u.username, createdAt: u.createdAt }));
    res.json(sanitizedUsers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/api/users", requireAuth, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password required" });
      return;
    }
    const existing = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
    if (existing) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(usersTable).values({
      username, password: hashedPassword
    }).returning().get();
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error creating user" });
  }
});

app.put("/api/users/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const { username, password } = req.body;
    const updateData: any = {};
    if (username) {
      const existing = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
      if (existing && existing.id !== Number(id)) {
        res.status(400).json({ message: "Username already exists" });
        return;
      }
      updateData.username = username;
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length > 0) {
      await db.update(usersTable).set(updateData).where(eq(usersTable.id, Number(id)));
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating user" });
  }
});

app.delete("/api/users/:id", requireAuth, async (req: any, res) => {
  const { id } = req.params;
  try {
    if (req.user && req.user.id === Number(id)) {
      res.status(400).json({ message: "You cannot delete your own account" });
      return;
    }
    await db.delete(usersTable).where(eq(usersTable.id, Number(id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error deleting user" });
  }
});

// --- Media Upload Route ---
app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
  return;
});

// --- Chatbot & Leads Routes ---

// Public Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { sessionId, message, lang } = req.body;
  if (!sessionId || !message) {
    res.status(400).json({ message: "sessionId and message required" });
    return;
  }

  try {
    const activeLang = lang === "en" ? "en" : "tr";
    // Check or create session
    let session = await db.select().from(chatSessionsTable).where(eq(chatSessionsTable.sessionId, sessionId)).get();
    if (!session) {
      session = await db.insert(chatSessionsTable).values({ sessionId, lang: activeLang }).returning().get();
    }

    // Insert user message
    await db.insert(chatMessagesTable).values({ sessionId, role: "user", content: message });

    // Fetch context data
    const services = await db.select().from(servicesTable).all();
    const projects = await db.select().from(projectsTable).all();
    const settings = await db.select().from(settingsTable).limit(1).get();

    // System prompt formulation
    const formattedDate = new Date().toLocaleDateString(activeLang === "en" ? "en-US" : "tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const systemPrompt = `You are the smart AI assistant of Güngör Yalıtım (Güngör Mühendislik) Waterproofing & Industrial Flooring.
Your task is to answer visitors' questions about the company, services, and reference projects in a professional, polite, helpful and corporate manner.

Current Date and Time: ${formattedDate}.

RULES:
1. Answer strictly based on the company details below. If a service/project is not listed, recommend contacting the firm directly.
2. Be friendly and conversational for general queries (hello, how are you, etc.) but direct the user back to asking about our waterproofing & floor coating solutions.
3. Automatically adapt to the user's language. Speak Turkish if the user speaks Turkish, English if they speak English.
4. If the user wants a quote (teklif), a free site survey (ücretsiz keşif), wants pricing, or wants to be contacted, politely ask for their:
   - Name and Surname (Ad Soyad)
   - Phone Number (Telefon)
   - Email (optional)
   - Project description or requested service
5. Once you have gathered these details (Name and Phone are mandatory), append this exact JSON tag at the VERY END of your response (hidden from user view):
   [LEAD_CAPTURE: {"name": "Client Name", "phone": "Phone Number", "email": "Email Address", "service": "Requested Service", "message": "Brief summary of request"}]
   - Keep this format exactly. Use valid double-quoted JSON strings. The backend parses this to store leads.

COMPANY DETAILS:
- Address: ${settings?.contactAddressTr || "İzmir, Türkiye"}
- Address (EN): ${settings?.contactAddressEn || "Izmir, Turkey"}
- Phone: ${settings?.contactPhone || "+90 554 561 64 83"}
- Email: ${settings?.contactEmail || "info@gungormuhendislik.com.tr"}
- WhatsApp: https://wa.me/${settings?.whatsappNumber || "905541624638"}

OUR SERVICES:
${services.map(s => `- ${activeLang === "tr" ? s.titleTr : s.titleEn}: ${activeLang === "tr" ? s.descriptionTr : s.descriptionEn}. Detail: ${activeLang === "tr" ? s.contentTr : s.contentEn}`).join("\n")}

OUR COMPLETED PROJECTS (REFERENCES):
${projects.map(p => `- ${activeLang === "tr" ? p.titleTr : p.titleEn} (Year: ${p.year}, Location: ${p.location}): ${activeLang === "tr" ? p.descriptionTr : p.descriptionEn}`).join("\n")}
`;

    // Fetch message history
    const history = await db.select().from(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId)).all();
    history.sort((a, b) => a.id - b.id);
    const chatHistory = history.map(m => ({ role: m.role, content: m.content }));

    const MISTRAL_API_KEY = "nv0Dk63HfliVexgD9On8OSbyIn2d7TRS";

    let aiMessage = "";
    // Try mistral-small-latest first, fallback to open-mixtral-8x7b if it fails
    const models = ["mistral-small-latest", "open-mixtral-8x7b"];
    let apiSuccess = false;

    for (const model of models) {
      if (apiSuccess) break;
      try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${MISTRAL_API_KEY}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              ...chatHistory
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const resData = (await response.json()) as any;
          aiMessage = resData.choices?.[0]?.message?.content || "";
          if (aiMessage) {
            apiSuccess = true;
            break;
          }
        }
      } catch (err) {
        console.error(`Mistral API Error with model ${model}:`, err);
      }
    }

    if (!apiSuccess) {
      aiMessage = activeLang === "en" 
        ? "We are currently experiencing a high volume of requests. Please call or WhatsApp us directly at the numbers provided on the contact page."
        : "Şu anda yoğunluk sebebiyle yanıt veremiyorum. Lütfen iletişim sayfamızdaki telefon numaralarından veya WhatsApp hattımızdan bizimle doğrudan iletişime geçin.";
    }

    // Lead detection in response
    const leadRegex = /\[LEAD_CAPTURE:\s*(\{.*?\})\s*\]/;
    const match = aiMessage.match(leadRegex);
    let cleanedContent = aiMessage;

    if (match) {
      try {
        const leadData = JSON.parse(match[1]);
        await db.insert(leadsTable).values({
          sessionId,
          source: "chatbot",
          type: "quote",
          name: leadData.name || "Bilinmeyen",
          phone: leadData.phone || "Belirtilmedi",
          email: leadData.email || "",
          service: leadData.service || "",
          message: leadData.message || "Chatbot lead capture"
        });
        // Strip out lead capture tags
        cleanedContent = aiMessage.replace(leadRegex, "").trim();
      } catch (err) {
        console.error("Failed to parse captured lead JSON:", err);
      }
    }

    // Save assistant response
    await db.insert(chatMessagesTable).values({ sessionId, role: "assistant", content: cleanedContent });

    res.json({ response: cleanedContent });
    return;
  } catch (err: any) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Error communicating with chatbot assistant" });
    return;
  }
});

// Public Lead form submission
app.post("/api/leads", async (req, res) => {
  const { type, name, phone, email, service, message } = req.body;
  if (!name || !phone || !message) {
    res.status(400).json({ message: "Name, phone, and message are required" });
    return;
  }

  try {
    const newLead = await db.insert(leadsTable).values({
      source: "form",
      type: type || "contact",
      name,
      phone,
      email: email || "",
      service: service || "",
      message,
      status: "new"
    }).returning().get();
    res.status(201).json(newLead);
    return;
  } catch (err: any) {
    console.error("Error creating lead from form:", err);
    res.status(500).json({ message: "Error saving contact request" });
    return;
  }
});

// --- Admin Panel API Endpoints (Auth Required) ---

// Get all chat sessions with stats
app.get("/api/admin/chat-sessions", requireAuth, async (req, res) => {
  try {
    const sessions = await db.select().from(chatSessionsTable).all();
    const result = [];
    for (const s of sessions) {
      const msgs = await db.select().from(chatMessagesTable).where(eq(chatMessagesTable.sessionId, s.sessionId)).all();
      msgs.sort((a, b) => a.id - b.id);
      result.push({
        id: s.id,
        sessionId: s.sessionId,
        lang: s.lang,
        createdAt: s.createdAt,
        messageCount: msgs.length,
        lastMessage: msgs[msgs.length - 1]?.content || ""
      });
    }
    // Sort descending by date
    result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chat sessions" });
  }
});

// Get message history of a chat session
app.get("/api/admin/chat-sessions/:sessionId/messages", requireAuth, async (req, res) => {
  const { sessionId } = req.params;
  try {
    const msgs = await db.select().from(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId)).all();
    msgs.sort((a, b) => a.id - b.id);
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chat messages" });
  }
});

// Delete a chat session and its history
app.delete("/api/admin/chat-sessions/:sessionId", requireAuth, async (req, res) => {
  const { sessionId } = req.params;
  try {
    await db.delete(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId));
    await db.delete(chatSessionsTable).where(eq(chatSessionsTable.sessionId, sessionId));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting chat session" });
  }
});

// Get all leads
app.get("/api/admin/leads", requireAuth, async (req, res) => {
  try {
    const leads = await db.select().from(leadsTable).all();
    // Sort descending by date
    leads.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
});

// Update a lead status
app.put("/api/admin/leads/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    res.status(400).json({ message: "Status required" });
    return;
  }

  try {
    await db.update(leadsTable).set({ status }).where(eq(leadsTable.id, Number(id)));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error updating lead status" });
  }
});

// Delete a lead
app.delete("/api/admin/leads/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(leadsTable).where(eq(leadsTable.id, Number(id)));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lead" });
  }
});

// Serve frontend in production
const frontendBuildDir = path.resolve(process.cwd(), "../gungor-yalitim/dist/public");
if (fs.existsSync(frontendBuildDir)) {
  app.use(express.static(frontendBuildDir));
  app.get("*any", (req, res) => {
    res.sendFile(path.join(frontendBuildDir, "index.html"));
  });
} else {
  app.get("*any", (req, res) => {
    res.json({ message: "API server is running. Frontend build not found." });
  });
}

// Start Server
app.listen(PORT, async () => {
  console.log(`Express API Server running on port ${PORT}`);
  // Perform schema creation using drizzle-kit push equivalent or rely on git push commands
  await seedDatabase();
});
