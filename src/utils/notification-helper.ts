import Toasted from 'toastedjs'

// export const showInfoToast = text => {
//   const toasted = new Toasted({
//     duration: 3000,
//     position: 'bottom-right',
//     type: 'info',
//   })
//   toasted.show(text)
// }

export const showSuccessToast = text => {
  const toasted = new Toasted({
    duration: 3000,
    position: 'bottom-right',
    type: 'success',
  })
  toasted.show(text)
}

export const showErrorToast = text => {
  const toasted = new Toasted({
    duration: 3000,
    position: 'bottom-right',
    type: 'error',
  })
  toasted.show(text)
}
