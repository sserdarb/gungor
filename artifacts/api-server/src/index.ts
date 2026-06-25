import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, usersTable, servicesTable, projectsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

// Import existing static data for seeding if database is empty
import { services as staticServices } from "./data/services";
import { projects as staticProjects } from "./data/projects";

const JWT_SECRET = process.env.JWT_SECRET || "gungor-secret-key-2026";
const PORT = process.env.PORT || 5000;

const app = express();

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

// Serve frontend in production
const frontendBuildDir = path.resolve(process.cwd(), "../gungor-yalitim/dist/public");
if (fs.existsSync(frontendBuildDir)) {
  app.use(express.static(frontendBuildDir));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildDir, "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.json({ message: "API server is running. Frontend build not found." });
  });
}

// Start Server
app.listen(PORT, async () => {
  console.log(`Express API Server running on port ${PORT}`);
  // Perform schema creation using drizzle-kit push equivalent or rely on git push commands
  await seedDatabase();
});
