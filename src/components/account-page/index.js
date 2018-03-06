import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'
import { Translate } from 'react-redux-i18n'
import { verifyPassword, errorHandler } from '../../utils/password-helper'

import './styles.scss'

export default class Account extends React.Component {
  render() {
    const {
      firstname,
      lastname,
      loading,
      locale,
      updateField,
      newPassword,
      confirmNewPassword,
      updateUserParams,
    } = this.props
    return (
      <PageContainer>
        <form
          onSubmit={e => {
            e.preventDefault()
            updateUserParams({
              firstname: firstname.trim(),
              lastname: lastname.trim(),
              locale: locale,
            })
          }}
        >
          <h2><Translate value='account.form.first.title'/></h2>
          <input
            className="input-text"
            onChange={e => updateField('firstname', e.target.value)}
            required
            type="text"
            value={firstname}
          />
          <input
            className="input-text"
            onChange={e => updateField('lastname', e.target.value)}
            required
            type="text"
            value={lastname}
          />
          <select
            className='select-locale'
            onChange={e => updateField('locale', e.target.value)}
          >
            <option
              value="fr"
              selected={'fr' === locale}
            >FR</option>
            <option
              value="en"
              selected={'en' === locale}
            >EN</option>
          </select>
          <button
            className="btn-primary submit"
            type="submit"
            disabled={loading}
          >
              SAVE
          </button>
        </form>
        <form
          onSubmit={e => {
            e.preventDefault()
            const passwordError = verifyPassword(newPassword, confirmNewPassword)
            if(passwordError) {
              var messageError = errorHandler[passwordError]
              alert(messageError)
              return null
            }
            updateUserParams({
              password: newPassword.trim(),
              password_confirmation: confirmNewPassword.trim(),
            })
          }}
        >
          <h2><Translate value='account.form.second.title'/></h2>
          <input
            className="input-text"
            onChange={e => updateField('newPassword', e.target.value)}
            required
            type="password"
            placeholder="Nouveau mot de passe"
          />
          <input
            className="input-text"
            onChange={e => updateField('confirmNewPassword', e.target.value)}
            required
            type="password"
            placeholder="Confirmation mot de passe"
          />
          <button
            className="btn-primary submit"
            type="submit"
            disabled={loading}
          >
              SAVE
          </button>
        </form>
      </PageContainer>
    )
  }
}

Account.propTypes = {
  confirmNewPassword: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
  newPassword: PropTypes.string,
  updateField: PropTypes.func,
  updateUserParams: PropTypes.func,
}

Account.defaultProps = {
  confirmNewPassword: '',
  firstname: '',
  lastname: '',
  loading: false,
  locale: 'en',
  newPassword: '',
  updateField: () => null,
  updateUserParams: () => null,
}
