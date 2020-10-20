import React from "react";

import "./CardContainer.css";

import ResultsCard from "./ResultsCard";

function CardContainer(props) {
  return (
    <>
      <h2 className="cardContainerTitle">{props.title}</h2>
      <div className="cardContainer">
        {props.matchData.map((match, i) => (
          <ResultsCard
            key={i}
            textColor={props.textColor}
            cardColor={props.cardColor}
            matchData={match}
          />
        ))}
      </div>
    </>
  );
}

export default CardContainer;