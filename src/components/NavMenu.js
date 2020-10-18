import React from "react";

import "./NavMenu.css";

import Navbar from "react-bootstrap/Navbar";

function NavMenu() {
  return (
    <Navbar
      className="header"
      style={{
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Navbar.Brand href="https://www.familypromiseofspokane.org/">
        <img
          alt=""
          className="brand"
          src={require("../assets/fp_logo.png")}
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
