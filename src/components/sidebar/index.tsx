import { Blend, Calendar, Coins, Factory, Group, ScanBarcode, Truck, User, Users } from "lucide-react"
import { Sidebar as ShadSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items = [
  {
    label: 'Your store',
    items: [
      {
        icon: Coins,
        title: 'Checkout',
        url: '/checkout',
      },
      {
        icon: Blend,
        title: 'Products',
        url: '/products',
      },
      {
        icon: Truck,
        title: 'Shippings',
        url: '/shippings',
      },
      {
        icon: Calendar,
        title: 'Orders',
        url: '/orders',
      },
      {
        icon: ScanBarcode,
        title: 'Inventories',
        url: '/inventories',
      },
      {
        icon: Users,
        title: 'Customers',
        url: '/customers',
      },
      {
        icon: Truck,
        title: 'Providers',
        url: '/providers',
      },
      {
        icon: Factory,
        title: 'Manufacturers',
        url: '/manufacturers',
      },
      {
        icon: Calendar,
        title: 'Sales',
        url: '/sales',
      },
    ]
  },
  {
    label: 'Settings',
    items: [
      {
        icon: User,
        title: 'Account',
        url: '/account',
      },
      {
        icon: Group,
        title: 'Categories',
        url: "/categories"
      }
    ]
  }
]

const Sidebar = () => {
  return (
    <ShadSidebar>
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
