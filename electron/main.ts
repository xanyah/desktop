import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { printer as ThermalPrinter, types as PrinterTypes } from 'node-thermal-printer'

import electronDriver from 'electron-printer'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  }
  else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

ipcMain.handle('get-printers', async () => {
  if (!win) throw new Error('win not available')
  return win.webContents.getPrintersAsync()
})

ipcMain.handle('print', async () => {
  const options = {
    preview: true,
    margin: '0 0 0 0',
    copies: 1,
    printerName: 'EPSON TM-T88IV ReceiptE4',
    timeOutPerLine: 400,
    silent: true,
    pageSize: '80mm', // page size
  }

  const data = [
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: 'SAMPLE HEADING',
      style: { fontWeight: '700', textAlign: 'center', fontSize: '24px' },
    }, {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: 'Secondary text',
      style: { textDecoration: 'underline', fontSize: '10px', textAlign: 'center', color: 'red' },
    }, {
      type: 'barCode',
      value: '023456789010',
      height: 40, // height of barcode, applicable only to bar and QR codes
      width: 2, // width of barcode, applicable only to bar and QR codes
      displayValue: true, // Display value below barcode
      fontsize: 12,
    },
  ]

  PosPrinter.print(data, options)
    .then(console.log)
    .catch((error) => {
      console.error(error)
    })
})

app.on('window-all-closed', () => {
  app.quit()
  win = null
})

app.whenReady().then(createWindow)
