import { z } from 'zod'

export const checkoutSchema = z.object({
  customerId: z.string().optional(),
  totalAmountCents: z.number(),
  totalAmountCurrency: z.string(),
  saleProductsAttributes: z.array(
    z.object({
      amountCents: z.number().positive(),
      amountCurrency: z.string(),
      originalAmountCents: z.number().positive(),
      originalAmountCurrency: z.string(),
      productId: z.string(),
      quantity: z.number().positive(),
    }),
  ).min(1),
  salePaymentsAttributes: z.array(
    z.object({
      paymentTypeId: z.string(),
      totalAmountCents: z.number(),
      totalAmountCurrency: z.string(),
    }),
  ).min(1),
  salePromotionAttributes: z.object({
    amountCents: z.number(),
    amountCurrency: z.string(),
    type: z.enum(['flat_discount', 'percent_discount']),
  }).optional(),
})

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>
