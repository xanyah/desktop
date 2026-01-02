import {
  Button,
  FormContainer,
  FormSection,
  ReactSelect,
  VatRateSelect,
} from '../../components'

import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { find, map, pick } from 'lodash'
import { useLocalStorage, usePrint, usePrinters } from '@/hooks'
import {
  pageSizeOptions,
  settingsSchema,
  settingsSchemaType,
  printTestData,
} from './config'
import { zodResolver } from '@hookform/resolvers/zod'

const Settings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('settings.pageTitle') }])
  const [selectedPrinter, setSelectedPrinter, removePrinter] = useLocalStorage(
    'printer',
    undefined,
  )
  const [defaultVatRateId, setDefaultVatRateId] = useLocalStorage(
    'defaultVatRateId',
    undefined,
  )

  const { control, handleSubmit, setValue } = useForm<settingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: '', pageSize: '' },
  })

  const { data: printers, isSuccess } = usePrinters()
  const { mutate: print } = usePrint()

  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    if (selectedPrinter && isSuccess && initialRender) {
      const findPrinter = find(printers, p => p.name === selectedPrinter.name)
      if (findPrinter) {
        setValue('name', selectedPrinter.name)
        setValue('pageSize', selectedPrinter.pageSize)
      }
      else {
        removePrinter()
      }
      setInitialRender(false)
    }
  }, [
    isSuccess,
    selectedPrinter,
    printers,
    removePrinter,
    setValue,
    initialRender,
  ])

  const options = useMemo(() => {
    return printers
      ? map(printers, printer => ({
          value: printer.name,
          label: printer.name,
        }))
      : []
  }, [printers])

  const onSavePrinter = useCallback((data: settingsSchemaType) => {
    setSelectedPrinter(pick(data, ['name', 'pageSize']))
    setDefaultVatRateId(data.defaultVatRateId || undefined)
    toast.success(t('global.saved'))
  }, [setSelectedPrinter, setDefaultVatRateId, t])

  const onPrintTest = () => {
    print(printTestData)
  }

  useEffect(() => {
    setValue('defaultVatRateId', defaultVatRateId)
  }, [setValue, defaultVatRateId])

  return (
    <FormContainer isNotForm title={t('settings.pageTitle')}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSavePrinter)}>
        <FormSection title={t('settings.formSection')}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ReactSelect
                error={error?.message}
                onChange={item => onChange(item?.value)}
                value={{ value, label: value }}
                placeholder={t('settings.printerPlaceholder')}
                options={options}
                label={t('settings.printerLabel')}
              />
            )}
          />
          <Controller
            control={control}
            name="pageSize"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ReactSelect
                error={error?.message}
                onChange={item => onChange(item?.value)}
                value={{ value, label: value }}
                placeholder={t('settings.pageSizePrinterPlaceholder')}
                options={pageSizeOptions}
                label={t('settings.pageSizePrinterLabel')}
              />
            )}
          />

          <div className="flex gap-4 self-end">
            {selectedPrinter && (
              <Button variant="outline" type="button" onClick={onPrintTest}>
                {t('settings.testPrinter')}
              </Button>
            )}
            <Button type="submit">{t('global.save')}</Button>
          </div>
        </FormSection>
        <FormSection title={t('settings.formSection')}>

          <Controller
            control={control}
            name="defaultVatRateId"
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

          <div className="flex gap-4 self-end">
            <Button type="submit">{t('global.save')}</Button>
          </div>
        </FormSection>
      </form>
    </FormContainer>
  )
}

export default Settings
