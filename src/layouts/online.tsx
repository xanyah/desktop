import { Sidebar } from "@/components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BreadCrumbContext } from "@/contexts"
import { map } from "lodash"
import { useState } from "react"
import { Outlet } from "react-router-dom"

const Online = () => {
  const [breadcrumb, setBreadcrumb] = useState<BreadCrumbElement[]>([])

  return (
    <SidebarProvider>
      <Sidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {map(breadcrumb, element => (
              <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
              {element.url
                ? <BreadcrumbLink to={element.url}>{element.label}</BreadcrumbLink>
                : <BreadcrumbPage>{element.label}</BreadcrumbPage>}
              </BreadcrumbItem>
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4">
        <BreadCrumbContext.Provider value={setBreadcrumb}>
          <Outlet />
        </BreadCrumbContext.Provider>
      </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Online
