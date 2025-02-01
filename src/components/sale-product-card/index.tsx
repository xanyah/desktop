import { formatPrice } from "@/helpers/price"

type SaleProductCardProps = {
  saleProduct: SaleProduct
}

const SaleProductCard = ({ saleProduct }: SaleProductCardProps) => {
  return <div className="flex flex-row items-center justify-between gap-4">
    <div className="flex flex-col flex-1">
      <h4>{saleProduct.product.name}</h4>
      <p>{formatPrice(saleProduct.amountCents, saleProduct.amountCurrency)}</p>
    </div>
    <p className="w-12">{saleProduct.quantity}</p>
    <p className="w-24 text-right">{formatPrice(saleProduct.amountCents * saleProduct.quantity, saleProduct.amountCurrency)}</p>
  </div>
}

export default SaleProductCard
