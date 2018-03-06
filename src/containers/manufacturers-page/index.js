import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ManufacturersPage from '../../components/manufacturers-page'
import { getManufacturers, updateManufacturerField } from '../../actions'

const mapStateToProps = ({ manufacturers: { manufacturers } }) => ({
  manufacturers,
})

const mapDispatchToProps = dispatch => ({
  getManufacturers: () => dispatch(getManufacturers()),
  openManufacturer: manufacturer => {
    dispatch(updateManufacturerField('selectedManufacturer', manufacturer))
    dispatch(push(`/manufacturers/${manufacturer.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersPage)
