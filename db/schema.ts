import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissions = sqliteTable(
  'submissions',
  {
    id: text('id').primaryKey(),
    confirmationCode: text('confirmation_code').notNull().unique(),
    kind: text('kind', { enum: ['service', 'professional'] }).notNull(),
    status: text('status', { enum: ['new', 'contacted', 'qualified', 'closed'] })
      .notNull()
      .default('new'),
    market: text('market').notNull(),
    contactName: text('contact_name').notNull(),
    organization: text('organization'),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    payload: text('payload').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    index('idx_submissions_kind_created_at').on(table.kind, table.createdAt),
    index('idx_submissions_status_created_at').on(table.status, table.createdAt),
    index('idx_submissions_email').on(table.email),
  ],
);
