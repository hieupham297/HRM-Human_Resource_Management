import React, { useState } from "react";
import "./searchbar.css";

export const Searchbar = (props) => {
  return (
    <div className="searchbar-content">
      <input
        type="text"
        placeholder="Enter employee's full name ..."
        onChange={(e) => props.setSearchName(e.target.value)}
      />
      <i
        className="fa-solid fa-magnifying-glass"
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};
