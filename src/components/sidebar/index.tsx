import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useCurrentStoreRole } from '@/hooks'
import { SidebarGroup } from './sidebar-group'
import { getItems } from './config'
import { StyledSidebar } from './styles'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { t } = useTranslation()
  const role = useCurrentStoreRole()
  const items = useMemo(() => (role ? getItems(t, role) : []), [role, t])

  return (
    <StyledSidebar $isOpen={isOpen}>
      {items.map(group =>
        group.disabled ? null : (
          <SidebarGroup key={group.label} group={group} />
        ),
      )}
    </StyledSidebar>
  )
}

export default Sidebar
