import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'
import { Translate } from 'react-redux-i18n'
import { verifyPassword, errorHandler } from '../../utils/password-helper'
import FormAttribute from '../../containers/form-attribute'

import './styles.scss'

export default class Account extends React.Component {
  componentWillMount() {
    const {
      firstname,
      lastname,
      locale,
    } = this.props

    this.setState({
      updatedUser: {
        'firstname': firstname,
        'lastname': lastname,
        'locale': locale,
      },
    })
  }

  handleUpdateFieldUser(attribute, value) {
    this.setState({
      updatedUser: {
        ...this.state.updatedUser,
        [attribute]: value,
      },
    })
  }


  render() {
    const {
      loading,
      locale,
      updateField,
      newPassword,
      confirmNewPassword,
      updateUserParams,
    } = this.props
    const {updatedUser} = this.state
    return (
      <PageContainer>
        <div className="account">
          <form
            onSubmit={e => {
              e.preventDefault()
              updateUserParams(updatedUser)
            }}
          >
            <h2><Translate value='account.form.first.title'/></h2>

            <FormAttribute
              attribute="firstname"
              key="firstname"
              value={updatedUser['firstname']}
              model="variant-attributes"
              type="string"
              onUpdate={(attribute, value) =>
                this.handleUpdateFieldUser('firstname', value)}
            />

            <FormAttribute
              attribute="lastname"
              key="lastname"
              value={updatedUser['lastname']}
              model="variant-attributes"
              type="string"
              onUpdate={(attribute, value) =>
                this.handleUpdateFieldUser('lastname', value)}
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
              <Translate value='global.validate'/>
            </button>
          </form>
        </div>

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
            className="input"
            onChange={e => updateField('newPassword', e.target.value)}
            required
            type="password"
            placeholder="Nouveau mot de passe"
          />
          <input
            className="input"
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
            <Translate value='global.validate'/>
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
