import React from 'react'

const PrintComponent = () => {
  const handlePrint = async () => {
    const printerName = 'Microsoft Print to PDF'

    try {
      const result = await window.electronAPI.print(printerName)
      console.log(result)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <button onClick={handlePrint}>Imprimer</button>
    </div>
  )
}

export default PrintComponent
