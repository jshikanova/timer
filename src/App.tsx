import { useState, useCallback } from 'react';

import { convertTime, useInterval } from './helpers';

function App() {
  const [dateNow, setDateNow] = useState(0);
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const [intervalsList, setIntervalsList] = useState<number[]>([]);

  useInterval(
    () => setTime(Math.floor((Date.now() - dateNow) / 1000)),
    isStarted ? 1000 : null,
  );

  const togglePlay = useCallback(() => {
    setIsStarted(!isStarted);

    if (!isStarted) setDateNow(Date.now() - time * 1000);
  }, [isStarted, time]);

  const handleReset = useCallback(() => {
    setTime(0);
    setDateNow(0);
    setIsStarted(false);
    setIntervalsList([]);
  }, []);

  const handleIntervals = useCallback(() => {
    setIntervalsList([...intervalsList, time]);
  }, [intervalsList, time]);

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="heading">Timer:</h1>
        <div className="timer-wrapper">
          <h2 className="timer">{convertTime(time)}</h2>
          <div className="timer-wrapper__controls">
            <button className="timer-wrapper__control" onClick={togglePlay}>
              {isStarted ? 'Pause' : 'Start'}
            </button>
            <button className="timer-wrapper__control" onClick={handleReset}>
              Reset
            </button>
            <button
              className="timer-wrapper__control"
              onClick={handleIntervals}
            >
              Set Interval
            </button>
          </div>
        </div>
      </div>
      {intervalsList.length > 0 && (
        <div className="intervals-wrapper">
          <h2 className="heading">Intervals:</h2>
          <ol className="intervals-list">
            {intervalsList.map((interval, key) => (
              <li key={key} className="intervals-list__item">
                {convertTime(interval)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
