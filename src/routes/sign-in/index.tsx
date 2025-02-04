import { Controller, useForm } from 'react-hook-form'
import { signIn } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, FormContainer, InputText } from '@/components'
import { useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import { usePrinters } from '@/hooks'

interface SignInForm {
  username: string
  password: string
}

const SignIn = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toastId = useRef<string>(null)
  const { handleSubmit, control, setError } = useForm<SignInForm>({
    defaultValues: { username: '', password: '' },
  })

  const { mutate } = useMutation({
    mutationFn: signIn,
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      localStorage.setItem(
        `Xanyah:Bearer`,
        `${data.data.tokenType} ${data.data.accessToken}`,
      )
      toast.success(t('signIn.successToast'), { id: toastId?.current || undefined })
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      navigate('/')
    },
    onError: () => {
      toast.error(t('signIn.errorToast'), { id: toastId?.current || undefined })
      setError('username', { type: 'custom', message: t('signIn.invalidCredentials') })
      setError('password', { type: 'custom', message: t('signIn.invalidCredentials') })
    },
  })

  const onSubmit = useCallback((data) => {
    mutate({ ...data, grantType: 'password' })
  }, [mutate])

  const { data, refetch } = usePrinters()
  console.log('data', data)

  return (
    <div className="min-h-screen flex flex-col items-stretch justify-center w-full p-8">
      <Button onClick={() => refetch()}>refetch</Button>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        title={t('signIn.pageTitle')}
        submitButtonLabel={t('signIn.signInButton')}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              placeholder={t('signIn.emailPlaceholder')}
              label={t('signIn.emailLabel')}
              type="email"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              placeholder={t('signIn.passwordPlaceholder')}
              label={t('signIn.passwordLabel')}
              type="password"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
          name="password"
        />
      </FormContainer>
    </div>
  )
}

export default SignIn
