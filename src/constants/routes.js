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

import HomePage from '../containers/home-page'
import ProviderPage from '../containers/provider-page'
import ProvidersPage from '../containers/providers-page'
import SettingsPage from '../containers/settings-page'
import SignInPage from '../containers/sign-in-page'

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
    displayHome: true,
    image: list,
    inRouter: false,
    key: 'inventories',
    path: '/inventories',
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
    displayHome: true,
    image: box,
    inRouter: false,
    key: 'manufacturers',
    path: '/manufacturers',
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
]
