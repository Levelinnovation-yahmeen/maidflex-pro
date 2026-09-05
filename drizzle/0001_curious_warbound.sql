ALTER TABLE `submissions` ADD `delivery_status` text DEFAULT 'not_configured' NOT NULL;--> statement-breakpoint
ALTER TABLE `submissions` ADD `delivery_attempts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `submissions` ADD `delivered_at` integer;--> statement-breakpoint
ALTER TABLE `submissions` ADD `external_record_id` text;--> statement-breakpoint
ALTER TABLE `submissions` ADD `last_delivery_error` text;