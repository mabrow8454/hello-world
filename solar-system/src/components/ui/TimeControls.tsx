import { useAppStore } from '@/store/appStore';
import './TimeControls.css';

const TIME_SPEEDS = [1, 10, 100, 1000];

export function TimeControls() {
  const { isPaused, timeSpeed, setIsPaused, setTimeSpeed, resetTime } = useAppStore();

  return (
    <div className="time-controls">
      <div className="control-group">
        <button
          className="control-button"
          onClick={() => setIsPaused(!isPaused)}
          title={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>

        <button
          className="control-button"
          onClick={resetTime}
          title="Reset Time"
        >
          ↺
        </button>
      </div>

      <div className="speed-controls">
        <span className="speed-label">Speed:</span>
        {TIME_SPEEDS.map((speed) => (
          <button
            key={speed}
            className={`speed-button ${timeSpeed === speed ? 'active' : ''}`}
            onClick={() => setTimeSpeed(speed)}
          >
            {speed}×
          </button>
        ))}
      </div>
    </div>
  );
}
