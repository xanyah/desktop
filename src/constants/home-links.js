import { barcodeScanner, box, clipboard, delivery, deliveryTruck, list, users, warehouse } from '../images'

export default [
  {
    image: barcodeScanner,
    key: 'checkout',
    url: '/checkout',
  },
  {
    image: warehouse,
    key: 'articles',
    url: '/articles',
  },
  {
    image: clipboard,
    key: 'shippings',
    url: '/shippings',
  },
  {
    image: delivery,
    key: 'orders',
    url: '/orders',
  },
  {
    image: list,
    key: 'inventories',
    url: '/inventories',
  },
  {
    image: users,
    key: 'clients',
    url: '/clients',
  },
  {
    image: deliveryTruck,
    key: 'providers',
    url: '/providers',
  },
  {
    image: box,
    key: 'manufacturers',
    url: '/manufacturers',
  },
]
