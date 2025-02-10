import { z } from 'zod'

export const customerSaleSchema = z.object({
  customerId: z.string().min(1),
})

export type customerSaleSchemaType = z.infer<typeof customerSaleSchema>
