import { inventoryFormat } from '../../types'

import './styles.scss'
import { useParams } from 'react-router-dom'
import { useInventory, useInventoryProducts } from '../../hooks'
import DataDetails from '../../components/data-details'
import { Trans } from 'react-i18next'

const Inventory = () => {
  const { id } = useParams()
  const { data: inventoryData } = useInventory(id)
  const { data: inventoryProductsData } = useInventoryProducts({ inventoryId: id })

  const renderInventoryProducts = () => {
    return (
      <div className="inventory-products">
        <label className="embed-table-title">Inventory Products</label>
        <div className="embed-table">
          <div className="row header-row">
            <div className="column">
              <Trans i18nKey='models.products.barcode' />
            </div>
            <div className="column">
              <Trans i18nKey='models.products.title' />
            </div>
            <div className="column">
              <Trans i18nKey='models.products.quantity' />
            </div>
          </div>
          {
            inventoryProductsData?.data?.map(inventoryVariant => (
              <div className="row" key={inventoryVariant.id}>
                <div className="column productName">
                  {inventoryVariant.product.sku}
                </div>
                <div className="column productName">
                  {inventoryVariant.product.name}
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
    <>
      <DataDetails
        currentEntity={inventoryData?.data}
        formattedData={inventoryFormat}
        type="inventories"
      />
      {renderInventoryProducts()}
      </>
  )
}

export default Inventory
