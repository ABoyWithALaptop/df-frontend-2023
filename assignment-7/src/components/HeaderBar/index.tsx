'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { redirect } from 'next/navigation'
import { Switch } from '../SwitchButton/ToggleSwitch'
import avatar from '../../utils/avatar.jpg'
import { LoginContext } from '../../utils/context/userContext'
import { useGetMe } from '../../api/generated/user/user'

function HeaderBar() {
  const { theme, setTheme } = useTheme()
  function changeTheme() {
    const newTheme = theme === 'white' ? 'dark' : 'white'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }
  const { loginStatus, setLoginStatus } = useContext(LoginContext)
  const { data } = useGetMe()
  const name = data?.data.data?.fullName
  return (
    <header className="headerBar">
      <Link href="/">
        <h1 className="text-3xl font-bold ">Bookstore</h1>
      </Link>
      <Switch
        isOn={theme === 'dark'}
        handleToggle={() => changeTheme()}
        label="Theme"
      />
      <div className="flex items-center justify-center gap-2">
        <figure id="personal">
          <Image src={avatar} alt="avatar" id="avatar" />
          <figcaption id="name" className="w-fit">
            {loginStatus ? name : ''}
          </figcaption>
        </figure>
        {loginStatus && (
          <button
            className="primary p-2 rounded-md dark:bg-slate-400 text-xs"
            onClick={(ev) => {
              ev.preventDefault()
              destroyCookie(null, 'Bearer')
              setLoginStatus(false)
              redirect('/login')
            }}
          >
            Log out
          </button>
        )}
      </div>
    </header>
  )
}

export default HeaderBar
