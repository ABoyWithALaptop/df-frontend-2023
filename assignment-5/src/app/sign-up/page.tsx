'use client'

import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type passwordStrengthType = {
  length: boolean
  uppercase: boolean
  specialChar: boolean
}
const signUpSchema = z
  .object({
    email: z.string().min(1, 'email is required').email(),
    password: z
      .string()
      .min(8, 'password must be at least 8 characters')
      .refine(
        (val) => /[A-Z]/.test(val),
        'password must contain at least one uppercase letter',
      )
      .refine(
        (val) => /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(val),
        'password must have at least one symbol',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'password and confirm password must be the same',
    path: ['confirmPassword'],
  })
type SignUpSchemaType = z.infer<typeof signUpSchema>

function SignUpPage() {
  const [metter, setMetter] = useState<passwordStrengthType>({
    length: false,
    uppercase: false,
    specialChar: false,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues: getValue,
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) })

  const processForm: SubmitHandler<SignUpSchemaType> = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    }
    localStorage.setItem('user', JSON.stringify(user))
    window.location.href = '/login'
  }
  const level = Object.values(metter).filter((value) => value).length
  const stringAlert: string[] = []
  if (metter.length) {
    stringAlert.push('at least eight characters')
  }
  if (metter.uppercase) {
    stringAlert.push('one uppercase letter')
  }
  if (metter.specialChar) {
    stringAlert.push('one special character.')
  }
  return (
    <main className="main flex justify-center items-center">
      <section className="h-fit modal">
        <h1 className="text-4xl font-bold text-center">Sign up</h1>
        <form onSubmit={handleSubmit(processForm)} className="block">
          <label htmlFor="email" className="block">
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
          <label htmlFor="password" className="block">
            password:
            <input
              type="password"
              id="password"
              className={`${errors.password && 'error'} input`}
              placeholder="your password"
              {...register('password', {
                required: 'password is required',
                onChange(event) {
                  const currentPassword = event.target.value
                  const checking = {
                    length: currentPassword.length < 8,
                    uppercase: !/[A-Z]/.test(currentPassword),
                    specialChar: !/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
                      currentPassword,
                    ),
                  }
                  setMetter(checking)
                },
              })}
            />
            {getValue('password') && (
              <div className="w-full bg-slate-300 h-3 rounded-md">
                <div
                  className={`password-status-${level}  h-3  rounded-md transition-colors duration-500`}
                />
              </div>
            )}
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>
          <label htmlFor="confirmPassword" className="block">
            Confirm Password:
            <input
              type="password"
              id="confirmPassword"
              className={`${errors.confirmPassword && 'error'} input`}
              placeholder="confirm password"
              {...register('confirmPassword', {
                required: 'confirm password is required',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) => {
                return <small className="error-message">{message}</small>
              }}
            />
          </label>
          <button type="submit" className="standard-height-element primary ">
            Sign up
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignUpPage
