import { forwardRef, useEffect, useRef } from 'react'
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
    const quillRef = useRef<any>(null)

    useEffect(() => {
      const loadQuill = async () => {
        const ReactQuill = (await import('react-quill')).default
        
        if (quillRef.current && !quillRef.current.editor) {
          const QuillComponent = ReactQuill
          quillRef.current = QuillComponent
        }
      }
      
      loadQuill()
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
          {typeof window !== 'undefined' && (
            <div>
              {(() => {
                const ReactQuill = require('react-quill').default
                return (
                  <ReactQuill
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                  />
                )
              })()}
            </div>
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
