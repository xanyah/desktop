const { createWindowsInstaller } = require('electron-winstaller')

createWindowsInstaller({
  appDirectory: 'builds/Xanyah-win32-x64',
  authors: 'Xanyah Team',
  exe: 'xanyah.exe',
  noMsi: false,
  outputDirectory: 'installers/builds',
  setupExe: 'InstallXanyah.exe',
})
  .then(() => console.log("It worked!"))
  .catch(e => console.error(e))
