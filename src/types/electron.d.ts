interface PrintBarcodeParams {
  product: Product
  store: Store
  count: number
}

export interface IElectronAPI {
  printWindow: () => Promise<void>
  printThermal: (params: object) => Promise<void>
  printBarcode: (params: PrintBarcodeParams) => Promise<void>
  getPrinters: () => Promise<{ name: string }[]>
  listSerial: () => Promise<unknown[]>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
