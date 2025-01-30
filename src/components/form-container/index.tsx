import { DOMAttributes } from "react"
import { Button } from "../ui"

type FormContainerProps = DOMAttributes<HTMLFormElement> & {
  title: string
  subtitle: string
}

const FormContainer = ({
  title,
  subtitle,
  children,
  ...formProps
}: FormContainerProps) => {
  return <form {...formProps} className="flex flex-col gap-8 max-w-2xl">
    <div className="flex flex-col gap-2 pb-4 border-b">
      <h1>{title}</h1>
      <p className="text-small">{subtitle}</p>
    </div>
    {children}

    <Button className="self-end" type="submit">Valider</Button>
  </form>
}

export default FormContainer
