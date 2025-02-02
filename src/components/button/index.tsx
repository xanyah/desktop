import { ButtonHTMLAttributes, forwardRef } from 'react'
import { colorStyle, sizes, variants } from './config'
import { StyledButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  color?: string
}

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      color,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variantStyle={variants[variant]}
        $sizeStyle={sizes[size]}
        $colorStyle={color ? colorStyle[color] : ''}
        {...props}
      >
        {children}
      </StyledButton>
    )
  },
)

export default Button
