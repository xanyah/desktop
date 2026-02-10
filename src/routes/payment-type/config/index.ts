import { z } from '../../../constants/zod'

export const paymentTypeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  isRefund: z.boolean().optional(),
})

export type paymentTypeSchemaType = z.infer<typeof paymentTypeSchema>
