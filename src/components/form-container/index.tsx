import { DOMAttributes, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../button'

type FormContainerProps = {
  title: string
  subtitle?: string
  submitButtonLabel?: string
  button?: ReactNode
} & (
  | (DOMAttributes<HTMLFormElement> & {
    isNotForm?: false
  })
  | (DOMAttributes<HTMLDivElement> & {
    isNotForm: true
  })
)

const FormContainer = ({
  title,
  subtitle,
  children,
  button,
  submitButtonLabel,
  isNotForm = false,
  ...formProps
}: FormContainerProps) => {
  const { t } = useTranslation()
  const Component: any = isNotForm ? 'div' : 'form'

  return (
    <Component {...formProps} className="flex flex-col gap-8 max-w-2xl">
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <div className="flex flex-col gap-2">
          <h1>{title}</h1>
          {subtitle && <p className="text-small">{subtitle}</p>}
        </div>
        {button}
      </div>
      {children}

      {!isNotForm && (
        <Button className="self-end" type="submit">
          {submitButtonLabel || t('global.save')}
        </Button>
      )}
    </Component>
  )
}

export default FormContainer
