// styles.ts
import { Button } from '@/components'
import tw from 'tailwind-styled-components'

interface ContentContainerProps {
  $isSidebarOpen: boolean
}

export const OnlineContainer = tw.div`
  flex
`

export const ContentContainer = tw.div<ContentContainerProps>`
  flex-1
  transition-all
  duration-300
  ease-in-out
  ${p => (p.$isSidebarOpen ? 'ml-64' : 'ml-0')} 
  print:ml-0
`

export const Header = tw.header`
  flex
  h-16
  shrink-0
  items-center
  gap-2
  border-b
  print:hidden
`
export const HeaderContainer = tw.div`
  flex items-center gap-2 px-4 h-full
`

export const StyledButton = tw(Button)`
  h-7
  w-7
`

export const MainContent = tw.main`
  flex
  flex-1
  flex-col
  gap-4
  p-8
  mx-auto
  w-full
`
