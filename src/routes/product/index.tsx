import {
  ProductForm,
} from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useProduct } from '@/hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const Product = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: productData } = useProduct(id)
  const pageTitle = useMemo(
    () => productData?.data?.name || t('product.newPageTitle'),
    [productData, t],
  )
  useBreadCrumbContext([
    { label: t('products.pageTitle'), url: '/products' },
    { label: pageTitle },
  ])

  return (
    <ProductForm
      product={productData?.data}
      onSuccess={({ data }) => navigate(`/products/${data.id}/edit`)}
    />
  )
}

export default Product
