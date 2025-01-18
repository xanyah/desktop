import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Translate, I18n } from 'react-redux-i18n'
import {Controller, useForm} from 'react-hook-form'

import './styles.scss'
import { logo } from '../../images'
import Input from '../../components/input'
import { signIn } from '../../api'
import { useNavigate } from 'react-router-dom'

type SignInForm = {
  email: string,
  password: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const {handleSubmit, control} = useForm<SignInForm>({
    defaultValues: {email: '', password: ''},
  })

  const onSubmit = handleSubmit(async ({email, password}) => {
    try {
      signIn({email, password})
      navigate('/home')
    } catch(err) {}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={I18n.t('sign-in-page.email')}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={I18n.t('sign-in-page.password')}
              type="password"
              value={value}
              onChange={onChange}
            />
          )}
          name="password"
        />
        <button className="btn-solid" onClick={signIn} type="submit">
          <Translate value='sign-in-page.sign-in'/>
        </button>
        <button className="btn-link" type="button">
          <Translate value='sign-in-page.forgotten-password'/>
        </button>
      </div>
    </form>
  )
}

export default SignIn
