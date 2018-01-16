var createDMG = require('electron-installer-dmg')

createDMG({
  appPath: './builds/Xanyah-darwin-x64/Xanyah.app',
  name: 'Xanyah',
  out: './installers/builds',
}, err => console.log(err))
