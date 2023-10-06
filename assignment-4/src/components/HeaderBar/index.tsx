'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Switch } from '../SwitchButton/ToggleSwitch'
import avatar from '../../utils/avatar.jpg'

function HeaderBar() {
  const { theme, setTheme } = useTheme()
  function changeTheme() {
    const newTheme = theme === 'white' ? 'dark' : 'white'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }
  return (
    <header className="headerBar">
      <h1 className="text-3xl font-bold ">Bookstore</h1>
      <Switch
        isOn={theme === 'dark'}
        handleToggle={() => changeTheme()}
        label="Theme"
      />

      <figure id="personal">
        <Image src={avatar} alt="avatar" id="avatar" />
        <figcaption id="name">john doe</figcaption>
      </figure>
    </header>
  )
}

export default HeaderBar
