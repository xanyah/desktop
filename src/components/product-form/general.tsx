import { useTranslation } from 'react-i18next'
import {
  Button,
  CategorySelect,
  FormSection,
  InputFile,
  InputText,
  InputHtml,
  ManufacturerSelect,
} from '@/components'
import { Controller, useFormContext } from 'react-hook-form'
import { formSchemaType } from './config'
import { useMutation } from '@tanstack/react-query'
import { getAiSuggestions } from '@/api'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const ProductFormGeneral = () => {
  const { t } = useTranslation()
  const { control, watch, setValue } = useFormContext<formSchemaType>()
  const { id: productId } = useParams()
  const parentCategoryId = watch('categoryId')

  const { mutate: generateSuggestions, isPending: isGenerating } = useMutation({
    mutationFn: () => getAiSuggestions(productId!),
    onSuccess: (response) => {
      const { title, description } = response.data

      if (!title && !description) {
        toast.error(t('product.aiSuggestionsNoResults'))
        return
      }

      if (title) {
        setValue('name', title)
        toast.success(t('product.titleSuggested'))
      }

      if (description) {
        setValue('description', description)
        toast.success(t('product.descriptionGenerated'))
      }

      if (title && description) {
        toast.success(t('product.aiSuggestionsApplied'))
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || t('product.aiSuggestionsError')
      toast.error(errorMessage)
    },
  })

  const handleGenerateSuggestions = () => {
    if (!productId) {
      toast.error(t('product.saveProductFirst'))
      return
    }
    generateSuggestions()
  }

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

      <div>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputHtml
              error={error?.message}
              onChange={onChange}
              value={value}
              label={t('product.descriptionLabel')}
            />
          )}
        />
        {productId && (
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateSuggestions}
            disabled={isGenerating}
            className="mt-2"
          >
            {isGenerating ? t('product.generatingAiSuggestions') : t('product.getAiSuggestions')}
          </Button>
        )}
      </div>

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
            noSubcategories
          />
        )}
      />

      {parentCategoryId && (
        <Controller
          control={control}
          name="subCategoryId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CategorySelect
              key={parentCategoryId}
              error={error?.message}
              onChange={onChange}
              value={value}
              label={t('product.subCategoryLabel')}
              placeholder={t('product.subCategoryPlaceholder')}
              categoryId={parentCategoryId}
            />
          )}
        />
      )}

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
