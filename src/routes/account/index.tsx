import { useCallback, useEffect, useRef } from 'react'
import { useCurrentToken, useCurrentUser } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut as apiSignout, updateUserParams } from '../../api'
import { pick } from 'lodash'
import { Button, FormContainer, FormSection, InputText } from '../../components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

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
  const { data: currentTokenData } = useCurrentToken()
  const toastId = useRef<string>(null)
  const {
    control: userFormControl,
    handleSubmit: handleUserFormSubmit,
    reset,
  } = useForm<UserFormProps>({ defaultValues: { firstname: '', lastname: '' } })

  const {
    control: passwordFormControl,
    handleSubmit: handlePasswordFormSubmit,
  } = useForm<PasswordFormProps>({ defaultValues: { password: '', confirmPassword: '' } })

  const { mutate: updateApiUser, isPending: userSubmitIsLoading } = useMutation(
    {
      mutationFn: updateUserParams,
      onMutate: () => {
        toastId.current = toast.loading(t('global.loading'))
      },
      onSuccess: () => {
        toast.success(t('global.saved'), {id: toastId?.current || undefined})
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      },
      onError: () => {
        toast.success(t('global.savingError'), {id: toastId?.current || undefined})
      }
    },
  )

  const { mutate: signOut } = useMutation(
    {
      mutationFn: () => apiSignout({ token: currentTokenData }),
      onMutate: () => {
        toastId.current = toast.loading(t('global.loading'))
      },
      onSuccess: () => {
        toast.success(t('global.saved'), {id: toastId?.current || undefined})
        localStorage.clear()
        queryClient.getQueryCache().clear()
      },
      onError: () => {
        toast.error(t('global.savingError'), {id: toastId?.current || undefined})
      }
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
      button={(
        <Button type="button" variant="outline" onClick={() => signOut()}>
          {t('account.signOut')}
        </Button>
      )}
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
