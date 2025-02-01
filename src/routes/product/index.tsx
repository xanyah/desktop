import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductForm from './form'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentStore, useProduct } from '../../hooks'
import { createProduct, updateProduct } from '../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { showSuccessToast } from '../../utils/notification-helper'
import { validate } from 'uuid'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formSchemaType } from './config'
import { forOwn, isEmpty, map } from 'lodash'
import { decamelize } from 'humps'

const Product = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(id === 'new')
  const { data: productData } = useProduct(id)

  const queryClient = useQueryClient()
  useBreadCrumbContext([
    { label: 'Products', url: '/products' },
    { label: productData?.data?.name || 'New product' },
  ])

  const { mutate: createApiProduct } = useMutation({
    mutationFn: (newData: FormData) => createProduct(newData),
    onSuccess: (data) => {
      setIsEditing(false)
      navigate(`/products/${data.data.id}`)
      showSuccessToast(t('toast.created'))
    },
  })

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: (newData: FormData) => updateProduct(id, newData),
    onSuccess: (data) => {
      setIsEditing(false)
      showSuccessToast(t('toast.updated'))
      queryClient.setQueryData(['products', { id }], data)
    },
  })

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      const formData = new FormData()
      forOwn(data, (value, key) => {
        if (key !== 'images' && value) {
          formData.append(`product[${decamelize(key)}]`, value.toString())
        }
      })

      if (!isEmpty(data.images) && data.images) {
        data.images.forEach((item) => {
          if (item instanceof File) {
            formData.append('product[images][]', item)
          } else if (item.signed_id) {
            formData.append('product[images][]', item.signed_id)
          }
        })
      } else {
        formData.append('product[images][]', '')
      }

      if (validate(id)) {
        updateApiProduct(formData)
      } else {
        createApiProduct(formData)
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
                images: map(productData?.data?.images, (image) => ({
                  name: image.large.split('/').pop(),
                  signed_id: image.signedId,
                })),
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
