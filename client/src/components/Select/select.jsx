import React from "react";
import "./select.css";

export const Select = (props) => {
  return (
    <>
      <div className="select-label">{props.label}</div>
      <select
        className="select-main"
        onChange={(e) => props.setValue(e.target.value)}
      >
        {props.children}
      </select>
    </>
  );
};

export const Options = (props) => {
  return (
    <>
      <option value={props.value} className="option">
        {props.value}
      </option>
    </>
  );
};
