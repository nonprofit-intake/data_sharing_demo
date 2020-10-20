import React from "react";

import "./ResultsCard.css";

import Card from "react-bootstrap/Card";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ResultsCard(props) {
  return (
    <Card
      key={props.i}
      className="resultsCard"
      text={props.textColor}
      style={{ background: props.cardColor }}
    >
      <Card.Header style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        {capitalizeFirstLetter(props.matchData.first_name)}{" "}
        {capitalizeFirstLetter(props.matchData.last_name)}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Enrolled</b>:{" "}
          {props.matchData.enroll_date
            ? props.matchData.enroll_date
            : "Not available"}
        </Card.Text>
        <Card.Text>
          <b>Exited</b>:{" "}
          {props.matchData.exit_date
            ? props.matchData.exit_date
            : "Not available"}
        </Card.Text>
        <Card.Text>
          <b>Income at Entry</b>:{" "}
          {props.matchData.income_at_entry
            ? "$" + props.matchData.income_at_entry
            : "Not available"}
        </Card.Text>
        <Card.Text>
          <b>Income at Exit</b>:{" "}
          {props.matchData.income_at_exit
            ? "$" + props.matchData.income_at_exit
            : "Not available"}
        </Card.Text>
        <Card.Text>
          <b>Exit Destination</b>:{" "}
          {props.matchData.exit_destination
            ? props.matchData.exit_destination
            : "Not available"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ResultsCard;
