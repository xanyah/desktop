type ShowSectionProps = {
  title: string
  children?: React.ReactNode | React.ReactNode[]
}

const ShowSection = ({title, children}: ShowSectionProps) => {
  return <div className="flex flex-col gap-4">
    <h2>{title}</h2>
    <div className="flex flex-col gap-8">
    {children}
    </div>
  </div>
}

export default ShowSection
