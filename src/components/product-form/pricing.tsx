import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ceil, isNumber, isUndefined, round } from 'lodash'
import { FormSection, InputText, VatRateSelect } from '@/components'
import { Controller, useFormContext } from 'react-hook-form'
import { Euro } from 'lucide-react'
import { formSchemaType } from './config'
import { useVatRate } from '@/hooks'
import { formatNumberInput, formatPriceCentsInput, formatPriceCentsInputValue } from '@/helpers/price'

const ProductFormPricing = () => {
  const { t } = useTranslation()
  const { control, setValue, watch } = useFormContext<Partial<formSchemaType>>()
  const vatRateId = watch('vatRateId')
  const ratioValue = watch('ratio')
  const buyingAmount = watch('buyingAmount')
  const ratioEnabled = watch('ratioEnabled')

  const { data: vatRateData } = useVatRate(vatRateId)

  const processedVatRate = useMemo(
    () => (vatRateData?.data.ratePercentCents || 0) / 10000,
    [vatRateData?.data],
  )

  const setPriceFromRatio = useCallback(() => {
    if (isUndefined(buyingAmount) || isNaN(buyingAmount) || !isNumber(ratioValue) || isNaN(ratioValue)) {
      return
    }

    const total = buyingAmount * ratioValue

    setValue('amount', round(total, 2))
    setValue('taxFreeAmount', round(ceil(total / (1 + processedVatRate), 2), 2))
  }, [buyingAmount, processedVatRate, setValue, ratioValue])

  const setPriceFromTaxFreePrice = useCallback(
    (value?: number | null) => {
      if (!value) {
        setValue('taxFreeAmount', undefined)
        setValue('amount', undefined)

        return
      }

      if (isNaN(value)) {
        return
      }

      setValue('taxFreeAmount', value)
      setValue('amount', ceil(value * (1 + processedVatRate), 2))
    },
    [processedVatRate, setValue],
  )

  const setTaxFreeFromPrice = useCallback(
    (value?: number | null) => {
      if (!value) {
        setValue('amount', undefined)
        setValue('taxFreeAmount', undefined)
        return
      }
      if (isNaN(value)) {
        return
      }

      setValue('amount', value)
      setValue('taxFreeAmount', ceil(value / (1 + processedVatRate), 2))
    },
    [processedVatRate, setValue],
  )

  useEffect(() => {
    if (ratioEnabled) {
      setPriceFromRatio()
    }
  }, [setPriceFromRatio, ratioEnabled])

  return (
    <FormSection title={t('product.pricing')}>
      <Controller
        control={control}
        name="buyingAmount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={<Euro />}
            step="0.1"
            type="number"
            hint={t('product.buyingAmountHint')}
            placeholder={t('product.buyingAmountPlaceholder')}
            label={t('product.buyingAmountLabel')}
            value={formatPriceCentsInputValue(value)}
            onChange={e => onChange(formatPriceCentsInput(e))}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vatRateId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <VatRateSelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.vatLabel')}
            placeholder={t('product.vatPlaceholder')}
          />
        )}
      />

      <Controller
        control={control}
        name="ratioEnabled"
        render={({ field: { onChange, value } }) => (
          <>
            <label className="flex flex-row gap-1 text-xs">
              <input
                type="checkbox"
                checked={value}
                onChange={e => onChange(e.target.checked)}
              />
              {t('product.ratioCheckbox')}
            </label>
          </>
        )}
      />

      {ratioEnabled && (
        <Controller
          control={control}
          name="ratio"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              step="0.1"
              type="number"
              hint={t('product.ratioHint')}
              placeholder={t('product.ratioPlaceholder')}
              label={t('product.ratioLabel')}
              value={value}
              onChange={e => onChange(formatNumberInput(e))}
              error={error?.message}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="taxFreeAmount"
        render={({ field: { value }, fieldState: { error } }) => (
          <InputText
            icon={<Euro />}
            step="0.1"
            type="number"
            hint={t('product.taxFreeAmountHint')}
            placeholder={t('product.taxFreeAmountPlaceholder')}
            label={t('product.taxFreeAmountLabel')}
            value={formatPriceCentsInputValue(value)}
            disabled={ratioEnabled}
            onChange={e => setPriceFromTaxFreePrice(formatPriceCentsInput(e))}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { value }, fieldState: { error } }) => (
          // TODO: Should be tax_free amount * category.vat_rate
          <InputText
            icon={<Euro />}
            step="0.1"
            type="number"
            hint={t('product.amountHint')}
            placeholder={t('product.amountPlaceholder')}
            label={t('product.amountLabel')}
            value={formatPriceCentsInputValue(value)}
            onChange={e => setTaxFreeFromPrice(formatPriceCentsInput(e))}
            error={error?.message}
          />
        )}
      />
    </FormSection>
  )
}

export default ProductFormPricing
