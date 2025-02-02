import { z } from '../../../constants/zod'

export const categorySchema = z.object({
  name: z.string(),
  vatRateId: z.string(),
  categoryId: z.string().optional(),
})

export type categorySchemaType = z.infer<typeof categorySchema>
