import tw from "tailwind-styled-components";

export const StyledInputContainer = tw.div`
 w-full
 space-y-2
`;

export const StyledLabel = tw.label`
  text-sm
  font-medium
  leading-none
  peer-disabled:cursor-not-allowed
  peer-disabled:opacity-70
`;

export const StyledError = tw.p`
 text-[0.8rem]
 font-medium 
 text-destructive
`;
