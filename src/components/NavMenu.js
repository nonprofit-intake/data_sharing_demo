import React from "react";

import "./NavMenu.css";
import fpLogo from "../assets/fp_logo_2.png";

import Navbar from "react-bootstrap/Navbar";

function NavMenu() {
  return (
    <Navbar
      className="navContainer"
      style={{
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Navbar.Brand href="https://www.familypromiseofspokane.org/">
        <img
          alt="family-promise"
          src={fpLogo}
          width="300"
        />
      </Navbar.Brand>
      <h2>
        <a
          className="sourceCodeLink"
          href="https://github.com/nonprofit-intake/family_promise_data_sharing"
        >
          Data Sharing API
        </a>
      </h2>
    </Navbar>
  );
}

export default NavMenu;
