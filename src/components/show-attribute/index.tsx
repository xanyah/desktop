type ShowAttributeProps = {
  label: string
  children?: React.ReactNode | React.ReactNode[]
}

const ShowAttribute = ({label, children}: ShowAttributeProps) => {
  return <div className="flex flex-col gap-1 w-full">
    <h3>{label}</h3>
    {children}
  </div>
}

export default ShowAttribute
