ALTER TABLE "files" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "projectId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();