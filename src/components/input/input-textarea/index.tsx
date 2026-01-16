import { forwardRef } from 'react'
import { StyledTextarea } from './styles'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'

interface Props extends React.ComponentProps<'textarea'> {
  id?: string
  label?: string
  error?: string
  hint?: string
}

const InputTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, error, hint, ...props }, ref) => {
    return (
      <StyledInputContainer>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

        <StyledTextarea ref={ref} id={id} {...props} />

        {error && <StyledError>{error}</StyledError>}
        {hint && <p className="text-small">{hint}</p>}
      </StyledInputContainer>
    )
  },
)

InputTextarea.displayName = 'InputTextarea'

export default InputTextarea
