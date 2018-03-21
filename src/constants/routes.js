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

import ProviderPage from '../containers/provider-page'
import ProvidersPage from '../containers/providers-page'
import ManufacturerPage from '../containers/manufacturer-page'
import ManufacturersPage from '../containers/manufacturers-page'
import InventoryPage from '../containers/inventory-page'
import InventoriesPage from '../containers/inventories-page'

export const routes = [
  {
    displayHome: true,
    image: barcodeScanner,
    inRouter: false,
    key: 'checkout',
    path: '/checkout',
  },
  {
    displayHome: true,
    image: warehouse,
    inRouter: false,
    key: 'articles',
    path: '/articles',
  },
  {
    displayHome: true,
    image: clipboard,
    inRouter: false,
    key: 'shippings',
    path: '/shippings',
  },
  {
    displayHome: true,
    image: delivery,
    inRouter: false,
    key: 'orders',
    path: '/orders',
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
    displayHome: true,
    image: users,
    inRouter: false,
    key: 'clients',
    path: '/clients',
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
    image: settings,
    inRouter: true,
    key: 'settings',
    path: '/settings',
  },
  {
    component: AccountPage,
    displayHome: false,
    image: flag,
    inRouter: true,
    key: 'account',
    path: '/account',
  },
]
