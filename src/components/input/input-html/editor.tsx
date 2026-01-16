import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface EditorProps {
  readOnly?: boolean
  defaultValue?: any
  value?: string
  onTextChange?: (delta: any, oldDelta: any, source: string) => void
  onSelectionChange?: (range: any, oldRange: any, source: string) => void
  onChange?: (html: string) => void
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, value, onTextChange, onSelectionChange, onChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const defaultValueRef = useRef(defaultValue)
    const onTextChangeRef = useRef(onTextChange)
    const onSelectionChangeRef = useRef(onSelectionChange)
    const onChangeRef = useRef(onChange)
    const quillRef = useRef<Quill | null>(null)
    const isUserTypingRef = useRef(false)

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange
      onSelectionChangeRef.current = onSelectionChange
      onChangeRef.current = onChange
    })

    useEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!readOnly)
      }
    }, [readOnly])

    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      )
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      })

      quillRef.current = quill
      if (typeof ref === 'function') {
        ref(quill)
      }
      else if (ref) {
        ref.current = quill
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current)
      }
      else if (value) {
        quill.clipboard.dangerouslyPasteHTML(value)
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args)
        const html = quill.root.innerHTML
        isUserTypingRef.current = true
        onChangeRef.current?.(html)
      })

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args)
      })

      return () => {
        if (typeof ref === 'function') {
          ref(null)
        }
        else if (ref) {
          ref.current = null
        }
        quillRef.current = null
        container.innerHTML = ''
      }
    }, [ref])

    // Update content when value changes externally (not from user typing)
    useEffect(() => {
      if (quillRef.current && value !== undefined) {
        const currentHTML = quillRef.current.root.innerHTML
        
        // Only update if value is different AND it's not from user typing
        if (currentHTML !== value && !isUserTypingRef.current) {
          const selection = quillRef.current.getSelection()
          quillRef.current.clipboard.dangerouslyPasteHTML(value || '')
          
          // Restore cursor position if there was one
          if (selection) {
            setTimeout(() => {
              quillRef.current?.setSelection(selection)
            }, 0)
          }
        }
        
        // Reset the typing flag
        isUserTypingRef.current = false
      }
    }, [value])

    return <div ref={containerRef} className="quill-wrapper" />
  },
)

Editor.displayName = 'Editor'

export default Editor
