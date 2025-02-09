import { AsyncProps } from 'react-select/async'
import { style, StyledSelect } from '../styles'
import {
  StyledError,
  StyledInputContainer,
  StyledLabel,
} from '../../input-styles'

interface Props extends AsyncProps<any, any, any> {
  id?: string
  label?: string
  error?: string
}

const ReactSelect = ({ id, label, error, ...props }: Props) => {
  return (
    <StyledInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledSelect {...props} styles={style} />
      <StyledError>{error}</StyledError>
    </StyledInputContainer>
  )
}

export default ReactSelect
