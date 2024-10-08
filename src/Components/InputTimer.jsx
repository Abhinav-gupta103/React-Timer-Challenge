import React from "react";

const InputTimer = ({ handleInput, handleStart }) => {
  return (
    <>
      <div className="input-container">
        <div className="input-box">
          <input min={0} id="hours" placeholder="HH" onChange={handleInput} />
          <input id="minutes" placeholder="MM" onChange={handleInput} />
          <input id="seconds" placeholder="SS" onChange={handleInput} />
        </div>
        <button onClick={handleStart} className="timer-button">
          Start
        </button>
      </div>
    </>
  );
};

export default InputTimer;
