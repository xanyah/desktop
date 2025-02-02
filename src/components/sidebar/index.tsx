import { Blend, ChartLine, Coins, CreditCard, Factory, Group, NotebookText, ScanBarcode, Sparkles, Truck, User, Users } from 'lucide-react'
import { Sidebar as ShadSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useCurrentStoreRole } from '@/hooks'
import { map, sortBy } from 'lodash'

const Sidebar = () => {
  const { t } = useTranslation()
  const role = useCurrentStoreRole()
  const items = useMemo(() => [
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
  ], [role, t])

  return (
    <ShadSidebar>
      <SidebarContent>
        {items.map(group => (
          group.disabled
          ? null
          : (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {map(sortBy(group.items, 'label'), item => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>)))}
      </SidebarContent>
    </ShadSidebar>
  )
}

export default Sidebar
