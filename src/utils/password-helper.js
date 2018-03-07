export const errorHandler = {
  1: 'Le nouveau mot de passe et sa confirmation ne sont pas égaux',
  2: 'La longueur du mot de passe doit être supérieur à 8',
}

export const verifyPassword = (password, confirmPassword) => {
  if(password.length < 8)
    return 2
  if(password.trim() !== confirmPassword)
    return 1
  return 0
}
