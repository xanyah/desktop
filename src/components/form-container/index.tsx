import { DOMAttributes, ReactElement, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../button'

type FormContainerProps = {
  title?: string | ReactElement<'h1'>
  subtitle?: string
  isLoading?: boolean
  submitButtonLabel?: string
  classname?: string
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
  classname,
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
    <Component
      {...formProps}
      className={`flex flex-col gap-8 max-w-2xl ${classname}`}
    >
      <div className="flex flex-row items-center justify-between border-b pb-4">
        {title && (
          <div className="flex flex-col gap-2 w-full">
            {typeof title === 'string' ? <h1>{title}</h1> : title}
            {subtitle && <p className="text-small">{subtitle}</p>}
          </div>
        )}
        {button}
      </div>
      {children}

      {!isNotForm && (
        <div className="flex flex-row justify-end items-center gap-4">
          {onCancel && (
            <Button
              disabled={isLoading}
              variant="ghost"
              className="self-end"
              type="button"
              onClick={onCancel}
            >
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
