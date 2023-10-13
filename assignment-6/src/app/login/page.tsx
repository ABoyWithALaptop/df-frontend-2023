'use client'

import { ErrorMessage } from '@hookform/error-message'
import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { redirect, useRouter } from 'next/navigation'
import { LoginContext } from '../../utils/context/userContext'
import Link from 'next/link'
import { setCookie } from 'nookies'
import { login } from '../../api/generated/auth/auth'
import { useGetMe } from '../../api/generated/user/user'
import { mutate } from 'swr'

const LoginSchema = z.object({
  email: z.string().min(1, 'email is required').email(),
  password: z.string().min(1, 'email is required'),
})
type LoginSchemaType = z.infer<typeof LoginSchema>

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })
  const [submitting, setSubmitting] = React.useState(false)
  const { loginStatus, setLoginStatus } = useContext(LoginContext)

  if (loginStatus) redirect('/')

  const processForm: SubmitHandler<LoginSchemaType> = (data) => {
    setSubmitting(true)
    login(data)
      .then((res) => {
        if (res.data.data?.accessToken) {
          toast.success('login success')
          setCookie(null, 'Bearer', res.data.data.accessToken)
          setLoginStatus(true)
        } else {
          setSubmitting(false)
          toast.error('login failed')
        }
        // router.replace('/')
      })
      .catch((err) => {
        setSubmitting(false)
        console.log(err)
        toast.error(`login failed: ${err.response.data.message}`)
      })
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
                <Link href="/sign-up" className="underline">
                  sign up
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="standard-height-element primary disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              login
            </button>
          </label>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
