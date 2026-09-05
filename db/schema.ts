import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissions = sqliteTable(
  'submissions',
  {
    id: text('id').primaryKey(),
    confirmationCode: text('confirmation_code').notNull().unique(),
    kind: text('kind', { enum: ['service', 'professional'] }).notNull(),
    status: text('status', {
      enum: ['new', 'contacted', 'qualified', 'closed'],
    })
      .notNull()
      .default('new'),
    market: text('market').notNull(),
    contactName: text('contact_name').notNull(),
    organization: text('organization'),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    payload: text('payload').notNull(),
    deliveryStatus: text('delivery_status', {
      enum: ['not_configured', 'pending', 'delivered', 'failed'],
    })
      .notNull()
      .default('not_configured'),
    deliveryAttempts: integer('delivery_attempts').notNull().default(0),
    deliveredAt: integer('delivered_at', { mode: 'timestamp_ms' }),
    externalRecordId: text('external_record_id'),
    lastDeliveryError: text('last_delivery_error'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    index('idx_submissions_kind_created_at').on(table.kind, table.createdAt),
    index('idx_submissions_status_created_at').on(
      table.status,
      table.createdAt,
    ),
    index('idx_submissions_email').on(table.email),
  ],
);
