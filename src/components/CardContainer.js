import React from "react";

import "./CardContainer.css";

import Table from "react-bootstrap/Table";

function capitalizeList(words) {
  const caps = words.map((string) => {
    if (string !== "at") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  });
  return caps;
}

function CardContainer(props) {
  return (
    <>
      <h2 className="cardContainerTitle">{props.title}</h2>
      <div className="cardContainer">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {console.log(props.matchData)}
              {Object.keys(props.matchData[0]).map((column, index) => (
                <th key={index}>
                  {capitalizeList(column.split("_")).join(" ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.matchData.map((match, index) => (
              <tr>
                <td>{index + 1}</td>
                {Object.values(match).map((field, index) => (
                  <td key={index}>{field ? field : "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CardContainer;
