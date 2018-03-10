import { connect } from 'react-redux'
import { updateUserField, updateUserParams } from '../../actions'
import AccountPage from '../../components/account-page'

const mapStateToProps = (
  { user: {
    firstname,
    lastname,
    loading,
    locale,
    password,
    newPassword,
    confirmNewPassword,
  }}) => ({
  confirmNewPassword,
  firstname,
  lastname,
  loading,
  locale,
  newPassword,
  password,
})

const mapDispatchToProps = dispatch => ({
  updateField: (field, value) => dispatch(updateUserField(field, value)),
  updateUserParams: params => dispatch(updateUserParams(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
