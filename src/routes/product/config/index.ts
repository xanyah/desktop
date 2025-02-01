import { z } from "zod";

const ImageSchema = z.union([
  z.instanceof(File), // Accepte un fichier (File)
  z.object({          // Accepte un objet avec name et signed_id
    name: z.string(),
    signed_id: z.string(),
  }),
]);

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
  images: z.array(ImageSchema).optional(),
})


export type formSchemaType = z.infer<typeof formSchema>
