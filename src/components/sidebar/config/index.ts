import { TFunction } from 'i18next'
import {
  Blend,
  ChartLine,
  Coins,
  CreditCard,
  Factory,
  Group,
  NotebookText,
  ScanBarcode,
  Sparkles,
  Truck,
  User,
  Users,
} from 'lucide-react'

export const getItems = (t: TFunction, role: StoreMembership['role']) => [
  {
    label: t('sidebar.store'),
    items: [
      {
        icon: Coins,
        label: t('checkout.pageTitle'),
        url: '/checkout',
      },
      {
        icon: Users,
        label: t('customers.pageTitle'),
        url: '/customers',
      },
      {
        icon: NotebookText,
        label: t('orders.pageTitle'),
        url: '/orders',
      },
      {
        icon: ChartLine,
        label: t('sales.pageTitle'),
        url: '/sales',
      },
    ],
  },
  {
    label: t('sidebar.stock'),
    items: [
      {
        icon: Blend,
        label: t('products.pageTitle'),
        url: '/products',
      },
      {
        icon: Factory,
        label: t('manufacturers.pageTitle'),
        url: '/manufacturers',
      },
      {
        icon: Truck,
        label: t('providers.pageTitle'),
        url: '/providers',
      },
      {
        icon: ScanBarcode,
        label: t('inventories.pageTitle'),
        url: '/inventories',
      },
      {
        icon: Truck,
        label: t('shippings.pageTitle'),
        url: '/shippings',
      },
    ],
  },
  {
    label: t('sidebar.settings'),
    disabled: role === 'regular',
    items: [
      {
        icon: Sparkles,
        label: t('customAttributes.pageTitle'),
        url: '/custom-attributes',
      },
      {
        icon: Group,
        label: t('categories.pageTitle'),
        url: '/categories',
      },
      {
        icon: CreditCard,
        label: t('paymentTypes.pageTitle'),
        url: '/payment-types',
      },
    ],
  },
  {
    label: t('sidebar.account'),
    items: [
      {
        icon: User,
        label: t('account.pageTitle'),
        url: '/account',
      },
    ],
  },
]
