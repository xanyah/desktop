import { forwardRef, useRef } from 'react'
import Quill from 'quill'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'
import { StyledQuillWrapper } from './styles'
import Editor from './editor'

interface Props {
  id?: string
  label?: string
  error?: string
  hint?: string
  value?: string
  onChange?: (value: string) => void
}

const InputHtml = forwardRef<HTMLDivElement, Props>(
  ({ id, label, error, hint, value, onChange }, ref) => {
    const quillRef = useRef<Quill | null>(null)

    return (
      <StyledInputContainer ref={ref}>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

        <StyledQuillWrapper>
          <Editor
            ref={quillRef}
            value={value}
            onChange={onChange}
          />
        </StyledQuillWrapper>

        {error && <StyledError>{error}</StyledError>}
        {hint && <p className="text-small">{hint}</p>}
      </StyledInputContainer>
    )
  },
)

InputHtml.displayName = 'InputHtml'

export default InputHtml
