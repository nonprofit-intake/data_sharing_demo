import React from "react";

import "./ErrorCard.css";

import Card from "react-bootstrap/Card";

function ErrorCard(props) {
  return (
    <Card className="errorCard" style={{ background: props.cardColor }}>
      <Card.Body>{props.data}</Card.Body>
    </Card>
  );
}

export default ErrorCard;
