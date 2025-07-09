import { useState } from "react";
import './counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    console.log('Increment clicked');                                                                           
  };

  const handleDecrement = () => {
    if (count === 0) {
      alert('Value cannot be negative! ⚠️');
    } else {
      setCount(prev => prev - 1);
    }
    console.log('Decrement clicked');
  };

  const handleReset = () => { 
    setCount(0);
    console.log('Reset clicked');
  };

  return (
    <div className="counter-box">
      <h1>⚛️ PRUTHVI COUNTER</h1>
      <div className="count-display">{count}</div>
      <div className="btn-group">
        <button onClick={handleIncrement} className="btn green">+</button>
        <button onClick={handleDecrement} className="btn red">−</button>
        <button onClick={handleReset} className="btn gray">Reset</button>
      </div>
    </div>
  );
};

export default Counter;
