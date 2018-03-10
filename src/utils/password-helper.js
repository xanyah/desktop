import { I18n } from 'react-redux-i18n'

export const errorHandler = {
  1: I18n.t('password-helper.tips.same-confirm'),
  2: I18n.t('password-helper.tips.length'),
}

export const verifyPassword = (password, confirmPassword) => {
  if(password.length < 8)
    return 2
  if(password.trim() !== confirmPassword)
    return 1
  return 0
}
