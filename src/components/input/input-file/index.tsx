import { forwardRef, useCallback, useState } from 'react'
import {
  IconContainer,
  StyledInput,
  StyledInputIconContainer,
} from '../input-text/styles'
import { StyledError, StyledInputContainer, StyledLabel } from '../input-styles'
import { filter, map } from 'lodash'
import Button from '../../button'
import Dialog from '@/components/dialog'
import {
  FileListWrapper,
  HintText,
  ImageContainer,
  ImagePreview,
} from './styles'

interface Image {
  name: string
  signed_id: string
  thumbnail: string
}

interface Props {
  id?: string
  label?: string
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  hint?: string
  onFilesChange?: (files: (File | Image)[] | null) => void
  value?: (File | Image)[]
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
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files
        if (newFiles) {
          const updatedFiles = [...value, ...Array.from(newFiles)]
          onFilesChange?.(updatedFiles)
          e.target.value = ''
        }
      },
      [value, onFilesChange],
    )

    const handleRemoveFileConfirm = useCallback(() => {
      if (selectedIndex !== null) {
        const updatedFiles = filter(value, (_, i) => i !== selectedIndex)
        onFilesChange?.(updatedFiles)
        setSelectedIndex(null)
      }
    }, [selectedIndex, value, onFilesChange])

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

        <FileListWrapper>
          {map(value, (item, index) => (
            <ImageContainer key={index}>
              <ImagePreview
                src={
                  item instanceof File
                    ? URL.createObjectURL(item)
                    : `${import.meta.env.VITE_API_URL}${item.thumbnail}`
                }
                alt={item.name}
              />
              <Button
                color="red"
                size="sm"
                type="button"
                onClick={() => setSelectedIndex(index)}
              >
                Supprimer
              </Button>
            </ImageContainer>
          ))}
        </FileListWrapper>

        {error && <StyledError>{error}</StyledError>}
        {hint && <HintText>{hint}</HintText>}

        <Dialog
          open={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          title="Confirmation"
          footer={(
            <>
              <Button variant="outline" onClick={() => setSelectedIndex(null)}>
                Annuler
              </Button>
              <Button onClick={handleRemoveFileConfirm}>Confirmer</Button>
            </>
          )}
        >
          Êtes-vous sûr de vouloir supprimer cette image?
        </Dialog>
      </StyledInputContainer>
    )
  },
)

InputFile.displayName = 'InputFile'

export default InputFile
