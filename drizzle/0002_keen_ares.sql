CREATE TYPE "public"."roles" AS ENUM('user', 'customer', 'admin');--> statement-breakpoint
CREATE TABLE "profle_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"image" text,
	"metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "profle_info" ADD CONSTRAINT "profle_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "name_idx" ON "users" USING btree ("firstname");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");