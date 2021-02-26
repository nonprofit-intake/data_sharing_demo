import React from "react";

import "./ResultsCard.css";

import Card from "react-bootstrap/Card";

function capitalizeFullName(firstName, lastName) {
  const names = [firstName, lastName]
  const fullName = names.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")
  return fullName;
};

const notAvailable = "N/A"

function ResultsCard(props) {
  return (
    <Card
      key={props.i}
      className="resultsCard"
      text={props.textColor}
      style={{ background: props.cardColor }}
    >
      <Card.Header style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        {capitalizeFullName(props.matchData.first_name, props.matchData.last_name)}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Enrolled</b>:{" "}
          {props.matchData.enroll_date
            ? props.matchData.enroll_date
            : notAvailable}
        </Card.Text>
        <Card.Text>
          <b>Exited</b>:{" "}
          {props.matchData.exit_date
            ? props.matchData.exit_date
            : notAvailable}
        </Card.Text>
        <Card.Text>
          <b>Income at Entry</b>:{" "}
          {props.matchData.income_at_entry
            ? "$" + props.matchData.income_at_entry
            : notAvailable}
        </Card.Text>
        <Card.Text>
          <b>Income at Exit</b>:{" "}
          {props.matchData.income_at_exit
            ? "$" + props.matchData.income_at_exit
            : notAvailable}
        </Card.Text>
        <Card.Text>
          <b>Exit Destination</b>:{" "}
          {props.matchData.exit_destination
            ? props.matchData.exit_destination
            : notAvailable}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ResultsCard;
