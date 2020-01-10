import React from "react";
import "./Header.css";

const Header = () => {
  const showInfo = () => {
    window.alert(
      "Developed by JamCry.\nhttps://github.com/jamcry\nhttps://cemkiray.com"
    );
  };

  return (
    <header>
      <div className="header">
        <div className="brand">
          <span role="img" aria-label="paper and pen">
            📝{" "}
          </span>
          Markdown Previewer
          <div className="info" onClick={showInfo}>
            <span role="img" aria-label="info">
              ℹ️
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
