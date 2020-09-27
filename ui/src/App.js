import React, { useState } from "react";
import "./App.css";

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [matches, setMatches] = useState({});

  const fetchMatches = () => {
    fetch(
      "https://3yk0fzdvdh.execute-api.us-east-1.amazonaws.com/default/return_user_info",
      {
        method: "POST",
      }
    )
      // .then((response) => response.json())
      .then((response) => {
        setMatches(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="App">
      <header>Test</header>
      <form className="inputs">
        <label htmlFor="">
          Last Name(s):
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label htmlFor="">
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
      <div className="outputs">
        <p>{lastName}</p>
        <p>{ssn}</p>
      </div>
    </div>
  );
}

export default App;
