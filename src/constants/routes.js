import {
  barcodeScanner,
  box,
  clipboard,
  delivery,
  deliveryTruck,
  flag,
  list,
  settings,
  users,
  warehouse,
} from '../images'

import AccountPage from '../containers/account-page'
import HomePage from '../containers/home-page'
import SettingsPage from '../containers/settings-page'
import SignInPage from '../containers/sign-in-page'
import CheckoutPage from '../containers/checkout-page'
import CustomAttributePage from '../containers/custom-attribute-page'
import ClientPage from '../containers/client-page'
import ClientsPage from '../containers/clients-page'
import ProviderPage from '../containers/provider-page'
import ProvidersPage from '../containers/providers-page'
import ManufacturerPage from '../containers/manufacturer-page'
import ManufacturersPage from '../containers/manufacturers-page'
import InventoryPage from '../containers/inventory-page'
import InventoriesPage from '../containers/inventories-page'
import ProductPage from '../containers/product-page'
import ProductsPage from '../containers/products-page'
import CreateProductPage from '../containers/create-product-page'
import VariantPage from '../containers/variant-page'
import OrderPage from '../containers/order-page'
import OrdersPage from '../containers/orders-page'
import ShippingPage from '../containers/shipping-page'
import ShippingsPage from '../containers/shippings-page'
import SalePage from '../containers/sale-page'
import SalesPage from '../containers/sales-page'

export const routes = [
  {
    component: CheckoutPage,
    displayHome: true,
    exact: true,
    image: barcodeScanner,
    inRouter: true,
    key: 'checkout',
    path: '/checkout',
    strict: true,
  },
  {
    component: ProductsPage,
    displayHome: true,
    exact: true,
    image: warehouse,
    inRouter: true,
    key: 'products',
    path: '/products',
    strict: true,
  },
  {
    component: ProductPage,
    displayHome: false,
    exact: true,
    image: warehouse,
    inRouter: true,
    key: 'product',
    path: '/products/:id',
    strict: true,
  },
  {
    component: CreateProductPage,
    displayHome: false,
    exact: true,
    image: warehouse,
    inRouter: true,
    key: 'product',
    path: '/product/new',
    strict: true,
  },
  {
    component: VariantPage,
    displayHome: false,
    exact: true,
    image: warehouse,
    inRouter: true,
    key: 'variant',
    path: '/products/:product_id/:variant_id',
    strict: true,
  },
  {
    component: ShippingsPage,
    displayHome: true,
    exact: true,
    image: clipboard,
    inRouter: true,
    key: 'shippings',
    path: '/shippings',
    strict: true,
  },
  {
    component: ShippingPage,
    displayHome: false,
    exact: true,
    image: clipboard,
    inRouter: true,
    key: 'shipping',
    path: '/shippings/:id',
    strict: true,
  },
  {
    component: OrdersPage,
    displayHome: true,
    exact: true,
    image: delivery,
    inRouter: true,
    key: 'orders',
    path: '/orders',
    strict: true,
  },
  {
    component: OrderPage,
    displayHome: false,
    exact: true,
    image: delivery,
    inRouter: true,
    key: 'order',
    path: '/orders/:id',
    strict: true,
  },
  {
    component: InventoriesPage,
    displayHome: true,
    exact: true,
    image: list,
    inRouter: true,
    key: 'inventories',
    path: '/inventories',
    strict: true,
  },
  {
    component: InventoryPage,
    displayHome: false,
    exact: true,
    image: list,
    inRouter: true,
    key: 'inventory',
    path: '/inventories/:id',
    strict: true,
  },
  {
    component: ClientsPage,
    displayHome: true,
    exact: true,
    image: users,
    inRouter: true,
    key: 'clients',
    path: '/clients',
    strict: true,
  },
  {
    component: ClientPage,
    displayHome: false,
    exact: true,
    image: users,
    inRouter: true,
    key: 'client',
    path: '/clients/:id',
    strict: true,
  },
  {
    component: ProvidersPage,
    displayHome: true,
    exact: true,
    image: deliveryTruck,
    inRouter: true,
    key: 'providers',
    path: '/providers',
    strict: true,
  },
  {
    component: ProviderPage,
    displayHome: false,
    exact: true,
    image: deliveryTruck,
    inRouter: true,
    key: 'provider',
    path: '/providers/:id',
    strict: true,
  },
  {
    component: ManufacturersPage,
    displayHome: true,
    exact: true,
    image: box,
    inRouter: true,
    key: 'manufacturers',
    path: '/manufacturers',
    strict: true,
  },
  {
    component: ManufacturerPage,
    displayHome: false,
    exact: true,
    image: box,
    inRouter: true,
    key: 'manufacturer',
    path: '/manufacturers/:id',
    strict: true,
  },
  {
    component: SignInPage,
    displayHome: false,
    inRouter: true,
    path: '/sign-in',
  },
  {
    component: HomePage,
    displayHome: false,
    inRouter: true,
    path: '/home',
  },
  {
    component: SettingsPage,
    displayHome: false,
    exact: true,
    image: settings,
    inRouter: true,
    key: 'settings',
    path: '/settings',
  },
  {
    component: CustomAttributePage,
    displayHome: false,
    exact: true,
    image: settings,
    inRouter: true,
    key: 'custom-attribute',
    path: '/settings/custom-attributes/:id',
  },
  {
    component: AccountPage,
    displayHome: false,
    image: flag,
    inRouter: true,
    key: 'account',
    path: '/account',
  },
  {
    component: SalesPage,
    displayHome: false,
    exact: true,
    image: barcodeScanner,
    inRouter: true,
    key: 'sales',
    path: '/sales',
    strict: true,
  },
  {
    component: SalePage,
    displayHome: false,
    exact: true,
    image: barcodeScanner,
    inRouter: true,
    key: 'sale',
    path: '/sales/:id',
    strict: true,
  },
]
