import { PosPrintData } from 'electron-pos-printer'
import { map } from 'lodash'
import { z } from 'zod'

export const printTestData = [
  {
    type: 'text',
    value: 'Titre',
    style: { fontWeight: '700', textAlign: 'center', fontSize: '24px' },
  }, {
    type: 'text',
    value: 'Description',
    style: { textDecoration: 'underline', fontSize: '10px', textAlign: 'center', color: 'red' },
  }, {
    type: 'barCode',
    value: '023456789010',
    height: 40,
    width: 2,
    displayValue: true,
    fontsize: 12,
  },
] as PosPrintData[]

export const pageSizeOptions = [
  { value: '80mm', label: '80mm' },
  { value: '78mm', label: '78mm' },
  { value: '76mm', label: '76mm' },
  { value: '58mm', label: '58mm' },
  { value: '57mm', label: '57mm' },
  { value: '44mm', label: '44mm' },
]

export const settingsSchema = z.object({
  defaultVatRateId: z.string().optional(),
  name: z.string().min(1),
  pageSize: z.enum(map(pageSizeOptions, option => option.value) as any),
})

export type settingsSchemaType = z.infer<typeof settingsSchema>
