//File System Module
// TODO: Check if we can use import instead of require
// const fs = require('fs')
// dialog module
// const {dialog} = require('electron').remote

export const test = () => {

  // dialog.showOpenDialog((fileNames) => {
  //   // fileNames is an array that contains all the selected
  //   if(fileNames === undefined){
  //     alert('No file selected')
  //     return
  //   }

  //   fs.readFile(fileNames[0], 'utf-8', (err, data) => {
  //     if(err){
  //       alert('An error ocurred reading the file :' + err.message)
  //       return
  //     }

  //     let blob = new Blob([data], {type : 'text/csv'})
  //     let form = new FormData()
  //     form.append('file', blob)
  //     form.append('store_id', storeId)

  //     // console.log(form)
  //     postFileImports(form)

  //     // TODO: Then manage JSON (depending on file extension)
  //   })
  // })
}
