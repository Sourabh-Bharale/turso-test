import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable('todos',{
 id: integer('id').primaryKey({autoIncrement:true}),
 user_id:text('user_id').notNull(),
 title: text('title').notNull(),
 description: text('description').notNull(),
 completed: integer('completed',{mode:"boolean"}).notNull().default(false),
})

export type DrizzleTodos = typeof todos.$inferSelect