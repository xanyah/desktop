import { ButtonHTMLAttributes } from 'react'
import { variants } from './config'
import { StyledButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <StyledButton $variantStyle={variants[variant]} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
