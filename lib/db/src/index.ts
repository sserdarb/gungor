import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const rawDbPath = process.env.DATABASE_URL || "file:./data/sqlite.db";

// Ensure the directory exists if it's a local file URL
if (rawDbPath.startsWith("file:")) {
  const dbPath = rawDbPath.replace(/^file:/, "");
  // Handle windows absolute paths or relative paths
  const absoluteDbPath = path.isAbsolute(dbPath)
    ? dbPath
    : path.resolve(process.cwd(), dbPath);

  const dbDir = path.dirname(absoluteDbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

export const client = createClient({ url: rawDbPath });
export const db = drizzle(client, { schema });

export * from "./schema";
