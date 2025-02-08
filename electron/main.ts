import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { printer as ThermalPrinter, types as PrinterTypes } from 'node-thermal-printer';


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
  try {
    const printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: `COM3`,
    })

    const isConnected = await printer.isPrinterConnected();
    console.log('Printer connected:', isConnected);

    if (!isConnected) {
      throw new Error('Imprimante non connectée');
    }

    printer.alignCenter()
    printer.println('Bonjour, ceci est un test')
    printer.println('-----------------------------')
    printer.println('Merci pour votre visite !')
    printer.cut()

    await printer.execute()
    return 'Impression réussie'
  }
  catch (error) {
    throw new Error(`Erreur lors de l'impression: ${error.message}`)
  }
})

app.on('window-all-closed', () => {
  app.quit()
  win = null
})

app.whenReady().then(createWindow)
