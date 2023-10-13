import { createContext } from 'react'
import { loginStatusType } from '../types'

export const LoginContext = createContext<loginStatusType>({
  loginStatus: false,
  setLoginStatus: () => {},
})
