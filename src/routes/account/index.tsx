import { useCallback, useEffect } from "react";
import { supportedLangages } from "../../utils/i18n-helper";

import './styles.scss'
import { useCurrentToken } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { updateUserParams } from '../../api'
import { find, pick } from "lodash";
import { Trans, useTranslation } from "react-i18next";
import { FormAttribute } from "../../components";

type UserFormProps = {
  firstname: string;
  lastname: string;
  locale: string;
};

type PasswordFormProps = {
  password: string;
  confirmPassword: string;
};

const Account = () => {
  const { t, i18n } = useTranslation();
  const { data: tokenData } = useCurrentToken();
  const {
    control: userFormControl,
    handleSubmit: handleUserFormSubmit,
    reset,
  } = useForm<UserFormProps>();
  const {
    control: passwordFormControl,
    handleSubmit: handlePasswordFormSubmit,
  } = useForm<PasswordFormProps>();

  const { mutate: updateApiUser, isPending: userSubmitIsLoading } = useMutation(
    {
      mutationFn: updateUserParams,
    }
  );

  const onUserSubmit = useCallback(
    (data: UserFormProps | PasswordFormProps) => {
      updateApiUser(data);
    },
    [updateApiUser]
  );

  useEffect(() => {
    reset(pick(tokenData?.data.data, ["firstname", "lastname", "locale"]));
  }, [tokenData, reset]);

  const renderUpdateUserForm = useCallback(() => {
    return (
      <form onSubmit={handleUserFormSubmit(onUserSubmit)}>
        <h2>
          <Trans i18nKey="account.form.first.title" />
        </h2>

        <Controller
          control={userFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="firstname"
              key="firstname"
              value={value}
              model="account"
              type="string"
              onUpdate={(value) => onChange(value)}
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
              onUpdate={(value) => onChange(value)}
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
              value={find(supportedLangages(t), (opt) => opt.value === value)}
              model="account"
              type="select"
              onUpdate={(value) => {
                i18n.changeLanguage(value);
                onChange(value);
              }}
              options={supportedLangages(t)}
            />
          )}
          name="locale"
        />

        <button
          className="btn-solid"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          <Trans i18nKey="global.validate" />
        </button>
      </form>
    );
  }, [
    i18n,
    t,
    handleUserFormSubmit,
    onUserSubmit,
    userFormControl,
    userSubmitIsLoading,
  ]);

  const renderUpdatePasswordForm = useCallback(() => {
    return (
      <form onSubmit={handlePasswordFormSubmit(onUserSubmit)}>
        <h2>
          <Trans i18nKey="account.form.second.title" />
        </h2>

        <Controller
          control={passwordFormControl}
          render={({ field: { onChange, value } }) => (
            <FormAttribute
              attribute="password"
              key="password"
              value={value}
              model="account"
              type="password"
              onUpdate={(value) => onChange(value)}
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
              onUpdate={(value) => onChange(value)}
            />
          )}
          name="confirmPassword"
        />
        <button
          className="btn-solid"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          <Trans i18nKey="global.validate" />
        </button>
      </form>
    );
  }, [
    handlePasswordFormSubmit,
    onUserSubmit,
    passwordFormControl,
    userSubmitIsLoading,
  ]);

  return (
      <div className="account-page">
        {renderUpdateUserForm()}
        {renderUpdatePasswordForm()}
      </div>
  )
}

export default Account;
