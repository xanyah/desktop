import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'
import Circle from '@uiw/react-color-circle'

interface Props {
  id?: string
  label?: string
  error?: string
  hint?: string
  value?: string
  onChange?: (newColor: string) => void
  colors: string[]
}

const InputColor = ({ id, label, error, hint, value, colors, onChange }: Props) => {
  return (
    <StyledInputContainer>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

      <Circle
        colors={colors}
        color={value}
        pointProps={{
          style: {
            marginRight: 20,
          },
        }}
        onChange={color => onChange?.(color.hex)}
      />

      {error && <StyledError>{error}</StyledError>}
      {hint && <p className="text-small">{hint}</p>}
    </StyledInputContainer>
  )
}

InputColor.displayName = 'InputColor'

export default InputColor
