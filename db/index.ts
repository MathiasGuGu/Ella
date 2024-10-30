import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as Schema from "@/db/schema";

config({ path: ".env" }); // or .env.local

const sql = neon(
  "postgresql://Ella_owner:WqcpoNlL18gA@ep-delicate-wave-a2nkmnm3.eu-central-1.aws.neon.tech/Ella?sslmode=require"
);
export const db = drizzle(sql, { schema: Schema });
