'use strict'

// Import parts of electron to use
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Keep a reference for dev mode
let dev = false
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 940,
    icon: 'src/images/box.png',
    minHeight: 940,
    minWidth: 1340,
    show: false,
    title: 'Xanyah',
    titleBarStyle: 'hiddenInset',
    width: 1340,
  })

  // and load the index.html of the app.
  let indexPath
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      host: 'localhost:8080',
      pathname: 'index.html',
      protocol: 'http:',
      slashes: true,
    })
  } else {
    indexPath = url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  }
  mainWindow.loadURL( indexPath )

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // Open the DevTools automatically if developing
    if ( dev ) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('get-locale', (event) => {
  event.returnValue = app.getLocale()
})

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false
  }

  const ChildProcess = require('child_process')
  const path = require('path')

  const appFolder = path.resolve(process.execPath, '..')
  const rootAtomFolder = path.resolve(appFolder, '..')
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
  const exeName = path.basename(process.execPath)

  const spawn = function(command, args) {
    let spawnedProcess

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {
      console.log(error)
    }

    return spawnedProcess
  }

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args)
  }

  const squirrelEvent = process.argv[1]
  switch (squirrelEvent) {
  case '--squirrel-install':
  case '--squirrel-updated':
    // Optionally do things such as:
    // - Add your .exe to the PATH
    // - Write to the registry for things like file associations and
    //   explorer context menus

    // Install desktop and start menu shortcuts
    spawnUpdate(['--createShortcut', exeName])

    setTimeout(app.quit, 1000)
    return true

  case '--squirrel-uninstall':
    // Undo anything you did in the --squirrel-install and
    // --squirrel-updated handlers

    // Remove desktop and start menu shortcuts
    spawnUpdate(['--removeShortcut', exeName])

    setTimeout(app.quit, 1000)
    return true

  case '--squirrel-obsolete':
    // This is called on the outgoing version of your app before
    // we update to the new version - it's the opposite of
    // --squirrel-updated

    app.quit()
    return true
  }
}
