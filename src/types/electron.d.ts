export interface IElectronAPI {
  print: (params: object) => Promise<void>
  getPrinters: () => Promise<{ name: string }[]>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
