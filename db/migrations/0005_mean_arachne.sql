ALTER TABLE "files" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "tags" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "binaryRef" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "vectorRef" text;