import React from 'react'
import './ToggleSwitch.css'

const ToggleSwitch = () => {
  return (
    <label className="toggle-switch" htmlFor="toggle-switch">
      <input type="checkbox" id="toggle-switch" />
      <span className="switch" />
      <p>dark mode</p>
    </label>
  )
}
export const Switch = ({
  isOn,
  handleToggle,
  colorOne,
  colorButOne,
  colorTwo,
  colorButTwo,
  label,
}) => {
  return (
    <div id="toggleWrapper">
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor="switch"
      >
        <input
          checked={isOn}
          onChange={handleToggle}
          className="switch-checkbox"
          id="switch"
          type="checkbox"
        />
        <span
          className="switch-button"
          style={{ background: isOn ? colorButOne : colorButTwo }}
        />
      </label>
      <p>{label}</p>
    </div>
  )
}

export default ToggleSwitch
