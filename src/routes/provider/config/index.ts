import { z } from "zod";

export const providerSchema = z.object({
    name: z.string(),
    notes: z.string().optional(),
    storeId: z.string(),
})


export type providerSchemaType = z.infer<typeof providerSchema>
