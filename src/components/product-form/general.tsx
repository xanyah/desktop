import { useTranslation } from 'react-i18next'
import {
  CategorySelect,
  FormSection,
  InputFile,
  InputText,
  ManufacturerSelect,
} from '@/components'
import { Controller, useFormContext } from 'react-hook-form'
import { formSchemaType } from './config'

const ProductFormGeneral = () => {
  const { t } = useTranslation()
  const { control } = useFormContext<formSchemaType>()

  return (
    <FormSection title={t('product.generalInformations')}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            error={error?.message}
            onChange={onChange}
            value={value}
            placeholder={t('product.namePlaceholder')}
            type="text"
            label={t('product.nameLabel')}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CategorySelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.categoryLabel')}
            placeholder={t('product.categoryPlaceholder')}
          />
        )}
      />
      <Controller
        control={control}
        name="manufacturerId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ManufacturerSelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.manufacturerLabel')}
            placeholder={t('product.manufacturerPlaceholder')}
          />
        )}
      />

      <Controller
        control={control}
        name="images"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputFile
            label={t('product.imagesLabel')}
            error={error?.message}
            id="file-upload"
            onFilesChange={onChange}
            value={value as any}
          />
        )}
      />
    </FormSection>
  )
}

export default ProductFormGeneral
