export const isEditableEntity = (typeFormat) => {
  let isEditable = false

  typeFormat.map(row => {
    row.map(attribute => {
      if(attribute.editable === true)
        isEditable = true
    })
  })

  return isEditable
}
