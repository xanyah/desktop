import { useState } from 'react'
import { providerFormat } from '../../types'
import { I18n } from 'react-redux-i18n'


import './styles.scss'
import { useProvider, useCurrentStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createProvider, updateProvider } from '../../api'
import { showSuccessToast } from '../../utils/notification-helper'
import DataDetails from '../../components/data-details'

const Provider = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: providerData } = useProvider(id)

  const { mutate: createApiProvider } = useMutation({
    mutationFn: (newData: any) => createProvider({...newData, storeId: store?.id}),
    onSuccess: (data) => {
      navigate(`/providers/${data.data.id}`)
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.created', { entity: I18n.t('models.providers.title') }))
    },
  })

  const { mutate: updateApiProvider } = useMutation({
    mutationFn: newData => updateProvider(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.updated'))
    },
  })

  return (
      <div className="provider-page">
        <h1 className="data-details-title">{providerData?.data.name}</h1>
        <DataDetails
          createEntity={createApiProvider}
          currentEntity={providerData?.data}
          editing={isEditing}
          formattedData={providerFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="providers"
          updateEntity={updateApiProvider}
        />
      </div>
  )
}

export default Provider
