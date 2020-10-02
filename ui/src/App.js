import React, { useState } from "react";
import "./App.css";

import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [matches, setMatches] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      last_name: lastName.split(",").map((s) => s.trim()),
      ssn: ssn.split(",").map((s) => s.trim()),
    };

    console.log(JSON.stringify(data));

    fetch(
      "https://3yk0fzdvdh.execute-api.us-east-1.amazonaws.com/default/return_user_info",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setMatches(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Container className="container">
      <Navbar className="header">
        <Navbar.Brand href="https://www.familypromiseofspokane.org/">
          <img alt="" src={require("./fp_logo.png")} width="300" />
        </Navbar.Brand>
          Data Sharing API
      </Navbar>
      <form className="inputMenu" onSubmit={fetchMatches}>
        <label>
          Last Name(s):
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          SSN(s):
          <input
            type="text"
            name="ssn"
            value={ssn}
            onChange={(event) => setSSN(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="resultsContainer">
        <h2>Results:</h2>
        {isLoading ? <p>loading....</p> : JSON.stringify(matches)}
      </div>
    </Container>
  );
}

export default App;
