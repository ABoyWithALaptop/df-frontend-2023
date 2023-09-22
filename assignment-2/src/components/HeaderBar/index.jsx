import React, { useContext } from 'react'
import ToggleSwitch, { Switch } from '../SwitchButton/ToggleSwitch'
import { ThemeContext } from '../../util/context/ThemeContext'
function HeaderBar() {
  const {theme, setTheme} = useContext(ThemeContext)
  function changeTheme() {
    const newTheme = theme === "white" ? "dark" : "white"
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }
  return (
    <header className={theme==='dark' && 'dark'}>
      <h1>Bookstore</h1>
      {/* <ToggleSwitch label="Dark Mode" /> */}
      {/* <input type="checkbox" name="darkmode" id="darkmode" onClick={changeTheme}/> */}
      <Switch
        isOn={theme === 'dark'}
        handleToggle={changeTheme}
        colorButTwo="#F28C38"
        colorTwo="#70e2fe"
        colorButOne="#F5F3CE"
        colorOne="#324c5c"
        label='Theme'
      />
      
      
      <figure id="personal">
        <img src={require('../../avatar.jpg')} alt="avatar" srcSet="" id="avatar" />
        <figcaption id="name">john doe</figcaption>
      </figure>
    </header>
  )
}

export default HeaderBar