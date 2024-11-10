import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const project = pgTable("project", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  customerId: text("customerId")
    .notNull()
    .references(() => user.id),
});
