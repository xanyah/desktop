import { Calendar, Factory, Group, Truck, Users } from "lucide-react"
import { Sidebar as ShadSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items = [
  {
    label: 'Your store',
    items: [
      {
        icon: Calendar,
        title: 'Checkout',
        url: '/checkout',
      },
      {
        icon: Calendar,
        title: 'Products',
        url: '/products',
      },
      {
        icon: Calendar,
        title: 'Shippings',
        url: '/shippings',
      },
      {
        icon: Calendar,
        title: 'Orders',
        url: '/orders',
      },
      {
        icon: Calendar,
        title: 'Inventories',
        url: '/inventories',
      },
      {
        icon: Users,
        title: 'Customers',
        url: '/clients',
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
        title: 'Settings',
        url: '/settings',
      },
      {
        icon: Calendar,
        title: 'Account',
        url: '/account',
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
          <SidebarGroup>
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
