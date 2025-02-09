import { AsyncReactSelect, Button, FormContainer } from '../../components'

import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { find, map } from 'lodash'

interface PrinterFormProps {
  printer: string
}

const Settings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('settings.pageTitle') }])

  const { control, handleSubmit, reset } = useForm<PrinterFormProps>({
    defaultValues: { printer: '' },
  })

  const loadOptions = useCallback(async () => {
    const printers = await window.electronAPI.getPrinters()

    const selectedPrinter = localStorage.getItem('printer')

    if (selectedPrinter) {
      const findPrinter = find(printers, p => p.name === selectedPrinter)
      if (findPrinter) {
        reset({ printer: findPrinter.name })
      } else {
        localStorage.removeItem('printer')
      }
    }

    return map(printers, p => ({ value: p.name, label: p.name }))
  }, [])

  const onSavePrinter = (data: PrinterFormProps) => {
    localStorage.setItem('printer', data.printer)
  }

  return (
    <FormContainer isNotForm title={t('settings.pageTitle')}>
      <form onSubmit={handleSubmit(onSavePrinter)}>
        <Controller
          control={control}
          name="printer"
          render={({ field: { onChange, value } }) => (
            <AsyncReactSelect
              cacheOptions
              defaultOptions
              onChange={item => onChange(item?.value)}
              value={{ value, label: value }}
              placeholder={t('settings.printerPlaceholder')}
              loadOptions={loadOptions}
              label={t('settings.printerLabel')}
            />
          )}
        />

        <Button className="self-end" type="submit">
          {t('global.save')}
        </Button>
      </form>
    </FormContainer>
  )
}

export default Settings
