import React, { useState } from "react";
import axios from "axios";

import "./App.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

// Used in development
const temp_response = {
  complete_matches: [
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "06-14-2018",
      exit_date: "07-28-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 459.0,
      last_name: "smith",
    },
    {
      enroll_date: "10-25-2018",
      exit_date: "11-18-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "paul",
      income_at_entry: 569.0,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "12-01-2018",
      exit_date: null,
      exit_destination: null,
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: null,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "06-14-2018",
      exit_date: "07-28-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 459.0,
      last_name: "smith",
    },
    {
      enroll_date: "10-25-2018",
      exit_date: "11-18-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "paul",
      income_at_entry: 569.0,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "12-01-2018",
      exit_date: null,
      exit_destination: null,
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: null,
      last_name: "smith",
    },
  ],
  partial_matches: [
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "paul",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "smith",
    },
  ],
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  // const [matches, setMatches] = useState({
  //   complete_matches: [],
  //   partial_matches: [],
  // });
  const [matches, setMatches] = useState(temp_response);
  const [isLoading, setIsLoading] = useState(false);
  const [postFetch, setPostFetch] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const fetchMatches = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      last_name: lastName.split(",").map((s) => s.trim()),
      ssn: ssn.split(",").map((s) => s.trim()),
      pwd: password
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
        let errorMessage = error.response.data.errorMessage.split(":").slice(-1)[0];
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
      <Navbar
        className="header"
        style={{ alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Navbar.Brand href="https://www.familypromiseofspokane.org/">
          <img
            alt=""
            className="brand"
            src={require("./fp_logo.png")}
            width="300"
          />
        </Navbar.Brand>
        <h2><a className="sourceCodeLink" href="https://github.com/nonprofit-intake/family_promise_data_sharing">Data Sharing API</a></h2>
      </Navbar>
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
        {Boolean(matches.complete_matches.length) && <h2>SSN {"&"} Last Name Match:</h2>}
        <div className="cardContainer">
          {matches.complete_matches.map((match, i) => (
            <Card
              key={i}
              className="resultsCard"
              text="white"
              style={{ background: "#8D4982" }}
            >
              <Card.Header style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {capitalizeFirstLetter(match.first_name)}{" "}
                {capitalizeFirstLetter(match.last_name)}
              </Card.Header>
              <Card.Body>
                {match.enroll_date && (
                  <Card.Text><b>Enrolled</b>: {match.enroll_date}</Card.Text>
                )}
                {match.exit_date && (
                  <Card.Text><b>Exited</b>: {match.exit_date}</Card.Text>
                )}
                {match.income_at_entry && (
                  <Card.Text>
                    <b>Income at Entry</b>: ${match.income_at_entry}
                  </Card.Text>
                )}
                {match.income_at_exit && (
                  <Card.Text><b>Income at Exit</b>: ${match.income_at_exit}</Card.Text>
                )}
                {match.exit_destination && (
                  <Card.Text>
                    <b>Exit Destination</b>: {match.exit_destination}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
        {Boolean(matches.partial_matches.length) && <h2>Last Name Match Only:</h2>}
        <div className="cardContainer">
          {matches.partial_matches.map((match, i) => (
            <Card
              key={i}
              className="resultsCard"
              text="white"
              style={{ background: "#006FBA" }}
            >
              <Card.Header style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {capitalizeFirstLetter(match.first_name)}{" "}
                {capitalizeFirstLetter(match.last_name)}
              </Card.Header>
              <Card.Body>
                
                {match.enroll_date && (
                  <Card.Text><b>Enrolled</b>: {match.enroll_date}</Card.Text>
                )}
                {match.exit_date && (
                  <Card.Text><b>Exited</b>: {match.exit_date}</Card.Text>
                )}
                {match.income_at_entry && (
                  <Card.Text>
                    <b>Income at Entry</b>: ${match.income_at_entry}
                  </Card.Text>
                )}
                {match.income_at_exit && (
                  <Card.Text><b>Income at Exit</b>: ${match.income_at_exit}</Card.Text>
                )}
                {match.exit_destination && (
                  <Card.Text>
                    <b>Exit Destination</b>: {match.exit_destination}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
