import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Translate } from 'react-redux-i18n'
import swal from 'sweetalert'

import PageContainer from '../page-container'
import { verifyPassword, errorHandler } from '../../utils/password-helper'
import { supportedLangages } from '../../utils/i18n-helper'
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
      updatedPassword: {
        password: '',
        passwordConfirmation: '',
      },
      updatedUser: {
        firstname: firstname,
        lastname: lastname,
        locale: locale,
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

  handleUpdatePassword(attribute, value) {
    this.setState({
      updatedPassword: {
        ...this.state.updatedPassword,
        [attribute]: value,
      },
    })
  }

  renderUpdateUserForm() {
    const {
      loading,
      updateUserParams,
    } = this.props

    const { updatedUser } = this.state

    return (
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
          model="account"
          type="string"
          onUpdate={(attribute, value) =>
            this.handleUpdateFieldUser('firstname', value)}
        />

        <FormAttribute
          attribute="lastname"
          key="lastname"
          value={updatedUser['lastname']}
          model="account"
          type="string"
          onUpdate={(attribute, value) =>
            this.handleUpdateFieldUser('lastname', value)}
        />

        <Select
          name="form-field-locale"
          value={updatedUser['locale']}
          onChange={e =>
            this.handleUpdateFieldUser('locale', e.value)}
          options={supportedLangages}
        />

        <button
          className="btn-primary submit"
          type="submit"
          disabled={loading}
        >
          <Translate value='global.validate'/>
        </button>
      </form>
    )
  }

  renderUpdatePasswordForm() {
    const {
      loading,
      updateUserParams,
    } = this.props

    const { updatedPassword } = this.state

    return (
      <form
        className="account-page"
        onSubmit={e => {
          e.preventDefault()
          const passwordError = verifyPassword(
            updatedPassword['password'],
            updatedPassword['passwordConfirmation'],
          )
          if(passwordError) {
            var messageError = errorHandler[passwordError]

            swal({
              button: true,
              dangerMode: true,
              icon: 'error',
              text: messageError,
              title: 'Something is wrong !',
            })

            return null
          }
          updateUserParams({
            password: updatedPassword['password'].trim(),
            password_confirmation: updatedPassword['passwordConfirmation'].trim(),
          })
        }}
      >
        <h2><Translate value='account.form.second.title'/></h2>

        <FormAttribute
          attribute="password"
          key="password"
          value={updatedPassword['password']}
          model="account"
          type="password"
          onUpdate={(attribute, value) =>
            this.handleUpdatePassword('password', value)}
        />

        <FormAttribute
          attribute="confirmPassword"
          key="confirmPassword"
          value={updatedPassword['confirmPassword']}
          model="account"
          type="password"
          onUpdate={(attribute, value) =>
            this.handleUpdatePassword('confirmPassword', value)}
        />

        <button
          className="btn-primary submit"
          type="submit"
          disabled={loading}
        >
          <Translate value='global.validate'/>
        </button>
      </form>
    )
  }

  render() {
    return (
      <PageContainer>
        <div className="account">
          {this.renderUpdateUserForm()}
          {this.renderUpdatePasswordForm()}
        </div>
      </PageContainer>
    )
  }
}

Account.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
  updateUserParams: PropTypes.func,
}

Account.defaultProps = {
  firstname: '',
  lastname: '',
  loading: false,
  locale: 'en',
  updateUserParams: () => null,
}
