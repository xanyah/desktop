import path from 'path'
import { app, BrowserWindow, ipcMain, screen } from 'electron'
const { PosPrinter } = require('electron-pos-printer')

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
  const mainScreen = screen.getPrimaryDisplay()
  const { width, height } = mainScreen.workAreaSize

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC || '', 'logo.svg'),
    width,
    height,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: true,
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
    win.loadFile(path.join(process.env.DIST || '', 'index.html'))
  }
}

ipcMain.handle('get-printers', async () => {
  if (!win) throw new Error('win not available')
  return win.webContents.getPrintersAsync()
})

ipcMain.handle('print', async (event, printData) => {
  const { data, printerName, pageSize } = printData
  const options = {
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
    console.log('Printing successful')
  } catch (error) {
    console.error('Error during print:', error)
    throw error
  }
})

app.on('window-all-closed', () => {
  app.quit()
  win = null
})

app.whenReady().then(createWindow)
