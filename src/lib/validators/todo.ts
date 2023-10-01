import { z } from 'zod'

export const TodoValidator = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    completed: z.boolean().optional().default(false),
})

export type TodoRequest = z.infer<typeof TodoValidator>
