import { connect } from 'react-redux'
import { updateUserParams } from '../../actions'
import AccountPage from '../../components/account-page'

const mapStateToProps = (
  { user: {
    firstname,
    lastname,
    loading,
    locale,
  }}) => ({
  firstname,
  lastname,
  loading,
  locale,
})

const mapDispatchToProps = dispatch => ({
  updateUserParams: params => dispatch(updateUserParams(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
