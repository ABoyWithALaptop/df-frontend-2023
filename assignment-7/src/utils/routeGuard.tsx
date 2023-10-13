import { PropsWithChildren, use, useEffect, useState } from 'react'
import { useGetMe } from '../api/generated/user/user'

export const useGuard = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    const { data } = useGetMe({
      axios: {
        baseURL: process.env.API_URL,
        withCredentials: true,
      },
    })
    // console.log('data me', data)
  }, [])
  return { isAuthenticated }
}
