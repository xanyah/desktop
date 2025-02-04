import tw from 'tailwind-styled-components'

export const StyledTableContainer = tw.table`
  relative 
  w-full 
  overflow-auto
`

export const StyledTableBorder = tw.div`
  rounded-lg
  border
`

export const StyledTable = tw.table`
  w-full 
  caption-bottom 
  text-sm
`

export const StyledTableHeader = tw.thead`
  [&_tr]:border-b
`

export const StyledTableRow = tw.tr`
  border-b
  transition-colors
  hover:bg-muted/50
  data-[state=selected]:bg-muted
`

export const StyledTableHead = tw.th`
  h-10
  px-2 
  text-left 
  align-middle 
  font-medium 
  text-muted-foreground 
  [&:has([role=checkbox])]:pr-0 
  [&>[role=checkbox]]:translate-y-[2px]
`

export const StyledTableBody = tw.tbody`
  [&_tr:last-child]:border-0
`
export const StyledTableCell = tw.td`
  p-2 
  align-middle 
  [&:has([role=checkbox])]:pr-0 
  [&>[role=checkbox]]:translate-y-[2px]
`
