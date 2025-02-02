import { useCallback, useEffect } from 'react'
import { useCurrentUser } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserParams } from '../../api'
import { pick } from 'lodash'
import { Button, FormContainer, FormSection, InputText } from '../../components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

interface UserFormProps {
  firstname: string
  lastname: string
  locale: string
}

interface PasswordFormProps {
  password: string
  confirmPassword: string
}

const Account = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([
    { label: t('account.pageTitle') },
  ])
  const queryClient = useQueryClient()
  const { data: currentUserData } = useCurrentUser()
  const {
    control: userFormControl,
    handleSubmit: handleUserFormSubmit,
    reset,
  } = useForm<UserFormProps>()

  const {
    control: passwordFormControl,
    handleSubmit: handlePasswordFormSubmit,
  } = useForm<PasswordFormProps>()

  const { mutate: updateApiUser, isPending: userSubmitIsLoading } = useMutation(
    {
      mutationFn: updateUserParams,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      },
    },
  )

  const onUserSubmit = useCallback(
    (data: UserFormProps | PasswordFormProps) => {
      updateApiUser(data)
    },
    [updateApiUser],
  )

  useEffect(() => {
    reset(pick(currentUserData?.data, ['firstname', 'lastname', 'locale']))
  }, [currentUserData, reset])

  const renderUpdateUserForm = useCallback(() => {
    return (
      <form className="flex flex-col gap-8" onSubmit={handleUserFormSubmit(onUserSubmit)}>
        <Controller
          control={userFormControl}
          name="firstname"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('account.firstnamePlaceholder')}
              type="text"
              label={t('account.firstnameLabel')}
            />
          )}
        />
        <Controller
          control={userFormControl}
          name="lastname"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('account.lastnamePlaceholder')}
              type="text"
              label={t('account.lastnameLabel')}
            />
          )}
        />

        <Button
          className="self-end"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          {t('global.save')}
        </Button>
      </form>
    )
  }, [
    t,
    handleUserFormSubmit,
    onUserSubmit,
    userFormControl,
    userSubmitIsLoading,
  ])

  const renderUpdatePasswordForm = useCallback(() => {
    return (
      <form className="flex flex-col gap-8" onSubmit={handlePasswordFormSubmit(onUserSubmit)}>
        <Controller
          control={passwordFormControl}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('account.passwordPlaceholder')}
              type="password"
              label={t('account.passwordLabel')}
            />
          )}
        />

        <Controller
          control={passwordFormControl}
          name="confirmPassword"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('account.passwordConfirmationPlaceholder')}
              type="password"
              label={t('account.passwordConfirmationLabel')}
            />
          )}
        />
        <Button
          className="self-end"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          {t('global.save')}
        </Button>
      </form>
    )
  }, [
    t,
    handlePasswordFormSubmit,
    onUserSubmit,
    passwordFormControl,
    userSubmitIsLoading,
  ])

  return (
    <FormContainer
      isNotForm
      title={t('account.pageTitle')}
      subtitle={t('account.pageSubtitle')}
    >
      <FormSection title={t('account.generalInformations')}>
        {renderUpdateUserForm()}
      </FormSection>
      <FormSection title={t('account.security')}>
        {renderUpdatePasswordForm()}
      </FormSection>
    </FormContainer>
  )
}

export default Account
