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
    <div className="container">
      <header className="nav">
        <h1>FamProm Data Sharing API</h1>
      </header>
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
    </div>
  );
}

export default App;
