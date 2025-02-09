import tw from 'tailwind-styled-components'

export const StyledBadge = tw.div`
  inline-flex
  items-center
  rounded-md
  border
  px-2
  py-0.25
  text-xs
  font-medium
  transition-colors
  focus:outline-none
  focus:ring-2
  focus:ring-ring
  focus:ring-offset-2

  ${p => p.$variantStyle}
`
