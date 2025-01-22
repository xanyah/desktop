import { I18n } from 'react-redux-i18n'

import {
  getVatRates as apiGetVatRates,
} from '../utils/api-helper'

import {
  showErrorToast,
} from '../utils/notification-helper'

import { updateSettingsField } from './'

export const getVatRates = countryCode =>
  (dispatch) => {
    dispatch(updateSettingsField('loading', true))
    apiGetVatRates(countryCode)
      .then(({ data }) => {
        dispatch(updateSettingsField('vatRatesCountry', data))
        dispatch(updateSettingsField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
