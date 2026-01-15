import { forwardRef, useEffect, useState } from 'react'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'
import 'react-quill/dist/quill.snow.css'

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
    const [ReactQuill, setReactQuill] = useState<any>(null)

    useEffect(() => {
      import('react-quill').then((module) => {
        setReactQuill(() => module.default)
      })
    }, [])

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
    }

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'link',
    ]

    return (
      <StyledInputContainer ref={ref}>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

        <div className="quill-wrapper">
          {ReactQuill && (
            <ReactQuill
              theme="snow"
              value={value || ''}
              onChange={onChange}
              modules={modules}
              formats={formats}
            />
          )}
        </div>

        {error && <StyledError>{error}</StyledError>}
        {hint && <p className="text-small">{hint}</p>}
      </StyledInputContainer>
    )
  },
)

InputHtml.displayName = 'InputHtml'

export default InputHtml
