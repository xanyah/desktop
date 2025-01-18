import { useState } from 'react'
import { clientFormat } from '../../types'
import { I18n } from 'react-redux-i18n'
import PageContainer from '../../containers/page-container'

import './styles.scss'
import { useClient } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentStore } from '../../hooks/stores'
import { useMutation } from '@tanstack/react-query'
import { createClient, updateClient } from '../../api'
import { showSuccessToast } from '../../utils/notification-helper'
import DataDetails from '../../components/data-details'

const Client = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: clientData } = useClient(id)

  const { mutate: createApiClient } = useMutation({
    mutationFn: (newData: any) => createClient({...newData, storeId: store?.id}),
    onSuccess: (data) => {
      navigate(`/clients/${data.data.id}`)
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.created', { entity: I18n.t('models.manufacturers.title') }))
    },
  })

  const { mutate: updateApiClient } = useMutation({
    mutationFn: newData => updateClient(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.updated'))
    },
  })

  return (
    
    <PageContainer>
      <div className="client-page">
        {clientData && <h1 className="data-details-title">{`${clientData?.data.firstname} ${clientData?.data.lastname}`}</h1>}
        <DataDetails
          createEntity={createApiClient}
          currentEntity={clientData?.data}
          editing={isEditing}
          formattedData={clientFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="manufacturers"
          updateEntity={updateApiClient}
        />
      </div>
    </PageContainer>
  )
}

export default Client
