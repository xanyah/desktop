import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'
import { verifyPassword, errorHandler } from '../../utils/password-helper'

import './styles.scss'

export default class Account extends React.Component {
  render() {
    const {
      firstname,
      lastname,
      loading,
      // locale,
      updateField,
      newPassword,
      confirmNewPassword,
      updateUserParams,
    } = this.props
    return (
      <PageContainer>

        <h2>Modification de vos informations personnelles</h2>

        <form
          onSubmit={e => {
            e.preventDefault()
            updateUserParams({
              'firstname': firstname.trim(),
              'lastname': lastname.trim(),
            })
          }}
        >
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
          {/* <select>
            <option
              value="fr"
              selected={'fr' === locale}
            >
              FR
            </option>
            <option
              value="en"
              selected={'en' === locale}
            >
              EN
            </option>
          </select> */}
          <button
            className="btn-primary submit"
            type="submit"
            disabled={loading}
          >
              SAVE
          </button>
        </form>

        <h2>Modification du Mot de Passe</h2>

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
              'password': newPassword.trim(),
              'password_confirmation': confirmNewPassword.trim(),
            })
          }}
        >
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
  newPassword: PropTypes.string,
  updateField: PropTypes.func,
  updateUserParams: PropTypes.func,
}

Account.defaultProps = {
  confirmNewPassword: '',
  firstname: '',
  lastname: '',
  loading: false,
  newPassword: '',
  updateField: () => null,
  updateUserParams: () => null,
}
