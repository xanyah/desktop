import { DOMAttributes, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../button'

type FormContainerProps = {
  title: string
  subtitle?: string
  isLoading?: boolean
  submitButtonLabel?: string
  button?: ReactNode
  onCancel?: () => void
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
  isLoading,
  button,
  submitButtonLabel,
  isNotForm = false,
  onCancel,
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
        <div className="flex flex-row justify-end items-center gap-4">
          {onCancel && (
            <Button disabled={isLoading} variant="ghost" className="self-end" type="button" onClick={onCancel}>
              {t('global.cancel')}
            </Button>
          )}
          <Button disabled={isLoading} className="self-end" type="submit">
            {submitButtonLabel || t('global.save')}
          </Button>
        </div>
      )}
    </Component>
  )
}

export default FormContainer
