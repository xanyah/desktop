import React from 'react'

const PrintComponent = () => {
  const handlePrint = async () => {
    const data = [
      {
        type: 'text',
        value: "test d'impression",
        style: 'text-align:center; font-size: 20px; font-weight: bold;',
      },
      {
        type: 'barCode',
        value: '123456789',
        height: 40,
        width: 2,
        displayValue: true,
        fontsize: 12,
      },
    ]

    const options = {
      preview: false,
      width: '170px',
      margin: '0 0 0 0',
      copies: 1,
      printerName: 'Microsoft Print to PDF',
      timeOutPerLine: 400,
      silent: true,
    }

    try {
      const result = await window.electronAPI.print(data, options)
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
