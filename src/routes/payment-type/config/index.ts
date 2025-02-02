import { z } from 'zod'

export const paymentTypeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export type paymentTypeSchemaType = z.infer<typeof paymentTypeSchema>
