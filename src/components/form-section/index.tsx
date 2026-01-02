interface FormSectionProps {
  title: string
  className?: string
  children?: React.ReactNode | React.ReactNode[]
}

const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2>{title}</h2>
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  )
}

export default FormSection
