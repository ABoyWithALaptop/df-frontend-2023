'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Switch } from '../SwitchButton/ToggleSwitch'
import avatar from '../../utils/avatar.jpg'
import { LoginContext } from '../../utils/context/userContext'

function HeaderBar() {
  const { theme, setTheme } = useTheme()
  function changeTheme() {
    const newTheme = theme === 'white' ? 'dark' : 'white'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }
  const { emailName } = useContext(LoginContext)
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

      <figure id="personal">
        <Image src={avatar} alt="avatar" id="avatar" />
        <figcaption id="name" className="w-fit">
          {emailName}
        </figcaption>
      </figure>
    </header>
  )
}

export default HeaderBar
