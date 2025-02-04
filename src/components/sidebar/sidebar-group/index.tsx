import React from 'react'
import { map, sortBy } from 'lodash'
import { GroupLabel, ItemButton, ItemList, SidebarContainer } from './styles'

interface SidebarGroupProps {
  group: {
    label: string
    items: { label: string, url: string, icon: React.ElementType, disabled?: boolean }[]
  }
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ group }) => {
  return (
    <SidebarContainer>
      <GroupLabel>{group.label}</GroupLabel>
      <ItemList>
        {map(sortBy(group.items, 'label'), item =>
          item.disabled
            ? null
            : (
                <li key={item.label} className="relative">
                  <ItemButton to={item.url}>
                    <item.icon />
                    <span>{item.label}</span>
                  </ItemButton>
                </li>
              ))}
      </ItemList>
    </SidebarContainer>
  )
}

export default SidebarGroup
