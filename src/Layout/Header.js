// src/Component/Common/Header.js
import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <h2 className="app-title">RVL</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
