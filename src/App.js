import React, { useState } from "react";
import axios from "axios";

import "./App.css";

import Container from "react-bootstrap/Container";

import NavMenu from "./components/NavMenu";
import MatchForm from "./components/MatchForm";
import ErrorCard from "./components/ErrorCard";
import ResultsContainer from "./components/ResultsContainer";

const emptyResponse = {
  full_matches: [],
  partial_matches: [],
  not_found: []
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
        console.log(JSON.stringify(error.response.data.Message));
        const errorMessage = error.response.data.Message.split(":")[1].trim();
        const defaultMatches = emptyResponse;
        setMatches(defaultMatches);
        setIsLoading(false);
        setHttpError(errorMessage);
      });
  };

  return (
    <Container className="container">
      <NavMenu />
      <MatchForm
        submitEvent={fetchMatches}
        loading={isLoading}
        errorMessage={httpError}
      />
      <div className="resultsContainer">
        {!matches.full_matches.length &&
          !matches.partial_matches.length &&
          postFetch &&
          !httpError && (
            <ErrorCard
              cardColor="#FEC357"
              errorMessage={"No guests found with the given last name(s)"}
            />
          )}
        {httpError && httpError !== "Invalid password" && (
          <ErrorCard cardColor="#FEC357" errorMessage={httpError} />
        )}
        {matches.full_matches.length !== 0 && (
          <ResultsContainer
            title="SSN and Last Name Found:"
            matchData={matches.full_matches}
            textColor="white"
            cardColor="#8D4982"
          />
        )}
        {matches.partial_matches.length !== 0 && (
          <ResultsContainer
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
