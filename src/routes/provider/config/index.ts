import { z } from '../../../constants/zod'

export const providerSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
})

export type providerSchemaType = z.infer<typeof providerSchema>
