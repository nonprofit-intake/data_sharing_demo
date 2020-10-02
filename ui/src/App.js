import React, { useState } from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function App() {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [matches, setMatches] = useState({"matches": [], "partial_matches": []});
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
          <Form.Text>*Last name order must match SSN order.</Form.Text>
        </Form.Group>
        <Button type="submit">Find Matches</Button>
      </Form>
      <div className="resultsContainer">
        <h2>Results:</h2>
        {isLoading ? (
          <p>loading....</p>
        ) : (
          matches.matches.map((match, i) => (
            <Card
              bg="success"
              key={i}
              // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              // style={{ width: '18rem' }}
            >
              <Card.Header>Full Match</Card.Header>
              <Card.Body>
                <Card.Text>
                  {JSON.stringify(match)}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}

export default App;
