import { Controller, useForm } from 'react-hook-form'

import { logo } from '../../images'
import { signIn } from '../../api'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputText } from '@/components'

interface SignInForm {
  email: string
  password: string
}

const SignIn = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<SignInForm>({
    defaultValues: { email: '', password: '' },
  })

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem(
        `Xanyah:Bearer`,
        `${data.data.tokenType} ${data.data.accessToken}`,
      )
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      navigate('/')
    },
  })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      mutate({ username: email, password, grantType: 'password' })
    }
    catch (err) {
      console.error(err)
    }
  })

  return (
    <form key="sign-in" className="sign-in-page" onSubmit={onSubmit}>
      <div className="container">
        <img src={logo} className="logo" />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputText
              placeholder={t('sign-in-page.email')}
              type="email"
              value={value}
              onChange={onChange}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputText
              placeholder={t('sign-in-page.password')}
              type="password"
              value={value}
              onChange={onChange}
            />
          )}
          name="password"
        />
        <button className="btn-solid" onClick={signIn} type="submit">
          <Trans i18nKey="sign-in-page.sign-in" />
        </button>
        <button className="btn-link" type="button">
          <Trans i18nKey="sign-in-page.forgotten-password" />
        </button>
      </div>
    </form>
  )
}

export default SignIn
