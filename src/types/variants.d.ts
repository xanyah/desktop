type CustomAttribute = {
  id: string
  name: string
  type: string
}

type VariantAttribute = {
  id: string
  value: string
  createdAt: string
  updatedAt: string
  customAttribute: CustomAttribute
}

type Variant = {
  id: string
  originalBarcode: string
  barcode: string
  buyingAmountCents: number
  buyingAmountCurrency: string
  taxFreeAmountCents: number
  taxFreeAmountCurrency: string
  amountCents: number
  amountCurrency: string
  ratio: number
  quantity: number
  default: boolean
  createdAt: string
  updatedAt: string
  product: Product
  provider: Provider
  variantAttributes: VariantAttribute[]
}
