import React, { useState } from "react";

import "./MatchForm.css";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const formLabelStyles = {
  fontFamily: "Comfortaa, cursive",
  fontWeight: "bold",
};

function MatchForm(props) {
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      className="matchForm"
      onSubmit={(e) => props.submitEvent(e, lastName, ssn, password)}
    >
      <Form.Group>
        <Form.Label style={formLabelStyles}>Last Name(s)</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Separate multiple last names with commas"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label style={formLabelStyles}>SSN(s)</Form.Label>
        <Form.Control
          type="text"
          name="ssn"
          placeholder="Separate multiple SSNs with commas"
          value={ssn}
          onChange={(event) => setSSN(event.target.value)}
        />
        <Form.Text>
          *Last name order must match SSN order. Loading will take 10+ seconds.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label style={formLabelStyles}>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {props.errorMessage === "Invalid password" && (
          <Alert variant={"danger"} style={{ marginTop: "0.5em" }}>
            <b>{props.errorMessage}</b>: please try again or contact Family
            Promise IT/Data Systems Manager.
          </Alert>
        )}
      </Form.Group>
      {props.loading ? (
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
