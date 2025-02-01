import { DOMAttributes } from "react"
import { Button } from "../ui"

type FormContainerProps =  & {
  title: string
  subtitle: string
} & ((DOMAttributes<HTMLFormElement> & {
  isNotForm?: false
}) | (DOMAttributes<HTMLDivElement> & {
  isNotForm: true
}))

const FormContainer = ({
  title,
  subtitle,
  children,
  isNotForm = false,
  ...formProps
}: FormContainerProps) => {
  const Component: any = isNotForm ? 'div' : 'form'

  return <Component {...formProps} className="flex flex-col gap-8 max-w-2xl">
    <div className="flex flex-col gap-2 pb-4 border-b">
      <h1>{title}</h1>
      <p className="text-small">{subtitle}</p>
    </div>
    {children}

    {!isNotForm && <Button className="self-end" type="submit">Valider</Button>}
  </Component>
}

export default FormContainer
