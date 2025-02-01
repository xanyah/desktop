import { z } from "zod";

export const manufacturerSchema = z.object({
  name: z.string(),
  code: z.string(),
  notes: z.string().optional(),
})


export type manufacturerSchemaType = z.infer<typeof manufacturerSchema>
