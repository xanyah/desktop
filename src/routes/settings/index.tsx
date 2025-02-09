import { Button, FormContainer, ReactSelect } from '../../components'

import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { find, map } from 'lodash'
import { useLocalStorage, usePrint, usePrinters } from '@/hooks'
import { printTestData } from './config'

interface PrinterFormProps {
  printer: string
}

const Settings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('settings.pageTitle') }])
  const [selectedPrinter, setSelectedPrinter, removePrinter] = useLocalStorage(
    'printer',
    undefined,
  )

  const { control, handleSubmit, reset } = useForm<PrinterFormProps>({
    defaultValues: { printer: '' },
  })

  const { data: printers, isSuccess } = usePrinters()
  const { mutate: print } = usePrint()

  useEffect(() => {
    if (selectedPrinter && isSuccess) {
      const findPrinter = find(printers, p => p.name === selectedPrinter)
      if (findPrinter) {
        reset({ printer: findPrinter.name })
      } else {
        removePrinter()
      }
    }
  }, [isSuccess, selectedPrinter])

  const options = useMemo(() => {
    return printers
      ? printers.map(printer => ({
          value: printer.name,
          label: printer.name,
        }))
      : []
  }, [printers])

  const onSavePrinter = (data: PrinterFormProps) => {
    setSelectedPrinter(data.printer)
    toast.success(t('global.saved'))
  }

  const onPrintTest = () => {
    print(printTestData)
  }

  return (
    <FormContainer isNotForm title={t('settings.pageTitle')}>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSavePrinter)}
      >
        <Controller
          control={control}
          name="printer"
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              onChange={item => onChange(item?.value)}
              value={{ value, label: value }}
              placeholder={t('settings.printerPlaceholder')}
              options={options}
              label={t('settings.printerLabel')}
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
    </FormContainer>
  )
}

export default Settings
