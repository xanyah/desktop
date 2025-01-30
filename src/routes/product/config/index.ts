import { z } from "zod";

export const formSchema = z.object({
    name: z.string(),
    categoryId: z.string(),
    manufacturerId: z.string(),
    storeId: z.string(),
    amount: z.number(),
    buyingAmount: z.number(),
    taxFreeAmount: z.number(),
    sku: z.string(),
    manufacturerSku: z.string(),
    upc: z.string(),
})


export type formSchemaType = z.infer<typeof formSchema>
