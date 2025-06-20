import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        const result = eval(input.replace("×", "*").replace("÷", "/"));
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(prev => prev + value);
    }
  };

  const buttons = [
    { label: "C", type: "control" },
    { label: "±", type: "control" },
    { label: "%", type: "control" },
    { label: "÷", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "0", type: "number", wide: true },
    { label: ".", type: "number" },
    { label: "=", type: "operator" }
  ];

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="button-grid">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`btn ${btn.type} ${btn.wide ? "wide" : ""}`}
            onClick={() => handleClick(btn.label)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;



