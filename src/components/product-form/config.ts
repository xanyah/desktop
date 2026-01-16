import { z } from '../../constants/zod'

const ImageSchema = z.union([
  z.instanceof(File),
  z.object({
    name: z.string(),
    signed_id: z.string(),
  }),
])

const productCustomAttributesAttributes = z.object({
  id: z.string().optional(),
  customAttributeId: z.string(),
  value: z.string().optional().nullable(),
})

export const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  categoryId: z.string(),
  subCategoryId: z.string().optional(),
  vatRateId: z.string(),
  manufacturerId: z.string(),
  storeId: z.string(),
  amountCents: z.number(),
  ratio: z.number().optional(),
  ratioEnabled: z.boolean().optional(),
  buyingAmountCents: z.number(),
  taxFreeAmountCents: z.number(),
  sku: z.string(),
  manufacturerSku: z.string(),
  upc: z.string(),
  images: z.array(ImageSchema).optional(),
  productCustomAttributesAttributes: z
    .array(productCustomAttributesAttributes.optional().nullable())
    .optional(),
})

export type formSchemaType = z.infer<typeof formSchema>
