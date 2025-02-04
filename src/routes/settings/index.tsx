import Select from 'react-select'
import { Button, FormContainer, FormSection } from '../../components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import { usePrinters } from '@/hooks'
import { useCallback, useMemo, useState } from 'react'
import { map } from 'lodash'
import { print } from 'tauri-plugin-printer-api'
import { Printer } from 'tauri-plugin-printer-api/dist/types'

const Settings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([
    { label: t('account.pageTitle') },
  ])
  const [printer, setPrinter] = useState<{ label: Printer['name'], value: Printer['id'] } | null>()
  const { data } = usePrinters()

  const options = useMemo(() => map(data, item => ({ label: item.name, value: item.id })), [data])

  const test = useCallback(async () => {
    if (!printer) {
      return
    }

    await print([
      {
        type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
        value: 'Text centré',
        style: { textDecoration: 'underline', fontSize: '10px', textAlign: 'center', color: 'red' },
      },
      {
        type: 'table',
        style: { border: '1px solid #ddd' }, // style the table
        // list of the columns to be rendered in the table header
        tableHeader: [{ type: 'text', value: 'People' }],
        // multi-dimensional array depicting the rows and columns of the table body
        tableBody: [
          [{ type: 'text', value: 'Marcus' }],
          [{ type: 'text', value: 'Boris' }],
          [{ type: 'text', value: 'Andrew' }],
          [{ type: 'text', value: 'Tyresse' }],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: [{ type: 'text', value: 'People' }],
        // custom style for the table header
        // custom style for the table body
        tableBodyStyle: { border: '0.5px solid #ddd' },
        // custom style for the table footer
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
      }, {
        type: 'barCode',
        value: '023456789010',
        height: 40, // height of barcode, applicable only to bar and QR codes
        width: 2, // width of barcode, applicable only to bar and QR codes
        displayValue: true, // Display value below barcode
        fontsize: 12,
      },
    ], {
      id: printer.value,
      remove_temp: true,
      page_size: {
        width: 300, // unit px
        height: 400,
      },
    })
  }, [printer])

  return (
    <FormContainer
      isNotForm
      title={t('account.pageTitle')}
      subtitle={t('account.pageSubtitle')}
    >
      <FormSection title={t('account.generalInformations')}>
        <Select
          options={options}
          onChange={setPrinter}
          value={printer}
        />
        <Button onClick={test}>Test</Button>
      </FormSection>
    </FormContainer>
  )
}

export default Settings
