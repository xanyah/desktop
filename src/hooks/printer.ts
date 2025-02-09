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
  const [printerName] = useLocalStorage(
    'printer',
    undefined,
  )
  return useMutation({
    mutationFn: async (data: PosPrintData[]) => {
      await window.electronAPI.print({ printerName, data })
    },
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
