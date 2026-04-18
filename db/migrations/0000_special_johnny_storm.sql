CREATE TABLE `materials` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`unit` text NOT NULL,
	`price` real NOT NULL,
	`color` text DEFAULT '#f97316' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quote_items` (
	`id` text PRIMARY KEY NOT NULL,
	`quote_id` text NOT NULL,
	`material_id` text,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`unit_price` real NOT NULL,
	`qty` real NOT NULL,
	`subtotal` real NOT NULL,
	FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`qty` integer NOT NULL,
	`sheet_type` text NOT NULL,
	`sheet_w` real NOT NULL,
	`sheet_h` real NOT NULL,
	`sticker_w` real NOT NULL,
	`sticker_h` real NOT NULL,
	`bleed` real DEFAULT 2 NOT NULL,
	`per_sheet` integer NOT NULL,
	`sheets_needed` integer NOT NULL,
	`rotated` integer DEFAULT false NOT NULL,
	`material_cost` real NOT NULL,
	`markup` real NOT NULL,
	`total_price` real NOT NULL,
	`price_per_unit` real NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
