import React from 'react';
import './styles.css';
import { useState } from 'react';

function showDate() {
  const today = new Date().toLocaleDateString("en-us", {

    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",

});
  return `${today}`;
}

export default function DatePipe() {
  const [currentDate] = useState(showDate());

  return (
    <div className="date-pipe-text">
      <h5 >{currentDate}</h5>
    </div>
  );
}

