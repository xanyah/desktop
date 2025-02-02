import { useSaleProducts } from '../../hooks'
import { map } from 'lodash'
import { SaleProductCard } from '@/components'

interface SaleProductsProps {
  sale: Sale
}

const SaleProducts = ({ sale }: SaleProductsProps) => {
  const { data: saleProductsData } = useSaleProducts({
    'q[saleIdEq]': sale.id,
  })

  return map(saleProductsData?.data, saleProduct => (
    <SaleProductCard saleProduct={saleProduct} key={saleProduct.id} />
  ))
}

export default SaleProducts
