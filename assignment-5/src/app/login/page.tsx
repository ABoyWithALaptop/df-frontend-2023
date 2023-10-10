'use client'

import { ErrorMessage } from '@hookform/error-message'
import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { LoginContext } from '../../utils/context/userContext'

const LoginSchema = z.object({
  email: z.string().min(1, 'email is required').email(),
  password: z.string(),
})
type LoginSchemaType = z.infer<typeof LoginSchema>

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })
  const { login, setLogin, setEmailName } = useContext(LoginContext)
  const router = useRouter()
  useEffect(() => {
    if (login) {
      router.push('/')
    }
  }, [])

  const processForm: SubmitHandler<LoginSchemaType> = (data) => {
    const user = localStorage.getItem('user')
    if (user) {
      const { email, password } = JSON.parse(user)
      if (email === data.email && password === data.password) {
        toast.success('login success')
        setLogin(true)
        console.log(data.email)
        setEmailName(data.email)
        router.push('/')
      } else {
        toast.error('login failed')
      }
    } else {
      toast.error('login failed')
    }
  }
  return (
    <main className="main flex justify-center items-center">
      <section className="h-2/3 modal">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(processForm)}>
          <label htmlFor="email">
            email:
            <input
              type="email"
              id="email"
              placeholder="your email"
              className={`${errors.email && 'error'} input`}
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>
          <label htmlFor="password">
            password:
            <input
              type="password"
              id="password"
              className={`${errors.password && 'error'} input`}
              placeholder="your password"
              {...register('password', {
                required: 'password is required',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
            <div className="button-group">
              <p>
                don&#x27;t have account?{' '}
                <a href="/sign-up" className="underline">
                  sign up
                </a>
              </p>
            </div>
            <button type="submit" className="standard-height-element primary">
              login
            </button>
          </label>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
