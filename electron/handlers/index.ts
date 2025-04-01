import { BrowserWindow, ipcMain } from "electron"
const { SerialPort } = require('serialport')
const { PosPrinter } = require('electron-pos-printer')

export const registerHandlers = (app: Electron.App, window: BrowserWindow | null) => {
  ipcMain.handle('get-printers', async () => {
    if (!window) throw new Error('win not available')
    return window.webContents.getPrintersAsync()
  })

  ipcMain.handle('print:thermal', async (event, printData) => {
    const { data, printerName, pageSize } = printData
    const options = {
      boolean: false,
      preview: !app.isPackaged,
      margin: '0 0 0 0',
      copies: 1,
      printerName,
      timeOutPerLine: 400,
      silent: true,
      pageSize,
    }

    try {
      await PosPrinter.print(data, options)
    } catch (error) {
      console.error('Error during print:', error)
      throw error
    }
  })

  ipcMain.handle('print:barcode', (event, { product, store, count }) => {
    /**
     * Indent code: 250
     */
    return new Promise<void>((resolve, reject) => {
      try {
        const instruction = '\nN\nB270,100,0,E30,2,24,54,B,"' + product.sku.trim() + '"\n' +
          'A270,05,0,4,1,1,N,"' + product.amountCents / 100 + ' E"\n' +
          'A270,55,0,2,1,1,N,"' + product.name + '"\n' +
          'A270,75,0,2,1,1,N,"' + product.manufacturerSku + '"\n' +
          'A240,30,1,4,1,1,N,"' + store.name + '"\n' +
          'P' + count + ',1\n';

        const serialPort = new SerialPort({ path: 'COM2', baudRate: 9600 })
        serialPort.write(instruction, (err) => {
          if (err) {
            return reject(err)
          }

          serialPort.close()

          resolve()
        })
      } catch (err) {
        reject(err)
      }
    })
  })

  ipcMain.handle('serial:list', SerialPort.list)

  ipcMain.handle('print:window', (e) => {
    let window = BrowserWindow.fromWebContents(e.sender);

    if (window) {
      window.webContents.print({})
    }
  });
}
