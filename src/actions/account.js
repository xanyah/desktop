import { updateUserField } from '../actions'
import { updateUserParams as apiPatchUserParams } from '../utils/api-helper'

export const updateUserParams = (params) =>
  dispatch => {
    dispatch(updateUserField('loading', true))
    apiPatchUserParams(params)
      .then(({data}) => {
        console.log(data)
        dispatch(updateUserField('loading', false))
      })
  }
