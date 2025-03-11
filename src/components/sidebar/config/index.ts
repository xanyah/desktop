import { isElectron } from '@/helpers/electron'
import { TFunction } from 'i18next'
import {
  Blend,
  ChartLine,
  Coins,
  CreditCard,
  Factory,
  Group,
  NotebookText,
  NotepadText,
  PackageOpen,
  ScanBarcode,
  Settings,
  Sparkles,
  Store,
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
      {
        icon: NotepadText,
        label: t('dailyReport.pageTitle'),
        url: '/daily-report',
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
        icon: PackageOpen,
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
        icon: Store,
        label: t('store.pageTitle'),
        url: '/store',
      },
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
      {
        icon: Settings,
        label: t('settings.pageTitle'),
        url: '/settings',
        disabled: !isElectron(),
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
