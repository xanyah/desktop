import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { updateAuthField, signIn } from '../../actions'
import SignInPage from '../../components/sign-in-page'

const mapStateToProps = ({
  auth: {
    email,
    errors,
    loading,
    password,
  }
}) => ({
  email,
  errors,
  loading,
  password,
})

const mapDispatchToProps = dispatch => ({
  updateField: (f, v) => dispatch(updateAuthField(f, v)),
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  signIn: () => dispatchProps.dispatch(signIn(
    stateProps.email,
    stateProps.password,
    () => dispatchProps.dispatch(push('/home'))
  )),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignInPage)
