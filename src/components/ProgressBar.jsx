// src/components/ProgressBar.jsx
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [inputs, setInputs] = useState([{ id: 1, value: 0 }]);
  const [mainProgress, setMainProgress] = useState(0);

  useEffect(() => {
    if (inputs.length > 0) {
      const total = inputs.reduce((sum, input) => sum + Math.min(Math.max(input.value, 0), 100), 0);
      const average = total / inputs.length;
      setMainProgress(Math.round(average));
    }
  }, [inputs]);

  const handleInputChange = (id, value) => {
    let numValue = parseInt(value) || 0;
    if (numValue < 0) numValue = 0;
    if (numValue > 100) numValue = 100;

    setInputs(inputs.map(input =>
      input.id === id ? { ...input, value: numValue } : input
    ));
  };

  const addInput = () => {
    const newId = inputs.length > 0 ? Math.max(...inputs.map(i => i.id)) + 1 : 1;
    setInputs([...inputs, { id: newId, value: 0 }]);
  };

  const removeInput = (id) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter(input => input.id !== id));
    }
  };

  const getColor = (percentage) => {
    if (percentage < 40) return '#f56565'; // Red
    if (percentage < 70) return '#ecc94b'; // Yellow
    return '#48bb78'; // Green
  };

  const getWidthStyle = (percentage) => ({
    width: `${percentage}%`,
    backgroundColor: getColor(percentage),
    transition: 'width 0.5s ease, background-color 0.5s ease'
  });

  return (
    <div className="progress-container">
      <div className="main-progress-section">
        <h3>Main Progress Bar</h3>
        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={getWidthStyle(mainProgress)}
            >
              <span className="progress-text">{mainProgress}%</span>
            </div>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-label">Average:</span>
              <span className="stat-value">{mainProgress}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Inputs:</span>
              <span className="stat-value">{inputs.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="inputs-section">
        <div className="section-header">
          <h3>Input Controls</h3>
          <button onClick={addInput} className="add-input-btn">
            <i className="fas fa-plus"></i> Add Input
          </button>
        </div>

        <div className="inputs-grid">
          {inputs.map((input) => (
            <div key={input.id} className="input-item">
              <div className="input-header">
                <label>Input #{input.id} (0-100)</label>
                {inputs.length > 1 && (
                  <button
                    onClick={() => removeInput(input.id)}
                    className="remove-btn"
                    aria-label="Remove input"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="progress-input"
                placeholder="Enter 0-100"
              />
              <div className="input-progress-bar">
                <div
                  className="input-progress-fill"
                  style={getWidthStyle(input.value)}
                >
                  <span>{input.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="color-guide">
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#f56565' }}></div>
          <span>Low (&lt; 40%)</span>
        </div>
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#ecc94b' }}></div>
          <span>Medium (40-70%)</span>
        </div>
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#48bb78' }}></div>
          <span>High (&gt; 70%)</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;