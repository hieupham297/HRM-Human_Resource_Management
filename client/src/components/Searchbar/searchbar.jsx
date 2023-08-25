import React from "react";
import "./searchbar.css";

export const Searchbar = () => {
  return (
    <div className="searchbar-content">
      <input type="text" placeholder="Enter employee's full name ..." />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};
