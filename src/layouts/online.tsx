import { Sidebar } from "@/components"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const Online = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Online
