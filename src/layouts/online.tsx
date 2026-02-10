import { useState, useEffect } from 'react'
import { Breadcrumb, Separator, Sidebar } from '@/components'
import { BreadCrumbContext } from '@/contexts'
import { useCurrentUser } from '@/hooks'
import { Toaster } from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  OnlineContainer,
  ContentContainer,
  Header,
  MainContent,
  HeaderContainer,
  StyledButton,
} from './styles'
import { PanelLeft, ArrowLeft } from 'lucide-react'

const Online = () => {
  const { isLoading, isError } = useCurrentUser()
  const navigate = useNavigate()
  const [breadcrumb, setBreadcrumb] = useState<BreadCrumbElement[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/sign-in')
    }
  }, [isLoading, isError, navigate])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <OnlineContainer>
      <Sidebar isOpen={isSidebarOpen} />
      <ContentContainer $isSidebarOpen={isSidebarOpen}>
        <Header>
          <HeaderContainer>
            <StyledButton size="sm" variant="ghost" onClick={toggleSidebar}>
              <PanelLeft size={16} />
            </StyledButton>
            <StyledButton size="sm" variant="ghost" onClick={goBack}>
              <ArrowLeft size={16} />
            </StyledButton>
            <Separator classname="h-4" orientation="vertical" />
            <Breadcrumb breadcrumb={breadcrumb} />
          </HeaderContainer>
        </Header>
        <MainContent>
          <BreadCrumbContext.Provider value={setBreadcrumb}>
            <Outlet />
          </BreadCrumbContext.Provider>
        </MainContent>
        <Toaster position="bottom-right" />
      </ContentContainer>
    </OnlineContainer>
  )
}

export default Online
