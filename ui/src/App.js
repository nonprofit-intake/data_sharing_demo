import React, { useState } from "react";
import "./App.css";

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [matches, setMatches] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      last_name: lastName.trim().split(","),
      ssn: ssn.trim().split(","),
    }

    fetch(
      "https://3yk0fzdvdh.execute-api.us-east-1.amazonaws.com/default/return_user_info",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setMatches(response);
      })
      .catch((err) => {
        console.log("error", err);
      });

    setIsLoading(false);
  };

  return (
    <div className="App">
      <header>Test</header>
      <form className="inputs" onSubmit={fetchMatches}>
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
        {isLoading ? (<p>loading....</p>) : JSON.stringify(matches)}
      </div>
    </div>
  );
}

export default App;
