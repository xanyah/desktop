import { forwardRef } from 'react'
import {
  IconContainer,
  StyledInput,
  StyledInputIconContainer,
} from '../input-text/styles'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'
import { filter, map } from 'lodash'

interface Props {
  id?: string
  label?: string
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  hint?: string
  onFilesChange?: (
    files: (File | { name: string; signed_id: string })[] | null
  ) => void
  value?: (File | { name: string; signed_id: string })[]
}

const InputFile = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      error,
      icon,
      disabled,
      onFilesChange,
      hint,
      value = [],
      ...props
    },
    ref
  ) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = e.target.files
      if (newFiles) {
        const updatedFiles = [...value, ...Array.from(newFiles)]
        onFilesChange?.(updatedFiles)
        e.target.value = ''
      }
    }

    const handleRemoveFile = (index: number) => {
      const updatedFiles = filter(value, (_, i) => i !== index)
      onFilesChange?.(updatedFiles)
    }

    return (
      <StyledInputContainer>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

        <StyledInputIconContainer>
          <StyledInput
            ref={ref}
            disabled={disabled}
            type="file"
            accept="image/*"
            multiple
            id={id}
            onChange={handleFileChange}
            {...props}
          />
          {icon && <IconContainer>{icon}</IconContainer>}
        </StyledInputIconContainer>

        <div className="mt-4 flex flex-wrap gap-2">
          {map(value, (item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md"
            >
              <span>{item.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {error && <StyledError>{error}</StyledError>}
        {hint && <p className="text-small">{hint}</p>}
      </StyledInputContainer>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
