import "./App.css";
import { useState, useEffect, useCallback } from "react";
import InputTimer from "./Components/InputTimer";
import ShowTimer from "./Components/ShowTimer";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      alert("Invalid Input");
      return;
    }
    setIsStart(true);
  };
  const handleReset = () => resetTimer();

  const resetTimer = () => {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };
  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") setHours(value);
    else if (id === "minutes") setMinutes(value);
    else if (id === "seconds") setSeconds(value);
  };

  const runTimer = useCallback(
    (seconds, minutes, hours, tid) => {
      if (seconds > 0) {
        setSeconds((secs) => secs - 1);
      } else if (seconds === 0 && minutes > 0) {
        setMinutes((m) => m - 1);
        setSeconds(59);
      } else if (minutes === 0) {
        setHours((h) => h - 1);
        setMinutes(59);
        setSeconds(59);
      }

      if (seconds === 0 && minutes === 0 && hours === 0) {
        handleReset();
        alert("Timer is finished");
        clearInterval(tid);
        return;
      }
    },
    [handleReset]
  );

  const handlePause = () => {
    if (!isPaused) {
      setIsPaused(true);
      clearInterval(timerId);
    } else {
      setIsPaused(false);
      runTimer(seconds, minutes, hours);
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {!isStart && (
        <InputTimer handleInput={handleInput} handleStart={handleStart} />
      )}
      {isStart && (
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handlePause={handlePause}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
