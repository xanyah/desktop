import { Blend, ChartLine, Coins, Factory, Group, NotebookText, ScanBarcode, Truck, User, Users } from "lucide-react"
import { Sidebar as ShadSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items = [
  {
    label: 'Boutique',
    items: [
      {
        icon: Coins,
        title: 'Caisse',
        url: '/checkout',
      },
      {
        icon: Users,
        title: 'Clients',
        url: '/customers',
      },
      {
        icon: NotebookText,
        title: 'Commandes',
        url: '/orders',
      },
      {
        icon: ChartLine,
        title: 'Ventes',
        url: '/sales',
      },
    ]
  },
  {
    label: 'Stock',
    items: [
      {
        icon: Blend,
        title: 'Articles',
        url: '/products',
      },
      {
        icon: ScanBarcode,
        title: 'Inventaires',
        url: '/inventories',
      },
      {
        icon: Truck,
        title: 'Livraisons',
        url: '/shippings',
      },
    ]
  },
  {
    label: 'Paramètres',
    items: [
      {
        icon: Group,
        title: 'Catégories',
        url: "/categories"
      },
      {
        icon: Factory,
        title: 'Fabricants',
        url: '/manufacturers',
      },
      {
        icon: Truck,
        title: 'Fournisseurs',
        url: '/providers',
      },
    ]
  },
  {
    label: 'Mon compte',
    items: [
      {
        icon: User,
        title: 'Paramètres',
        url: '/account',
      },
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
