import React, { useState } from 'react';
import './App.css'; // Add this line to import the CSS file

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('https://health-dev.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      alert('Invalid JSON or error in fetching data. ' + error.message);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const filteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    selectedOptions.forEach((option) => {
      filtered[option] = response[option];
    });
    return filtered;
  };

  return (
    <div className="container">
      <h1>AP21110010923</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='{"data": ["A", "C", "z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className="multi-filter">
        <label>
          <input
            type="checkbox"
            value="numbers"
            onChange={handleOptionChange}
          /> Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="alphabets"
            onChange={handleOptionChange}
          /> Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="highest_alphabet"
            onChange={handleOptionChange}
          /> Highest Alphabet
        </label>
      </div>
      <div className="filtered-response">
        {filteredResponse() && (
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default App;