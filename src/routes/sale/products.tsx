import { map } from 'lodash'
import { SaleProductCard } from '@/components'

interface SaleProductsProps {
  saleProductsData?: SaleProduct[]
}

const SaleProducts = ({ saleProductsData }: SaleProductsProps) => {
  return map(saleProductsData, saleProduct => (
    <SaleProductCard saleProduct={saleProduct} key={saleProduct.id} />
  ))
}

export default SaleProducts
