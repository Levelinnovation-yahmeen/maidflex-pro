CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`confirmation_code` text NOT NULL,
	`kind` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`market` text NOT NULL,
	`contact_name` text NOT NULL,
	`organization` text,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `submissions_confirmation_code_unique` ON `submissions` (`confirmation_code`);--> statement-breakpoint
CREATE INDEX `idx_submissions_kind_created_at` ON `submissions` (`kind`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_submissions_status_created_at` ON `submissions` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_submissions_email` ON `submissions` (`email`);--> statement-breakpoint
PRAGMA optimize;
