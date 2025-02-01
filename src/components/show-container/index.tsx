import { DOMAttributes, ReactNode } from "react"
import { Button } from "../ui"

type ShowContainerProps = {
  title: string
  subtitle?: string
  children?: ReactNode | ReactNode[]
  button?: ReactNode
}

const ShowContainer = ({
  title,
  subtitle,
  children,
  button,
}: ShowContainerProps) => {
  return <div className="flex flex-col gap-8 max-w-2xl">
    <div className="flex flex-row items-center justify-between border-b pb-4">
    <div className="flex flex-col gap-2">
      <h1>{title}</h1>
      {subtitle && <p className="text-small">{subtitle}</p>}
    </div>
    {button}
    </div>
    {children}
  </div>
}

export default ShowContainer
