import { connect } from 'react-redux'
import { updateSettingsField, updateStore } from '../../actions'
import SettingsPage from '../../components/settings-page'

const mapStateToProps = ({ settings: { step, storeName }, stores: { currentStore }}) => ({
  currentStore,
  step,
  storeName,
})

const mapDispatchToProps = dispatch => ({
  updateField: (field, value) => dispatch(updateSettingsField(field, value)),
  updateStore: newStore => dispatch(updateStore(newStore)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
