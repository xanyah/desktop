import { useTranslation } from 'react-i18next'
import {
  Button,
  FormSection,
  InputText,
} from '@/components'
import { Controller, useFormContext } from 'react-hook-form'
import { formSchemaType } from './config'
import { useCallback } from 'react'
import { captureException } from '@sentry/react'
import { getNextProductSku } from '@/api'
import { useCurrentStore } from '@/hooks'
import { Copy, RefreshCcw } from 'lucide-react'

const ProductFormLogistics = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const { control, setValue, watch } = useFormContext<formSchemaType>()

  const copyUpc = useCallback(() => {
    setValue('sku', watch('upc'))
  }, [setValue, watch])

  const generateSku = useCallback(async () => {
    try {
      const { data } = await getNextProductSku({ storeId: store?.id })
      setValue('sku', data.nextSku.toString())
    }
    catch (err) {
      captureException(err)
    }
  }, [store, setValue])

  return (
    <FormSection title={t('product.logistics')}>
      <Controller
        control={control}
        name="manufacturerSku"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            hint={t('product.manufacturerSkuHint')}
            error={error?.message}
            onChange={onChange}
            value={value}
            placeholder={t('product.manufacturerSkuPlaceholder')}
            type="text"
            label={t('product.manufacturerSkuLabel')}
          />
        )}
      />

      <Controller
        control={control}
        name="upc"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            hint={t('product.upcHint')}
            error={error?.message}
            onChange={onChange}
            value={value}
            placeholder={t('product.upcPlaceholder')}
            type="text"
            label={t('product.upcLabel')}
          />
        )}
      />

      <div className="flex flex-row gap-4">
        <Controller
          control={control}
          name="sku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              hint={t('product.skuHint')}
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('product.skuPlaceholder')}
              type="text"
              label={t('product.skuLabel')}
            />
          )}
        />
        <div className="flex flex-row gap-2 pt-5">
          <Button type="button" variant="outline" onClick={copyUpc}>
            <Copy />
            {t('product.copyUpcToSku')}
          </Button>
          <Button type="button" variant="outline" onClick={generateSku}>
            <RefreshCcw />
            {t('product.generateSku')}
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default ProductFormLogistics
