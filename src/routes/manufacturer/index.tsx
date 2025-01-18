import { useState } from 'react'
import { manufacturerFormat } from '../../types'
import { I18n } from 'react-redux-i18n'
import PageContainer from '../../containers/page-container'

import './styles.scss'
import { useManufacturer, useProducts } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentStore } from '../../hooks/stores'
import { useMutation } from '@tanstack/react-query'
import { createManufacturer, updateManufacturer } from '../../api'
import { showSuccessToast } from '../../utils/notification-helper'
import DataTable from '../../components/data-table'
import DataDetails from '../../components/data-details'

const Manufacturer = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: manufacturerData } = useManufacturer(id)
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({ manufacturerId: id })

  const { mutate: createApiManufacturer } = useMutation({
    mutationFn: (newData: any) => createManufacturer({...newData, storeId: store?.id}),
    onSuccess: (data) => {
      navigate(`/manufacturers/${data.data.id}`)
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.created', { entity: I18n.t('models.manufacturers.title') }))
    }
  })

  const { mutate: updateApiManufacturer } = useMutation({
    mutationFn: newData => updateManufacturer(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.updated'))
    }
  })

  return (
    <PageContainer>
      <div className="manufacturer-page">
        <h1 className="data-details-title">{manufacturerData?.data.name}</h1>
        <DataDetails
          createEntity={createApiManufacturer}
          currentEntity={manufacturerData?.data}
          editing={isEditing}
          formattedData={manufacturerFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="manufacturers"
          updateEntity={updateApiManufacturer}
        >
          {
            (manufacturerData?.data.id)
              ? (
                <DataTable
                  columns={['name', 'category', 'manufacturer']}
                  data={productsData?.data}
                  loading={isLoadingProducts}
                  onItemView={item => navigate(`/products/${item.id}`)}
                  type="products"
                />
              )
              : (
                null
              )
          }
        </DataDetails>
      </div>
    </PageContainer>
  )
}

export default Manufacturer
