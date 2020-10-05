import React, { useState } from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const temp_response = {
  complete_matches: [
    {
      enroll_date: "11-18-2018",
      exit_date: "01-13-2019",
      exit_destination: "Rental by client, other ongoing housing subsidy",
      first_name: "britney",
      income_at_entry: null,
      income_at_exit: 569.0,
      last_name: "estabrooks",
    },
    {
      enroll_date: "06-14-2018",
      exit_date: "07-28-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "britney",
      income_at_entry: null,
      income_at_exit: 459.0,
      last_name: "estabrooks",
    },
    {
      enroll_date: "10-25-2018",
      exit_date: "11-18-2018",
      exit_destination:
        "Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter",
      first_name: "britney",
      income_at_entry: 569.0,
      income_at_exit: 569.0,
      last_name: "estabrooks",
    },
    {
      enroll_date: "12-01-2018",
      exit_date: null,
      exit_destination: null,
      first_name: "britney",
      income_at_entry: null,
      income_at_exit: null,
      last_name: "estabrooks",
    },
  ],
  partial_matches: [{ first_name: "liliya", last_name: "kryshtal" }],
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  // const [matches, setMatches] = useState({"complete_matches": [], "partial_matches": []});
  const [matches, setMatches] = useState(temp_response);
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
          <img
            alt=""
            className="brand"
            src={require("./fp_logo.png")}
            width="300"
          />
        </Navbar.Brand>
        <h2>Data Sharing API</h2>
      </Navbar>
      <Form className="matchForm" onSubmit={fetchMatches}>
        <Form.Group>
          <Form.Label>Last Name(s)</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Separate multiple last names with a comma"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>SSN(s)</Form.Label>
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
        <Button type="submit">Find Matches</Button>
      </Form>
      <div className="resultsContainer">
        <h2>Results:</h2>
        {isLoading ? (
          <p>loading....</p>
        ) : (
          <div className="cardContainer">
            {matches.complete_matches.map((match, i) => (
              <Card
                bg="success"
                key={i}
                text="white"
                className="card"
              >
                <Card.Header>Full Match</Card.Header>
                <Card.Body>
                  <Card.Text>First: {capitalizeFirstLetter(match.first_name)}</Card.Text>
                  <Card.Text>Last: {capitalizeFirstLetter(match.last_name)}</Card.Text>
                  <Card.Text>Enrolled: {match.enroll_date}</Card.Text>
                  <Card.Text>Exited: {match.exit_date}</Card.Text>
                  <Card.Text>Income at Entry: ${match.income_at_entry}</Card.Text>
                  <Card.Text>Income at Exit: ${match.income_at_exit}</Card.Text>
                  <Card.Text>Exit Destination: {match.exit_destination}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
