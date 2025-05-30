import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import useLocalStorage from './local-storage'
import { PosPrintData } from 'electron-pos-printer'

export const usePrinters = () => useQuery({
  queryFn: async () => {
    return await window.electronAPI.getPrinters()
  },
  queryKey: ['printers'],
})

export const usePrint = () => {
  const { t } = useTranslation()
  const toastId = useRef<string>(null)
  const [printer] = useLocalStorage(
    'printer',
    undefined,
  )
  return useMutation({
    mutationFn: (data: PosPrintData[]) =>
      window.electronAPI.printThermal({ printerName: printer.printerName, pageSize: printer.pageSize, data }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: () => {
      toast.success(t('settings.printSuccess'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('settings.printError'), { id: toastId?.current || undefined })
    },
  })
}
