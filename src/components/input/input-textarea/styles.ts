import tw from 'tailwind-styled-components'

export const StyledTextarea = tw.textarea`
  flex
  min-h-20
  w-full
  rounded-md
  border
  border-input
  bg-transparent
  px-3
  py-2
  text-base
  shadow-sm
  transition-colors
  placeholder:text-muted-foreground
  focus:border-gray-400
  focus:outline-hidden
  disabled:cursor-not-allowed
  disabled:opacity-50
  md:text-sm
  resize-y
`
