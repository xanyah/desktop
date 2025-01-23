import { useState } from 'react'
import Collapsible from 'react-collapsible'
import { I18n, Translate } from 'react-redux-i18n'

import { productFormat } from '../../types'

import FormAttribute from '../../containers/form-attribute'

import './styles.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useProduct, useProductVariants } from '../../hooks'
import { createVariant, updateProduct } from '../../api'
import { useMutation } from '@tanstack/react-query'
import { showSuccessToast } from '../../utils/notification-helper'
import DataDetails from '../../components/data-details'
import DataTable from '../../components/data-table'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newVariant, setNewVariant] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const { data: productData } = useProduct(id)
  const { data: variantsData } = useProductVariants({ productId: id })

  const { mutate: createApiVariant } = useMutation({
    mutationFn: (newData: any) => createVariant({ ...newData, productId: id }),
    onSuccess: (data) => {
      navigate(`/manufacturers/${data.data.id}`)
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.created', { entity: I18n.t('models.manufacturers.title') }))
    },
  })

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: newData => updateProduct(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.updated'))
    },
  })


  const handleUpdateFieldNewVariant = (attribute, value) => {
    setNewVariant(oldValue => ({
      ...oldValue,
      [attribute]: value,
    }))
  }


  const renderVariantsTable = () => {
    return (
      <div className="variants">
        <h1 className="data-details-title">
          <Translate value='models.variants.title' />
        </h1>

        <DataTable
          columns={[
            'barcode',
            'buyingPrice',
            'provider',
            'quantity',
            'ratio',
            'taxFreePrice',
          ]}
          data={variantsData?.data}
          loading={false}
          onItemView={item => navigate(`/variants/${item.id}`)}
          type="variants"
          creation={false}
        />

      </div>
    )
  }

  const getVariantsFormAttribute = () => {
    return (
      <div>
        <div className="row">
          <FormAttribute
            attribute="provider"
            key="provider"
            value={newVariant['provider']}
            model="variants"
            type="entity"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="buyingPrice"
            key="buyingPrice"
            value={newVariant['buyingPrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="originalBarcode"
            key="originalBarcode"
            value={newVariant['originalBarcode']}
            model="variants"
            type="string"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="quantity"
            key="quantity"
            value={newVariant['quantity']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="ratio"
            key="ratio"
            value={newVariant['ratio']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="taxFreePrice"
            key="taxFreePrice"
            value={newVariant['taxFreePrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>
      </div>
    )
  }

  const renderVariantsForm = () => {
    return (
      <Collapsible
        trigger={<h1><Translate value='models.variants.create' /></h1>}
      >
        <form
          className="variant-form"
          onSubmit={e => {
            e.preventDefault()
            createApiVariant({ ...newVariant, productId: id })
          }}>
          {getVariantsFormAttribute()}
          <button className="btn-link btn-stand-alone">
            <Translate value='global.validate' />
          </button>
        </form>
      </Collapsible>
    )
  }

  return (
      <div className="product-page">
        <h1 className="data-details-title">{productData?.data?.name}</h1>
        <DataDetails
          currentEntity={productData?.data}
          editing={isEditing}
          formattedData={productFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="products"
          updateEntity={updateApiProduct}
        >
          <div>
            {renderVariantsTable()}
            {renderVariantsForm()}
          </div>
        </DataDetails>
      </div>
  )
}

export default Product
