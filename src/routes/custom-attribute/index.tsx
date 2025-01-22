import { useState } from 'react'
import { customAttributeFormat } from '../../types'
import PageContainer from '../../containers/page-container'

import './styles.scss'
import { createCustomAttribute, updateCustomAttribute } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useCurrentStore, useCustomAttributes } from '../../hooks'
import { I18n } from 'react-redux-i18n'
import { showSuccessToast } from '../../utils/notification-helper'
import DataDetails from '../../components/data-details'

const CustomAttribute = () => {
  const {id} = useParams()
  const store = useCurrentStore()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const { data: customAttributeData } = useCustomAttributes(id)

  const { mutate: createApiCustomAttribute } = useMutation({
    mutationFn: (newData: any) => createCustomAttribute({...newData, storeId: store?.id}),
    onSuccess: (data) => {
      navigate(`/manufacturers/${data.data.id}`)
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.created', { entity: I18n.t('models.manufacturers.title') }))
    },
  })

  const { mutate: updateApiCustomAttribute } = useMutation({
    mutationFn: newData => updateCustomAttribute(id, newData),
    onSuccess: () => {
      setIsEditing(false)
      showSuccessToast(I18n.t('toast.updated'))
    },
  })

    return (
      <PageContainer>
        <DataDetails
          createEntity={createApiCustomAttribute}
          currentEntity={customAttributeData?.data}
          editing={isEditing}
          formattedData={customAttributeFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="custom-attributes"
          updateEntity={updateApiCustomAttribute}
        ></DataDetails>
      </PageContainer>
    )
  }

  export default CustomAttribute
