import { createInsertSchema } from "drizzle-zod";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const registrationsTable = pgTable("registrations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  program: varchar("program", { length: 240 }).notNull(),
  date: varchar("program_date", { length: 40 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  mode: varchar("attendance_mode", { length: 80 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrationsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertRegistration = typeof registrationsTable.$inferInsert;
export type Registration = typeof registrationsTable.$inferSelect;