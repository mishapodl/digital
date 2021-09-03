import { useDispatch } from 'react-redux'

import { adminAuthorization } from './../../redux/auth/thunks'

type TAdminCredentials = {
  admin: string
  password: string
}

export const useLogin = () => {
  const dispatch = useDispatch()

  const login = async (credentials: TAdminCredentials) => {
    const auth = await dispatch(adminAuthorization(credentials))
    return auth
  }

  return { login }
}
