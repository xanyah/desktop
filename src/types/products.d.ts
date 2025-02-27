interface ProductCustomAttribute {
  id: string
  customAttribute: CustomAttribute
  value: string
}

interface Product {
  id: string
  name: string
  category?: Category
  manufacturer?: Manufacturer
  createdAt: string
  updatedAt: string
  sku: string
  upc: string
  manufacturerSku: string
  vatRate?: VatRate
  buyingAmountCents: number
  buyingAmountCurrency: string
  taxFreeAmountCents: number
  taxFreeAmountCurrency: string
  quantity: number
  amountCents: number
  amountCurrency: string
  images: {
    large: string
    medium: string
    openGraph: string
    thumbnail: string
    signedId: string
  }[]
  productCustomAttributes: ProductCustomAttribute[]
}
