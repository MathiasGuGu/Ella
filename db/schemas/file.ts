import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { project } from "./project";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: integer("size").notNull(),
  description: text("description"),
  tags: text("tags"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  binaryRef: text("binaryRef").notNull(),
  vectorRef: text("vectorRef"),
  projectId: uuid("projectId")
    .notNull()
    .references(() => project.id),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export type FileReturnType = typeof files.$inferSelect;
