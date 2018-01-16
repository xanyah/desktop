import { connect } from 'react-redux'
import PageContainer from '../../components/page-container'

const mapStateToProps = ({ global: { currentNavigationStep }}) => ({
  currentNavigationStep,
})

export default connect(mapStateToProps)(PageContainer)
