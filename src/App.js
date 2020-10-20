import React, { useState } from "react";
import axios from "axios";

import "./App.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import ResultsCard from "./components/ResultsCard";
import NavMenu from "./components/NavMenu";

// FOR DEVELOPMENT
// import tempResponse from "./tempResponse.js";

const emptyResponse = {
  complete_matches: [],
  partial_matches: [],
};

function App() {
  const [matches, setMatches] = useState(emptyResponse);
  // const [matches, setMatches] = useState(tempResponse); // DEV
  const [isLoading, setIsLoading] = useState(false);
  const [postFetch, setPostFetch] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const fetchMatches = (e, lastName, ssn, password) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      last_name: lastName.split(",").map((s) => s.trim()),
      ssn: ssn.split(",").map((s) => s.trim()),
      pwd: password,
    };

    const url =
      "https://3yk0fzdvdh.execute-api.us-east-1.amazonaws.com/default/return_user_info";

    axios
      .post(url, data)
      .then((response) => {
        setHttpError(null);
        setIsLoading(false);
        setMatches(response.data);
        setPostFetch(true);
      })
      .catch((error) => {
        let errorMessage = error.response.data.errorMessage
          .split(":")
          .slice(-1)[0];
        let defaultMatches = {
          complete_matches: [],
          partial_matches: [],
        };
        setMatches(defaultMatches);
        setIsLoading(false);
        setHttpError(errorMessage);
      });
  };

  return (
    <Container className="container">
      <NavMenu />
      <Form className="matchForm" onSubmit={fetchMatches}>
        <Form.Group>
          <Form.Label style={{ fontFamily: "Comfortaa, cursive" }}>
            Last Name(s)
          </Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Separate multiple last names with a comma"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontFamily: "Comfortaa, cursive" }}>
            SSN(s)
          </Form.Label>
          <Form.Control
            type="text"
            name="ssn"
            placeholder="Separate multiple SSNs with a comma"
            value={ssn}
            onChange={(event) => setSSN(event.target.value)}
          />
          <Form.Text>
            *Last name order must match SSN order. Loading will take 10+
            seconds.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontFamily: "Comfortaa, cursive" }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        {isLoading ? (
          <Button style={{ background: "#006FBA" }} disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          <Button type="submit" style={{ background: "#006FBA" }}>
            Find Matches
          </Button>
        )}
      </Form>
      <div className="resultsContainer">
        {!matches.complete_matches.length &&
          !matches.partial_matches.length &&
          postFetch &&
          !httpError && (
            <Card className="noMatchCard" style={{ background: "#FEC357" }}>
              <Card.Body>
                No guests found with given last name or SSN.
              </Card.Body>
            </Card>
          )}
        {httpError && (
          <Card className="errorCard" style={{ background: "#FEC357" }}>
            <Card.Body>Error: {httpError}</Card.Body>
          </Card>
        )}
        {Boolean(matches.complete_matches.length) && (
          <h2>SSN {"&"} Last Name Match:</h2>
        )}
        <div className="cardContainer">
          {matches.complete_matches.map((match, i) => (
            <ResultsCard
              key={i}
              textColor="white"
              cardColor="#8D4982"
              matchData={match}
            />
          ))}
        </div>
        {Boolean(matches.partial_matches.length) && (
          <h2>Last Name Match Only:</h2>
        )}
        <div className="cardContainer">
          {matches.partial_matches.map((match, i) => (
            <ResultsCard
              key={i}
              textColor="white"
              cardColor="#006FBA"
              matchData={match}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
