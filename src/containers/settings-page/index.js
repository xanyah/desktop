import { connect } from 'react-redux'
import { updateSettingsField, updateStore, getCategories } from '../../actions'
import SettingsPage from '../../components/settings-page'

const mapStateToProps = ({ settings: { categories, country, step, storeName }, stores: { currentStore }}) => ({
  categories,
  country,
  currentStore,
  step,
  storeName,
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  updateField: (field, value) => dispatch(updateSettingsField(field, value)),
  updateStore: newStore => dispatch(updateStore(newStore)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
