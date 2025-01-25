import CreateProductPage from '../components/create-product-page'
// import VariantPage from '../components/variant-page'
import {
  warehouse,
} from '../images'


export const routes = [
  {
    element: <CreateProductPage />,
    displayHome: false,
    exact: true,
    image: warehouse,
    inRouter: true,
    key: 'product',
    path: '/product/new',
    strict: true,
  },
  // {
  //   element: <VariantPage />,
  //   displayHome: false,
  //   exact: true,
  //   image: warehouse,
  //   inRouter: true,
  //   key: 'variant',
  //   path: '/products/:product_id/:variant_id',
  //   strict: true,
  // },
]
