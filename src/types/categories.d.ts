interface Category {
  id: string
  name: string
  category?: Category
  vatRate?: VatRate
}
