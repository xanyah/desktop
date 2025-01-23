import { inventoryFormat } from '../../types'
import PageContainer from '../../containers/page-container'

import './styles.scss'
import { useParams } from 'react-router-dom'
import { useInventory, useInventoryVariants } from '../../hooks'
import DataDetails from '../../components/data-details'
import { Trans } from 'react-i18next'

const Inventory = () => {
  const { id } = useParams()
  const { data: inventoryData } = useInventory(id)
  const { data: inventoryVariantsData } = useInventoryVariants({ inventoryId: id })

  const renderInventoryVariants = () => {
    return (
      <div className="inventory-variants">
        <label className="embed-table-title">Inventory Variants</label>
        <div className="embed-table">
          <div className="row header-row">
            <div className="column">
              <Trans i18nKey='models.variants.barcode' />
            </div>
            <div className="column">
              <Trans i18nKey='models.products.title' />
            </div>
            <div className="column">
              <Trans i18nKey='models.variants.quantity' />
            </div>
          </div>
          {
            inventoryVariantsData?.data?.map(inventoryVariant => (
              <div className="row" key={inventoryVariant.id}>
                <div className="column productName">
                  {inventoryVariant.variant.barcode}
                </div>
                <div className="column variantName">
                  {inventoryVariant.variant.product.name}
                </div>
                <div className="column quantity">{inventoryVariant.quantity}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      <h1 className="data-details-title">
        <Trans i18nKey='models.inventories.title' />
      </h1>
      <DataDetails
        currentEntity={inventoryData?.data}
        formattedData={inventoryFormat}
        type="inventories"
      />
      {renderInventoryVariants()}
    </PageContainer>
  )
}

export default Inventory
