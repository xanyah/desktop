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
}
