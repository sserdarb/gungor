import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const servicesTable = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // 'water' | 'floor'
  image: text("image").notNull(),
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionTr: text("description_tr").notNull(),
  descriptionEn: text("description_en").notNull(),
  contentTr: text("content_tr").notNull(),
  contentEn: text("content_en").notNull(),
  featuresTr: text("features_tr").notNull(), // JSON string array
  featuresEn: text("features_en").notNull(), // JSON string array
  materialsTr: text("materials_tr").notNull(), // JSON string array
  materialsEn: text("materials_en").notNull(), // JSON string array
  applicationsTr: text("applications_tr").notNull(), // JSON string array
  applicationsEn: text("applications_en").notNull(), // JSON string array
  order: integer("order").default(0),
});

export const projectsTable = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // 'water' | 'floor'
  year: integer("year").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  gallery: text("gallery").notNull(), // stored as JSON string array
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  clientTypeTr: text("client_type_tr").notNull(),
  clientTypeEn: text("client_type_en").notNull(),
  scopeTr: text("scope_tr").notNull(),
  scopeEn: text("scope_en").notNull(),
  descriptionTr: text("description_tr").notNull(),
  descriptionEn: text("description_en").notNull(),
  details: text("details").notNull(), // stored as JSON string (Array<{label: {tr, en}, value: {tr, en}}>)
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true });
export const insertServiceSchema = createInsertSchema(servicesTable).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true });

export type User = typeof usersTable.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof servicesTable.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Project = typeof projectsTable.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;