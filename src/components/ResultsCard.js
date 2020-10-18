import React from "react";

import "./ResultsCard.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ResultsCard(props) {
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
      {props.matchData.enroll_date && (
        <Card.Text>
          <b>Enrolled</b>: {props.matchData.enroll_date}
        </Card.Text>
      )}
      {props.matchData.exit_date && (
        <Card.Text>
          <b>Exited</b>: {props.matchData.exit_date}
        </Card.Text>
      )}
      {props.matchData.income_at_entry && (
        <Card.Text>
          <b>Income at Entry</b>: ${props.matchData.income_at_entry}
        </Card.Text>
      )}
      {props.matchData.income_at_exit && (
        <Card.Text>
          <b>Income at Exit</b>: ${props.matchData.income_at_exit}
        </Card.Text>
      )}
      {props.matchData.exit_destination && (
        <Card.Text>
          <b>Exit Destination</b>: {props.matchData.exit_destination}
        </Card.Text>
      )}
    </Card.Body>
  </Card>;
}

export default ResultsCard;