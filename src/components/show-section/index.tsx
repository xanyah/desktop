interface ShowSectionProps {
  title: string
  children?: React.ReactNode | React.ReactNode[]
  button?: React.ReactNode
}

const ShowSection = ({ title, children, button }: ShowSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h2>{title}</h2>
        {button}
      </div>
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  )
}

export default ShowSection
