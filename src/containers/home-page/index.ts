import { connect } from 'react-redux'
import Home from '../../components/home-page'

const mapStateToProps = ({ user: { firstname }}) => ({
  firstname,
})

export default connect(mapStateToProps)(Home)
