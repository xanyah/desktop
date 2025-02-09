import { PosPrintData } from 'electron-pos-printer'

export const printTestData = [
  {
    type: 'text',
    value: 'Titre',
    style: { fontWeight: '700', textAlign: 'center', fontSize: '24px' },
  }, {
    type: 'text',
    value: 'Description',
    style: { textDecoration: 'underline', fontSize: '10px', textAlign: 'center', color: 'red' },
  }, {
    type: 'barCode',
    value: '023456789010',
    height: 40,
    width: 2,
    displayValue: true,
    fontsize: 12,
  },
] as PosPrintData[]
