import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  createApiCustomAttribute,
  getCategories,
  getCustomAttributes,
  updateCustomAttributesField,
  updateSettingsField,
  updateStore,
} from '../../actions'
import SettingsPage from '../../components/settings-page'

const mapStateToProps = ({ categories: { categories }, customAttributes: {customAttributes}, settings: { country, step, storeName }, stores: { currentStore }}) => ({
  categories,
  country,
  currentStore,
  customAttributes,
  step,
  storeName,
})

const mapDispatchToProps = dispatch => ({
  createApiCustomAttribute: newCustomAttribute => dispatch(createApiCustomAttribute(newCustomAttribute)),
  getCategories: () => dispatch(getCategories()),
  getCustomAttributes: () => dispatch(getCustomAttributes()),
  openCustomAttribute: customAttribute => {
    dispatch(updateCustomAttributesField('selectedCustomAttribute', customAttribute))
    dispatch(push(`/settings/custom-attributes/${customAttribute.id}`))
  },
  updateField: (field, value) => dispatch(updateSettingsField(field, value)),
  updateStore: newStore => dispatch(updateStore(newStore)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
