type AuthToken = {
  success: boolean,
  data: {
      id: string,
      provider: string,
      uid: string,
      firstname: string,
      email: string,
      lastname: string,
      locale: string,
      deleted_at: null | string
  }
}
