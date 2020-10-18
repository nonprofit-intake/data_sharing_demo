<Card
  key={i}
  className="resultsCard"
  text="white"
  style={{ background: "#8D4982" }}
>
  <Card.Header style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
    {capitalizeFirstLetter(match.first_name)}{" "}
    {capitalizeFirstLetter(match.last_name)}
  </Card.Header>
  <Card.Body>
    {match.enroll_date && (
      <Card.Text>
        <b>Enrolled</b>: {match.enroll_date}
      </Card.Text>
    )}
    {match.exit_date && (
      <Card.Text>
        <b>Exited</b>: {match.exit_date}
      </Card.Text>
    )}
    {match.income_at_entry && (
      <Card.Text>
        <b>Income at Entry</b>: ${match.income_at_entry}
      </Card.Text>
    )}
    {match.income_at_exit && (
      <Card.Text>
        <b>Income at Exit</b>: ${match.income_at_exit}
      </Card.Text>
    )}
    {match.exit_destination && (
      <Card.Text>
        <b>Exit Destination</b>: {match.exit_destination}
      </Card.Text>
    )}
  </Card.Body>
</Card>;
