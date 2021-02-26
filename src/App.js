import React, { useState } from "react";
import axios from "axios";

import "./App.css";

import Container from "react-bootstrap/Container";

import NavMenu from "./components/NavMenu";
import MatchForm from "./components/MatchForm";
import ErrorCard from "./components/ErrorCard";
import CardContainer from "./components/CardContainer";

const emptyResponse = {
  full_matches: [],
  partial_matches: [],
};

function App() {
  const [matches, setMatches] = useState(emptyResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [postFetch, setPostFetch] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const fetchMatches = (e, lastName, ssn, password) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      last_name: lastName.split(",").map((s) => s.trim()),
      ssn: ssn.split(",").map((s) => parseInt(s)),
      pwd: password,
    };

    const url =
      "https://z0arg6enmk.execute-api.us-east-1.amazonaws.com/api/guests";

    axios
      .post(url, data)
      .then((response) => {
        setHttpError(null);
        setIsLoading(false);
        setMatches(response.data);
        setPostFetch(true);
      })
      .catch((error) => {
        const errorMessage = error.response.data.Message
          .split(":")
          .slice(-1)[0];
        const defaultMatches = {
          full_matches: [],
          partial_matches: [],
        };
        setMatches(defaultMatches);
        setIsLoading(false);
        setHttpError(errorMessage);
      });
  };

  return (
    <Container className="container">
      <NavMenu />
      <MatchForm submitEvent={fetchMatches} loading={isLoading} />
      <div className="resultsContainer">
        {!matches.full_matches.length &&
          !matches.partial_matches.length &&
          postFetch &&
          !httpError && (
            <ErrorCard
              cardColor="#FEC357"
              data={"No guests found with the given last name"}
            />
          )}
        {httpError && <ErrorCard cardColor="#FEC357" data={httpError} />}
        {matches.full_matches.length !== 0 && (
          <CardContainer
            title="SSN and Last Name Found:"
            matchData={matches.full_matches}
            textColor="white"
            cardColor="#8D4982"
          />
        )}
        {matches.partial_matches.length !== 0 && (
          <CardContainer
            title="Last Name Found:"
            matchData={matches.partial_matches}
            textColor="white"
            cardColor="#006FBA"
          />
        )}
      </div>
    </Container>
  );
}

export default App;
