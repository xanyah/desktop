import tw from 'tailwind-styled-components'

interface Props {
  $variantStyle: string
}

export const StyledButton = tw.button<Props>`
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  rounded-md
  text-sm
  font-medium
  transition-colors
  focus-visible:outline-hidden
  focus-visible:ring-1
  focus-visible:ring-ring
  disabled:pointer-events-none
  disabled:opacity-50
  h-9 px-4 py-2
  cursor-pointer
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0

  ${p => `${p.$variantStyle}`}
`
