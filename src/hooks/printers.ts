import { isTauri } from '@/helpers/tauri'
import { useQuery } from '@tanstack/react-query'
import { printers } from 'tauri-plugin-printer-api'

export const usePrinters = () => useQuery({
  queryKey: ['printers'],
  enabled: isTauri,
  queryFn: () => printers(),
})
