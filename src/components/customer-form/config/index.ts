import { z } from '../../../constants/zod'

export const customerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().optional(),
  notes: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export type customerSchemaType = z.infer<typeof customerSchema>
