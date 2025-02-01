import AsyncSelect from "react-select/async";
import tw from "tailwind-styled-components";

export const StyledAsyncSelect = tw(AsyncSelect)`
  w-full
  whitespace-nowrap 
  rounded-md 
  border 
  border-input 
  bg-transparent 
  text-sm 
  shadow-sm 
  ring-offset-background 
  placeholder:text-muted-foreground 
  focus:outline-hidden 
  focus:ring-1 
  focus:ring-ring 
  disabled:cursor-not-allowed 
  disabled:opacity-50 
  [&>span]:line-clamp-1
`;

export const style = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'hsl(var(--accent))'
      : 'transparent',
    color: state.isSelected
      ? 'hsl(var(--accent-foreground))'
      : 'hsl(var(--foreground))',
    '&:hover': {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.375rem',
    boxShadow: '0 0 0 1px hsl(var(--border))',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'hsl(var(--muted-foreground))',
  }),
  input: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
  }),
}