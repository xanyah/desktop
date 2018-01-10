import { barcodeScanner, warehouse, list, delivery, clipboard, deliveryTruck, box, users } from '../images'

export default [
  {
    key: "checkout",
    url: "/checkout",
    image: barcodeScanner,
  },
  {
    key: "articles",
    url: "/articles",
    image: warehouse,
  },
  {
    key: "shippings",
    url: "/shippings",
    image: clipboard,
  },
  {
    key: "orders",
    url: "/orders",
    image: delivery,
  },
  {
    key: "inventories",
    url: "/inventories",
    image: list,
  },
  {
    key: "clients",
    url: "/clients",
    image: users,
  },
  {
    key: "providers",
    url: "/providers",
    image: deliveryTruck,
  },
  {
    key: "manufacturers",
    url: "/manufacturers",
    image: box,
  },
]
