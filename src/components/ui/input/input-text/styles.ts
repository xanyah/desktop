import tw from "tailwind-styled-components";

export const StyledInput = tw.input`
  flex
  h-9
  w-full
  rounded-md
  border
  border-input
  bg-transparent
  px-3
  py-1
  text-base
  shadow-sm
  transition-colors
  placeholder:text-muted-foreground
focus:border-gray-400
  focus:outline-hidden
  disabled:cursor-not-allowed
  disabled:opacity-50
  md:text-sm

  ${(p) => p.$hasIcon && `
    pr-5
    `
  }
`;


export const StyledInputIconContainer = tw.div`
  relative
`;

export const IconContainer = tw.div`
  absolute
  -translate-y-1/2
  top-1/2
  right-1
  h-4
  w-4
  flex
  items-center
  pointer-events-none
`;