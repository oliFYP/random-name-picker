import React, { useState } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const addName = (name) => {
   
    setNames([...names, name]);
    setInputValue(''); 
  };

  const removeName = (index) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
  };

  const spinWheel = () => {
    if (names.length === 0 ) {
      alert('Please add names to the wheel.');
      return;
    } else if(names.length === 1){
      alert('Please add more than 2 names to the wheel.');
      return;
    }

    setSpinning(true);


    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      setSpinning(false);
    }, 3000); 
  };

  return (
    <div className="App">
      <h1>Spinning Wheel App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addName(inputValue);
            }
          }}
        />
        <button onClick={() => addName(inputValue)}>Add</button>
      </div>
      <button onClick={() => spinWheel()} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
      <div className={`wheel ${spinning ? 'wheel-spinning' : ''}`}>
        <div className="wheel-names">
          {names.map((name, index) => (
            <div key={index} className="wheel-name">
              {name}
              <button onClick={() => removeName(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
}

export default App;