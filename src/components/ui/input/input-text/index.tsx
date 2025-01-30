import { forwardRef } from 'react'
import { IconContainer, StyledInput, StyledInputIconContainer } from './styles'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'

interface Props extends React.ComponentProps<'input'> {
  id?: string
  label?: string
  error?: string
  icon?: React.ReactNode
}

const InputText = forwardRef<HTMLInputElement, Props>(
  ({ id, label, error, icon, ...props }, ref) => {
    return (
      <StyledInputContainer>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

        <StyledInputIconContainer>
          <StyledInput $hasIcon={!!icon} ref={ref} id={id} {...props} />
          {icon && <IconContainer>{icon}</IconContainer>}
        </StyledInputIconContainer>

        {error && <StyledError>{error}</StyledError>}
      </StyledInputContainer>
    )
  }
)

InputText.displayName = 'InputText'

export default InputText
