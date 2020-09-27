import React, { useState } from "react";
import "./App.css";

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");

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
