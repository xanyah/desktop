import { AsyncReactSelect, Button, FormContainer } from '../../components'

import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { find, map } from 'lodash'
import { useLocalStorage } from '@/hooks'

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

  const loadOptions = useCallback(async () => {
    const printers = await window.electronAPI.getPrinters()

    if (selectedPrinter) {
      const findPrinter = find(printers, p => p.name === selectedPrinter)
      if (findPrinter) {
        reset({ printer: findPrinter.name })
      } else {
        removePrinter()
      }
    }

    return map(printers, p => ({ value: p.name, label: p.name }))
  }, [selectedPrinter])

  const onSavePrinter = (data: PrinterFormProps) => {
    setSelectedPrinter(data.printer)
    toast.success(t('global.saved'))
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
        <div className="flex gap-4 self-end">
          {selectedPrinter && (
            <Button variant="outline">{t('settings.testPrinter')}</Button>
          )}
          <Button type="submit">{t('global.save')}</Button>
        </div>
      </form>
    </FormContainer>
  )
}

export default Settings
