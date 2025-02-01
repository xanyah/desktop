import { useCallback, useEffect } from "react";
import { useCurrentUser } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserParams } from '../../api'
import {  pick } from "lodash";
import { useTranslation } from "react-i18next";
import { Button,  FormContainer, FormSection, InputText } from "../../components";
import { useBreadCrumbContext } from "@/contexts/breadcrumb";

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
  useBreadCrumbContext([
    {label: 'Mon compte'}
  ])
  const queryClient = useQueryClient()
  const { t, i18n } = useTranslation();
  const { data: currentUserData } = useCurrentUser();
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
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['currentUser']})
      }
    }
  );

  const onUserSubmit = useCallback(
    (data: UserFormProps | PasswordFormProps) => {
      updateApiUser(data);
    },
    [updateApiUser]
  );

  useEffect(() => {
    reset(pick(currentUserData?.data, ["firstname", "lastname", "locale"]));
  }, [currentUserData, reset]);

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
              placeholder="Votre prénom"
              type="text"
              label="Prénom"
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
              placeholder="Votre nom de famille"
              type="text"
              label="Nom de famille"
            />
          )}
        />

        <Button
          className="self-end"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          Valider
        </Button>
      </form>
    );
  }, [
    handleUserFormSubmit,
    onUserSubmit,
    userFormControl,
    userSubmitIsLoading,
  ]);

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
              placeholder="Votre nouveau mot de passe"
              type="password"
              label="Mot de passe"
            />
          )}
        />

<Controller
          control={passwordFormControl}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="Confirmation de votre nouveau mot de passe"
              type="password"
              label="Confirmation"
            />
          )}
        />
        <Button
          className="self-end"
          type="submit"
          disabled={userSubmitIsLoading}
        >
          Valider
        </Button>
      </form>
    );
  }, [
    handlePasswordFormSubmit,
    onUserSubmit,
    passwordFormControl,
    userSubmitIsLoading,
  ]);

  return (
    <FormContainer
    isNotForm
    title="Mon compte"
    subtitle="Mettez-ici à jour les données de votre compte">
      <FormSection
      title="Informations générales">
        {renderUpdateUserForm()}
        </FormSection>
        <FormSection title="Sécurité">
        {renderUpdatePasswordForm()}
        </FormSection>
        </FormContainer>
  )
}

export default Account;
