import { Breadcrumb, Sidebar } from '@/components'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { BreadCrumbContext } from '@/contexts'
import { useCurrentUser } from '@/hooks'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'

const Online = () => {
  const { isLoading, isError } = useCurrentUser()
  const navigate = useNavigate()
  const [breadcrumb, setBreadcrumb] = useState<BreadCrumbElement[]>([])

  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/sign-in')
    }
  }, [isLoading, isError, navigate])

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb breadcrumb={breadcrumb} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-8 mx-auto w-full">
          <BreadCrumbContext.Provider value={setBreadcrumb}>
            <Outlet />
          </BreadCrumbContext.Provider>
        </main>
        <Toaster position="bottom-right" />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Online
