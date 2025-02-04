import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'

export const BreadcrumbContainer = tw.nav`
  flex flex-wrap items-center gap-2.5 text-sm text-gray-500
`

export const BreadcrumbList = tw.ol`
  flex flex-wrap items-center gap-1.5 break-words
`

export const BreadcrumbItemWrapper = tw.li`
  inline-flex items-center gap-1.5
`

export const BreadcrumbLink = tw(Link)`
  transition-colors hover:text-black
`

export const BreadcrumbPage = tw.span`
  font-normal text-black cursor-default
`

export const BreadcrumbSeparator = tw.li`
  flex items-center [&>svg]:w-3.5 [&>svg]:h-3.5
`
