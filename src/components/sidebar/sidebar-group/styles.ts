import { NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

export const SidebarContainer = tw.div`
  relative flex w-full flex-col p-2
`

export const GroupLabel = tw.div`
  h-8 flex items-center px-2 text-xs font-medium text-gray-700
`

export const ItemList = tw.ul`
  flex flex-col gap-1 w-full text-sm
`

export const ItemButton = tw(NavLink)`
  flex w-full items-center gap-2 p-2 rounded-md text-left h-8 text-sm transition hover:bg-gray-200 [&>svg]:size-4 [&>svg]:shrink-0
`
