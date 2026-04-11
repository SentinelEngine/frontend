import React from 'react';
import './StatTicker.css';

const StatTicker: React.FC = () => {
  return (
    <div className="ticker">
      <div className="tick-item">
        <div className="tick-num">80%</div>
        <div className="tick-label">Bill shock rate</div>
      </div>
      <div className="tick-item">
        <div className="tick-num">30d</div>
        <div className="tick-label">Average feedback lag</div>
      </div>
      <div className="tick-item">
        <div className="tick-num">32%</div>
        <div className="tick-label">Cloud spend wasted</div>
      </div>
    </div>
  );
};

export default StatTicker;
