// src/components/CountdownTimer.jsx
import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [status, setStatus] = useState('Ready');
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const savedTimer = localStorage.getItem('countdownTimer');
    if (savedTimer) {
      try {
        const timerData = JSON.parse(savedTimer);
        const { savedTime, savedTimeLeft, savedIsRunning, savedIsPaused } = timerData;
        
        if (savedTimeLeft && savedTime) {
          const elapsed = Math.floor((Date.now() - savedTime) / 1000);
          const newTimeLeft = Math.max(savedTimeLeft - elapsed, 0);
          
          setTimeLeft(newTimeLeft);
          
          if (newTimeLeft > 0 && savedIsRunning && !savedIsPaused) {
            startTimer(newTimeLeft);
          } else if (newTimeLeft <= 0) {
            setIsCompleted(true);
            setStatus('Completed');
          } else if (savedIsPaused) {
            setIsPaused(true);
            setStatus('Paused');
          }
        }
      } catch (error) {
        console.error('Error parsing saved timer:', error);
        localStorage.removeItem('countdownTimer');
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0 || isRunning || isPaused) {
      localStorage.setItem('countdownTimer', JSON.stringify({
        savedTime: startTimeRef.current || Date.now(),
        savedTimeLeft: timeLeft,
        savedIsRunning: isRunning,
        savedIsPaused: isPaused
      }));
    }
  }, [timeLeft, isRunning, isPaused]);

  const startTimer = (startFrom = initialTime) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);
    setStatus('Running');
    setTimeLeft(startFrom);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsCompleted(true);
          setStatus('Completed');
          localStorage.removeItem('countdownTimer');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsPaused(true);
      setIsRunning(false);
      setStatus('Paused');
    }
  };

  const resumeTimer = () => {
    if (!isCompleted && isPaused) {
      startTimer(timeLeft);
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    setTimeLeft(initialTime);
    setStatus('Ready');
    localStorage.removeItem('countdownTimer');
  };

  const handleInitialTimeChange = (e) => {
    const value = parseInt(e.target.value) || 10;
    if (value > 0 && !isRunning) {
      setInitialTime(value);
      if (!isRunning && !isCompleted) {
        setTimeLeft(value);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = 0;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
  };

  const getTimeColor = () => {
    const percentage = (timeLeft / initialTime) * 100;
    if (percentage > 70) return '#48bb78';
    if (percentage > 30) return '#ecc94b';
    return '#f56565';
  };

  return (
    <div className="timer-container">
      <div className="timer-config">
        <div className="config-group">
          <label htmlFor="initialTime">Set Initial Time (seconds)</label>
          <input
            type="number"
            id="initialTime"
            min="1"
            value={initialTime}
            onChange={handleInitialTimeChange}
            disabled={isRunning}
            className="time-input"
          />
          <p className="config-hint">Positive integers only. Disabled while timer is running.</p>
        </div>
      </div>

      <div className="timer-display">
        <div 
          className="time-circle"
          style={{ 
            borderColor: getTimeColor(),
            background: `conic-gradient(${getTimeColor()} ${(timeLeft/initialTime)*100}%, #e2e8f0 0%)`
          }}
        >
          <div className="time-text">
            <span className="time-value">{formatTime(timeLeft)}</span>
            <span className="time-status">{status}</span>
          </div>
        </div>
        
        {isCompleted && (
          <div className="completed-message">
            <i className="fas fa-hourglass-end"></i>
            <h3>Time's Up!</h3>
            <p>Countdown completed successfully</p>
          </div>
        )}
      </div>

      <div className="timer-controls">
        {!isCompleted && !isRunning && !isPaused && (
          <button 
            onClick={() => startTimer()} 
            className="control-btn start-btn"
          >
            <i className="fas fa-play"></i> Start
          </button>
        )}
        
        {isRunning && (
          <button 
            onClick={pauseTimer} 
            className="control-btn pause-btn"
          >
            <i className="fas fa-pause"></i> Pause
          </button>
        )}
        
        {isPaused && !isCompleted && (
          <button 
            onClick={resumeTimer} 
            className="control-btn resume-btn"
          >
            <i className="fas fa-play"></i> Resume
          </button>
        )}
        
        <button 
          onClick={resetTimer} 
          disabled={(!isRunning && !isPaused && timeLeft === initialTime && !isCompleted)}
          className="control-btn reset-btn"
        >
          <i className="fas fa-redo"></i> Reset
        </button>
      </div>

      <div className="timer-state">
        <div className="state-item">
          <span className="state-label">Status:</span>
          <span className={`state-value ${status.toLowerCase()}`}>{status}</span>
        </div>
        <div className="state-item">
          <span className="state-label">Initial Time:</span>
          <span className="state-value">{initialTime}s</span>
        </div>
        <div className="state-item">
          <span className="state-label">Time Remaining:</span>
          <span className="state-value">{timeLeft}s</span>
        </div>
        <div className="state-item">
          <span className="state-label">Progress:</span>
          <span className="state-value">
            {initialTime > 0 ? Math.round(((initialTime - timeLeft) / initialTime) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="timer-info">
        <p><i className="fas fa-info-circle"></i> Timer state persists through page refresh</p>
        <p><i className="fas fa-exclamation-circle"></i> Only one timer can run at a time</p>
      </div>
    </div>
  );
};

export default CountdownTimer;