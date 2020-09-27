import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>Test</header>
      <div className="inputs">
        Input
        <input type="text" name="last_names" />
        <input type="text" name="ssn" />
        <button type="submit">Submit</button>
      </div>
      <div className="outputs">
        Outputs
      </div>
    </div>
  );
}

export default App;
