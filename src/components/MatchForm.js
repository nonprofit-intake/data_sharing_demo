import React, { useState } from "react";

import "./MatchForm.css";

import Form from "react-bootstrap/Form";

function MatchForm(props) {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  
  return (
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
          *Last name order must match SSN order. Loading will take 10+ seconds.
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
  );
}

export default MatchForm;
