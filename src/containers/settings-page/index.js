import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  createApiCategory,
  createApiCustomAttribute,
  getCategories,
  getCustomAttributes,
  getVatRates,
  updateCustomAttributesField,
  updateSettingsField,
  updateApiStore,
} from '../../actions'
import SettingsPage from '../../components/settings-page'

const mapStateToProps = ({
  categories: { categories },
  customAttributes: {customAttributes},
  settings: { country, step, storeName, vatRatesCountry },
  stores: { currentStore }}) => ({
  categories,
  country,
  currentStore,
  customAttributes,
  step,
  storeName,
  vatRatesCountry,
})

const mapDispatchToProps = dispatch => ({
  createApiCategory: newCategory => dispatch(createApiCategory(newCategory)),
  createApiCustomAttribute: newCustomAttribute => dispatch(createApiCustomAttribute(newCustomAttribute)),
  getCategories: () => dispatch(getCategories()),
  getCustomAttributes: () => dispatch(getCustomAttributes()),
  getVatRates: countryCode => dispatch(getVatRates(countryCode)),
  openCustomAttribute: customAttribute => {
    dispatch(updateCustomAttributesField('selectedCustomAttribute', customAttribute))
    dispatch(push(`/settings/custom-attributes/${customAttribute.id}`))
  },
  updateApiStore: updatedStore => dispatch(updateApiStore(updatedStore)),
  updateField: (field, value) => dispatch(updateSettingsField(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
