import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductForm from './form'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentStore, useProduct } from '../../hooks'
import { createProduct, updateProduct } from '../../api'
import { useMutation } from '@tanstack/react-query'
import { showSuccessToast } from '../../utils/notification-helper'
import { validate } from 'uuid'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formSchemaType } from './config'

const Product = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(id === 'new')
  const { data: productData } = useProduct(id)
  useBreadCrumbContext([
    { label: 'Products', url: '/products' },
    { label: productData?.data?.name || 'New product' },
  ])

  const { mutate: createApiProduct } = useMutation({
    mutationFn: (newData: formSchemaType) => createProduct(newData),
    onSuccess: (data) => {
      setIsEditing(false)
      navigate(`/products/${data.data.id}`)
      showSuccessToast(t('toast.created'))
    },
  })

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: (newData: formSchemaType) => updateProduct(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(t('toast.updated'))
    },
  })

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      if (validate(id)) {
        updateApiProduct(data)
      } else {
        createApiProduct(data)
      }
    },
    [id, updateApiProduct, createApiProduct]
  )

  if (isEditing) {
    return (
      <ProductForm
        initialValues={
          productData?.data
            ? {
              ...productData?.data,
              categoryId: productData?.data?.category?.id,
              manufacturerId: productData?.data?.manufacturer?.id,
              storeId: store?.id,
              buyingAmount: productData?.data?.buyingAmountCents / 100,
              taxFreeAmount: productData?.data?.taxFreeAmountCents / 100,
              amount: productData?.data?.amountCents / 100,
            }
            : undefined
        }
        onSubmit={onSubmit}
      />
    )
  }

  return (
    <div className="product-page">
      <h1 className="data-details-title">{productData?.data?.name}</h1>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      {/* <DataDetails
          currentEntity={productData?.data}
          editing={isEditing}
          formattedData={productFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="products"
          updateEntity={updateApiProduct}
        ><></>
        </DataDetails> */}
    </div>
  )
}

export default Product
