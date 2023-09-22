import React from "react";
import "./ToggleSwitch.css";
  
const ToggleSwitch = () => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" />
      <span className="switch" />
      <p>dark mode</p>
    </label>
  );
};
export const Switch = ({ isOn, handleToggle, colorOne,colorButOne, colorTwo,colorButTwo, label }) => {
  return (
    <div id="toggleWrapper">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`switch`}
      >
        <span className={`switch-button`} style={{ background: isOn ? colorButOne : colorButTwo }}/>
      </label>
      <label>{ label}</label>
    </div>
  );
};

  
export default ToggleSwitch;