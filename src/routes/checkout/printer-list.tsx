import React, { useEffect, useState } from 'react'

const PrinterList = () => {
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const printers = await window.electronAPI.getPrinters()
        setPrinters(printers)
      } catch (error) {
        console.error('Erreur lors de la récupération des imprimantes:', error)
      }
    }

    fetchPrinters()
  }, [])

  return (
    <div>
      <h2>Imprimantes disponibles</h2>
      <ul>
        {printers.map((printer, index) => (
          <li key={index}>{printer.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PrinterList
