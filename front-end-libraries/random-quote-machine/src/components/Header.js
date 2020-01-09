import React from 'react'
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="brand">
          <span role="img" aria-label="thought bubble">💬 </span>
          Random Quote Machine
        </div>
      </div>
    </header>
  )
};

export default Header;