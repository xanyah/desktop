import { useState } from 'react'
import { manufacturerFormat } from '../../types'

import './styles.scss'
import { useManufacturer, useProducts } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentStore } from '../../hooks/stores'
import { useMutation } from '@tanstack/react-query'
import { createManufacturer, updateManufacturer } from '../../api'
import { showSuccessToast } from '../../utils/notification-helper'
import DataTable from '../../components/data-table'
import DataDetails from '../../components/data-details'
import { useTranslation } from 'react-i18next'

const Manufacturer = () => {
  const { t } = useTranslation();
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
      showSuccessToast(t('toast.created', { entity: t('models.manufacturers.title') }))
    },
  })

  const { mutate: updateApiManufacturer } = useMutation({
    mutationFn: newData => updateManufacturer(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(t('toast.updated'))
    },
  })

  return (
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
  )
}

export default Manufacturer
