import { useState } from 'react'

import { Translate } from 'react-redux-i18n'

import './styles.scss'
import { useShipping, useShippingVariants } from '../../hooks'
import { useParams } from 'react-router-dom'
import { shippingFormat } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { updateShipping } from '../../api'
import DataDetails from '../../components/data-details'

const Shipping = () => {
  const {id} = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const {data: shippingData} = useShipping(id)
  const {data: shippingVariantsData} = useShippingVariants({shippingId: id})

  const {mutate} = useMutation({
    mutationFn: data => updateShipping(id, data),
    onSuccess: () => setIsEditing(false)
  })

  const renderShippingVariants = () => {
    return (
      <div className="shipping-variants-table">
        <div className="shipping-variants-table-header">
          <div className="column column-product">
            <Translate value='models.products.title'/>
          </div>
          <div className="column column-barcode">
            <Translate value='models.variants.barcode'/>
          </div>
          <div className="column column-quantity">
            <Translate value='models.variants.quantity'/>
          </div>
        </div>
        <div className="shipping-variants-table-body">
          {
            shippingVariantsData?.data.map(shippingVariant => (
              <div key={shippingVariant.id} className="shipping-variants-row">
                <div className="column column-product">
                  {shippingVariant.variant.product.name}
                </div>
                <div className="column column-barcode">
                  {shippingVariant.variant.barcode}
                </div>
                <div className="column column-quantity">
                  {shippingVariant.quantity}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

    return (
      <>
        <h1 className="data-details-title">{shippingData?.data?.name}</h1>
        <DataDetails
          currentEntity={shippingData?.data}
          editing={isEditing}
          formattedData={shippingFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="shippings"
          updateEntity={mutate}
        >
          {renderShippingVariants()}
        </DataDetails>
      </>
    )
}

export default Shipping
