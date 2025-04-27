import React, { useState, useMemo } from 'react';
import './cal.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {
  
  const [currentDate, setCurrentDate] = useState( new Date());
  console.log(currentDate)
  const [selectedDate, setSelectedDate] = useState(null);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const days = useMemo(() => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysArray = Array(firstDay).fill(null);

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    daysArray.push({
      day,
      isToday: date.toDateString() === today.toDateString(),
      isPast: date < today,
      isSelected: selectedDate?.toDateString() === date.toDateString(),
    });
  }
    return daysArray;
  }, [currentDate, selectedDate, today]);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (date >= today) setSelectedDate(date);
    
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="days-grid">
        {WEEK_DAYS.map((day, idx) => (
            <div key={`${day}-${idx}`} className="day-header">{day}</div>
        ))}
        {days.map((day, idx) => (
          day ? (
            <div
              key={idx}
              onClick={() => handleDateClick(day.day)}
              className={`day ${day.isToday ? 'today' : ''} ${day.isPast ? 'past' : ''} ${day.isSelected ? 'selected' : ''}`}
            >
              {day.day}
            </div>
          ) : (
            <div key={idx} className="day empty"></div>
          )
        ))}
      </div>
    </div>
  );
};

export default Calendar;
