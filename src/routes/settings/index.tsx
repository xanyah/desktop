import Select from 'react-select'
import { Button, FormContainer, FormSection } from '../../components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import { usePrinters } from '@/hooks'
import { useCallback, useMemo, useState } from 'react'
import { map } from 'lodash'
import { print } from 'tauri-plugin-printer-api'
import { Printer } from 'tauri-plugin-printer-api/dist/types'
import { invoke } from '@tauri-apps/api/core'

const Settings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('account.pageTitle') }])
  const [printer, setPrinter] = useState<{
    label: Printer['name']
    value: Printer['id']
  } | null>()
  const { data } = usePrinters()

  const options = useMemo(
    () => map(data, item => ({ label: item.name, value: item.id })),
    [data],
  )
  const [printers, setPrinters] = useState<string[]>([])

  const fetchPrinters = async () => {
    try {
      const response: Printer[] = await invoke('get_printers')
      console.log(response)
    } catch (error) {
      console.error('Erreur lors de la récupération des imprimantes :', error)
    }
  }

  const handlePrint = async () => {
    try {
      invoke('print_text')
    } catch (error) {
      console.error('Erreur lors de la récupération des imprimantes :', error)
    }
  }

  return (
    <FormContainer
      isNotForm
      title={t('account.pageTitle')}
      subtitle={t('account.pageSubtitle')}
    >
      <FormSection title={t('account.generalInformations')}>
        <Select options={options} onChange={setPrinter} value={printer} />
        <Button onClick={fetchPrinters}>Test</Button>
      </FormSection>
    </FormContainer>
  )
}

export default Settings
