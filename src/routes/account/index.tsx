import { useCallback, useEffect } from 'react'
import { Translate } from 'react-redux-i18n'
import { supportedLangages } from '../../utils/i18n-helper'
import FormAttribute from '../../containers/form-attribute'

import './styles.scss'
import { useCurrentToken } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { updateUserParams } from '../../api'
import { pick } from 'lodash'

type UserFormProps = {
  firstname: string
  lastname: string
  locale: string
}

type PasswordFormProps = {
  password: string
  confirmPassword: string
}

const Account = () => {
  const { data: tokenData } = useCurrentToken()
  const { control: userFormControl, handleSubmit: handleUserFormSubmit, reset } = useForm<UserFormProps>()
  const { control: passwordFormControl, handleSubmit: handlePasswordFormSubmit } = useForm<PasswordFormProps>()

  const { mutate: updateApiUser, isPending: userSubmitIsLoading } = useMutation({
    mutationFn: updateUserParams,
  })

  const onUserSubmit = useCallback((data: UserFormProps | PasswordFormProps) => {
    updateApiUser(data)
  }, [updateApiUser])

  useEffect(() => {
    reset(pick(tokenData?.data.data, ['firstname', 'lastname', 'locale']))
  }, [tokenData, reset])

  const renderUpdateUserForm = useCallback(() => {
    return (
      <form
        onSubmit={handleUserFormSubmit(onUserSubmit)}
      >
        <h2><Translate value='account.form.first.title' /></h2>

        <Controller
          control={userFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="firstname"
              key="firstname"
              value={value}
              model="account"
              type="string"
              onUpdate={(field, value) => onChange(value)}
            />
          )}
          name="firstname"
        />

        <Controller
          control={userFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="lastname"
              key="lastname"
              value={value}
              model="account"
              type="string"
              onUpdate={(field, value) => onChange(value)}
            />
          )}
          name="lastname"
        />


        <Controller
          control={userFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="locale"
              key="locale"
              value={value}
              model="account"
              type="select"
              onUpdate={(field, value) => onChange(value)}
              options={supportedLangages}
            />
          )}
          name="locale"
        />

        <button
          className="btn-solid"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          <Translate value='global.validate' />
        </button>
      </form>
    )
  }, [handleUserFormSubmit, onUserSubmit, userFormControl, userSubmitIsLoading])

  const renderUpdatePasswordForm = useCallback(() => {
    return (
      <form
        onSubmit={handlePasswordFormSubmit(onUserSubmit)}
      >
        <h2><Translate value='account.form.second.title' /></h2>


        <Controller
          control={passwordFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="password"
              key="password"
              value={value}
              model="account"
              type="password"
              onUpdate={(field, value) => onChange(value)}
            />
          )}
          name="password"
        />

        <Controller
          control={passwordFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="confirmPassword"
              key="confirmPassword"
              value={value}
              model="account"
              type="password"
              onUpdate={(field, value) => onChange(value)}
            />
          )}
          name="confirmPassword"
        />
        <button
          className="btn-solid"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          <Translate value='global.validate' />
        </button>
      </form>
    )
  }, [handlePasswordFormSubmit, onUserSubmit, passwordFormControl, userSubmitIsLoading])

  return (
      <div className="account-page">
        {renderUpdateUserForm()}
        {renderUpdatePasswordForm()}
      </div>
  )
}

export default Account
