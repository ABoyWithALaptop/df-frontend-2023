import React from 'react'
import './ToggleSwitch.css'
import { SwitchButtonType } from '../../utils/types'

export const Switch = ({ isOn, handleToggle, label }: SwitchButtonType) => {
  return (
    <div id="toggleWrapper">
      <label
        className={`switch-label ${isOn ? `bg-[#324c5c]` : `bg-[#70e2fe]`}`}
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
          className={`switch-button ${isOn ? `bg-[#F5F3CE]` : `bg-[#f28c38]`}`}
        />
      </label>
      <p className="text-emerald-400">{label}</p>
    </div>
  )
}
