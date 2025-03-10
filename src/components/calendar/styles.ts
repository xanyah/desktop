import tw from 'tailwind-styled-components'

export const StyledCalendar = tw.div`
  p-3
`

export const StyledMonths = tw.div`
  flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0
`

export const StyledMonth = tw.div`
  space-y-4
`

export const StyledCaption = tw.div`
  flex justify-center pt-1 relative items-center
`

export const StyledCaptionLabel = tw.span`
  text-sm font-medium
`

export const StyledNav = tw.div`
  space-x-1 flex items-center
`

export const StyledNavButton = tw.button`
  h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100
`

export const StyledNavButtonPrevious = tw(StyledNavButton)`
  absolute left-1
`

export const StyledNavButtonNext = tw(StyledNavButton)`
  absolute right-1
`

export const StyledTable = tw.table`
  w-full border-collapse space-y-1
`

export const StyledHeadRow = tw.div`
  flex
`

export const StyledHeadCell = tw.div`
  text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]
`

export const StyledRow = tw.div`
  flex w-full mt-2
`

export const StyledCell = tw.div`
  relative p-0 text-center text-sm focus-within:relative focus-within:z-20
  [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50
  [&:has([aria-selected].day-range-end)]:rounded-r-md
`

export const StyledDay = tw.button`
  h-8 w-8 p-0 font-normal aria-selected:opacity-100
`

export const StyledDaySelected = tw(StyledDay)`
  bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground
`

export const StyledDayToday = tw(StyledDay)`
  bg-accent text-accent-foreground
`

export const StyledDayOutside = tw(StyledDay)`
  day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground
`

export const StyledDayDisabled = tw(StyledDay)`
  text-muted-foreground opacity-50
`

export const StyledDayRangeMiddle = tw(StyledDay)`
  aria-selected:bg-accent aria-selected:text-accent-foreground
`

export const StyledDayHidden = tw(StyledDay)`
  invisible
`
