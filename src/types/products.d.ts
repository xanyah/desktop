type Product = {
  id: string,
  name: string
  category?: Category
  manufacturer?: Manufacturer
  createdAt: string
  updatedAt: string
  sku: string
  upc: string
  buyingAmountCents: number
  buyingAmountCurrency: string
  taxFreeAmountCents: number
  taxFreeAmountCurrency: string
  quantity: number
  provider?: Provider
  amountCents: number
  amountCurrency: string
}
