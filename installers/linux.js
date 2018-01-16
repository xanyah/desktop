const installer = require('electron-installer-debian')

const options = {
  arch: 'amd64',
  dest: 'installers/builds',
  options: {
    bin: 'xanyah',
    categories: [
      'Utility',
    ],
    homepage: 'http://xanyah.io',
    name: 'xanyah',
    productName: 'Xanyah',
  },
  src: 'builds/Xanyah-linux-x64/',
}

console.log('Creating package (this may take a while)')

installer(options, err => {
  if (err) {
    console.error(err, err.stack)
    process.exit(1)
  }

  console.log('Successfully created package at ' + options.dest)
})
