import tw from 'tailwind-styled-components'

interface StyledSidebarProps {
  $isOpen: boolean
}

export const StyledSidebar = tw.div<StyledSidebarProps>`
  fixed
  top-0
  left-0
  h-screen
  border-r
  w-64
  bg-gray-50
  transition-transform
  duration-300
  ease-in-out
  transform
  overflow-y-auto
  dark:bg-background
  print:hidden

  ${p => (p.$isOpen ? 'translate-x-0' : '-translate-x-full')}
`
