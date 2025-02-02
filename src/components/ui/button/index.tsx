import { ButtonHTMLAttributes, forwardRef } from 'react'
import { variants } from './config'
import { StyledButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

const Button = forwardRef(({ variant = 'primary', children, ...props }: ButtonProps, ref) => {
  return (
    <StyledButton ref={ref} $variantStyle={variants[variant]} {...props}>
      {children}
    </StyledButton>
  )
})

export default Button
