import { useTranslation } from 'react-i18next'
import { useCurrentStore, useCustomAttributes } from '../../hooks'
import { isEmpty, map } from 'lodash'
import {
  FormSection,
  InputText,
} from '@/components'
import { Controller, useFormContext } from 'react-hook-form'
import { formSchemaType } from './config'

const ProductFormCustomAttributes = () => {
  const store = useCurrentStore()
  const { data: customAttributesData } = useCustomAttributes({
    'q[storeIdEq]': store?.id,
  })
  const { t } = useTranslation()
  const { control } = useFormContext<formSchemaType>()

  if (isEmpty(customAttributesData?.data)) {
    return null
  }

  return (
    <FormSection title={t('product.customAttributes')}>
      {map(customAttributesData?.data, (customAttribute, index) => (
        <Controller
          key={customAttribute.id}
          control={control}
          name={`productCustomAttributesAttributes.${index}`}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <InputText
              placeholder={customAttribute.name}
              label={customAttribute.name}
              value={value?.value || ''}
              onChange={e =>
                onChange({
                  id: value?.id,
                  customAttributeId: customAttribute.id,
                  value: e.target.value,
                })}
              error={error?.message}
            />
          )}
        />
      ))}
    </FormSection>
  )
}

export default ProductFormCustomAttributes
