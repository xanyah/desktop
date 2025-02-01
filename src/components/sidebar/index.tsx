import { Blend, ChartLine, Coins, Factory, Group, NotebookText, ScanBarcode, Sparkles, Truck, User, Users } from "lucide-react"
import { Sidebar as ShadSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

const items = [
  {
    i18nKey: 'sidebar.store',
    items: [
      {
        icon: Coins,
        i18nKey: 'checkout.pageTitle',
        url: '/checkout',
      },
      {
        icon: Users,
        i18nKey: 'customers.pageTitle',
        url: '/customers',
      },
      {
        icon: NotebookText,
        i18nKey: 'orders.pageTitle',
        url: '/orders',
      },
      {
        icon: ChartLine,
        i18nKey: 'sales.pageTitle',
        url: '/sales',
      },
    ]
  },
  {
    i18nKey: 'sidebar.stock',
    items: [
      {
        icon: Blend,
        i18nKey: 'products.pageTitle',
        url: '/products',
      },
      {
        icon: Factory,
        i18nKey: 'manufacturers.pageTitle',
        url: '/manufacturers',
      },
      {
        icon: Truck,
        i18nKey: 'providers.pageTitle',
        url: '/providers',
      },
      {
        icon: ScanBarcode,
        i18nKey: 'inventories.pageTitle',
        url: '/inventories',
      },
      {
        icon: Truck,
        i18nKey: 'shippings.pageTitle',
        url: '/shippings',
      },
    ]
  },
  {
    i18nKey: 'sidebar.settings',
    items: [
      {
        icon: Sparkles,
        i18nKey: 'customAttributes.pageTitle',
        url: '/custom-attributes'
      },
      {
        icon: Group,
        i18nKey: 'categories.pageTitle',
        url: "/categories"
      },
    ]
  },
  {
    i18nKey: 'sidebar.account',
    items: [
      {
        icon: User,
        i18nKey: 'account.pageTitle',
        url: '/account',
      },
    ]
  }
]

const Sidebar = () => {
  const {t} = useTranslation()
  return (
    <ShadSidebar>
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.i18nKey}>
            <SidebarGroupLabel>{t(group.i18nKey)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.i18nKey}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{t(item.i18nKey)}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>))}
      </SidebarContent>
    </ShadSidebar>
  )
}

export default Sidebar
