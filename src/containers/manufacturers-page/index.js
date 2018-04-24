import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ManufacturersPage from '../../components/manufacturers-page'
import {
  getManufacturers,
  updateManufacturerField,
  searchApiManufacturer,
} from '../../actions'

const mapStateToProps = ({ manufacturers: { loading, manufacturers } }) => ({
  loading,
  manufacturers,
})

const mapDispatchToProps = dispatch => ({
  getManufacturers: () => dispatch(getManufacturers()),
  openManufacturer: manufacturer => {
    dispatch(updateManufacturerField('selectedManufacturer', manufacturer))
    dispatch(push(`/manufacturers/${manufacturer.id}`))
  },
  searchApiManufacturer: query => dispatch(searchApiManufacturer(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersPage)
