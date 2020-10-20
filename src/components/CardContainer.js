import React from "react";

import "./CardContainer.css";

import ResultsCard from "./components/ResultsCard";

function CardContainer(props) {
  return (
    <>
      <h2 className="cardContainerTitle">{props.title}</h2>
      <div className="cardContainer">
        {props.matchData.partial_matches.map((match, i) => (
          <ResultsCard
            key={i}
            textColor="white"
            cardColor="#006FBA"
            matchData={match}
          />
        ))}
      </div>
    </>
  );
}

export default CardContainer;