import { useQuery } from "@tanstack/react-query";
import { printers } from "tauri-plugin-printer-api";

export const usePrinters = () => useQuery({
  queryKey: ['printers'],
  queryFn: () => printers(),
})
