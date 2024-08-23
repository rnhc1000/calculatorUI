import { useState } from 'react';

function showDate() {
  const today = new Date();
  const time = today.toLocaleString(); 
  return `${time}`;
}

export default function DatePipe() {
  const [currentDate, setCurrentDate] = useState(showDate());

  return (
    <div className="date-pipe-text">
      <h5 >{currentDate}</h5>
    </div>
  );
}

