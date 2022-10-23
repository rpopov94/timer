import React from "react";
import "./styles.css";
import Timer from "./NewTimer";

/**
 * По нажатию на Add должен появляться новый таймер.
 * Таймеры должны пропадать по истечении своего времени, либо при нажатии.
 * Текущие баги:
 *   - Если добавить таймер на 20 секунд, и подвигать ползунок времени,
 *     то таймер пропадет раньше, чем через 20 секунд.
 *   - Если добавить таймер на 5 секунд, и через секунду добавить еще один,
 *     то они пропадут одновременно, а не с интервалом в секунду.
 *   - Красные ошибки в консоли (см. консоль сендбокса, не инспектора).
 */

export default function App() {
  const [timers, setTimers] = React.useState([]); // { maxMs: number }[]
  const [newMaxMs, setNewMaxMs] = React.useState(5000);

  const addTimer = React.useCallback(() => {
    setTimers((currentTimers) => {
      const newTimers = currentTimers.slice();
      newTimers.push({
        maxMs: newMaxMs,
        id: currentTimers.length
          ? (a) => {
              let r = {};
              return a.filter((i) => (r.hasOwnProperty(i) ? !1 : (r[i] = !0)));
            }
          : 0
      });
      return newTimers;
    });
  }, [newMaxMs]);

  const removeTimerAt = React.useCallback((idx) => {
    setTimers((currentTimers) => {
      return currentTimers.filter((timer) => timer.id !== idx);
    });
  }, []);

  return (
    <div>
      <label>
        New timer length:
        <input
          type="range"
          min="1000"
          max="20000"
          step="100"
          value={newMaxMs}
          onChange={(e) => setNewMaxMs(Number(e.target.value))}
        />
        {(newMaxMs / 1000).toFixed(1)}s
      </label>{" "}
      <button onClick={addTimer}>Add</button>
      <hr />
      <div className="grid">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            maxMs={timer.maxMs}
            onOver={() => removeTimerAt(timer.id)}
            onRemove={() => removeTimerAt(timer.id)}
          />
        ))}
      </div>
    </div>
  );
}
