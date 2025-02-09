import {
  Button,
  FormContainer,
  FormSection,
  ReactSelect,
} from '../../components'

import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { find, map } from 'lodash'
import { useLocalStorage, usePrint, usePrinters } from '@/hooks'
import {
  pageSizeOptions,
  printerSchema,
  printerSchemaType,
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

  const { control, handleSubmit, reset } = useForm<printerSchemaType>({
    resolver: zodResolver(printerSchema),
    defaultValues: { name: '', pageSize: '' },
  })

  const { data: printers, isSuccess } = usePrinters()
  const { mutate: print } = usePrint()

  useEffect(() => {
    if (selectedPrinter && isSuccess) {
      const findPrinter = find(printers, p => p.name === selectedPrinter.name)
      if (findPrinter) {
        reset(selectedPrinter)
      }
      else {
        removePrinter()
      }
    }
  }, [isSuccess, selectedPrinter])

  const options = useMemo(() => {
    return printers
      ? map(printers, printer => ({
          value: printer.name,
          label: printer.name,
        }))
      : []
  }, [printers])

  const onSavePrinter = (data: printerSchemaType) => {
    setSelectedPrinter(data)
    toast.success(t('global.saved'))
  }

  const onPrintTest = () => {
    print(printTestData)
  }

  return (
    <FormContainer isNotForm title={t('settings.pageTitle')}>
      <FormSection title={t('settings.formSection')}>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSavePrinter)}
        >
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
        </form>
      </FormSection>
    </FormContainer>
  )
}

export default Settings
