import tw from 'tailwind-styled-components'

export const StyledSeparator = tw.div`
  shrink-0
  bg-border

  ${p => p.$orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'}
  ${p => p.$classname}
`
