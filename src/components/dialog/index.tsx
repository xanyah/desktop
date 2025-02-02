'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Body, CloseButton, Content, Footer, Header, Overlay } from './styles'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!open) return null

  return (
    <Overlay>
      <Content>
        <CloseButton onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </CloseButton>
        {title && <Header>{title}</Header>}
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Overlay>
  )
}

export default Dialog
