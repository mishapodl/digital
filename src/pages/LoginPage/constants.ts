export enum Fields {
  password = 'password',
  login = 'login',
  admin = 'admin',
}

export const options = {
  [Fields.password]: {
    required: { value: true, message: `form.error.${Fields.password}.empty` },
  },
  [Fields.login]: {
    required: { value: true, message: `form.error.${Fields.login}.empty` },
  },
}
