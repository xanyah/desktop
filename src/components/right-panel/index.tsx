import { ReactNode } from 'react'

type RightPanelProps = {
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode | ReactNode[]
}

const RightPanel = ({ children, isOpen, onClose }: RightPanelProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex flex-row items-stretch">
      <div className="bg-neutral-700 opacity-30 flex-1" onClick={onClose} />
      <div className="border-l w-md bg-white overflow-y-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

export default RightPanel
