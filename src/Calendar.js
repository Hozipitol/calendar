import React, { useState, useMemo } from 'react';
import './cal.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState( new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const days = useMemo(() => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  /* In totalDays we are calculating the number of days of the curent month, by checking the next month's 0th day which gives the last day of this month*/
  const totalDays = new Date(year, month + 1, 0).getDate();

  /*
    Getting the index of the current month so we know which day of the week the month will start. For example April 2025 started on tuesday which is on index 2
    Considering Sunday = index , Mon = 1, Tues = 2 and so on... So we know from where our grid will start filling days
  */
  const firstDay = new Date(year, month, 1).getDay();

  /* creating an array of nulls till length = firstDay(2 in April) to represent empty slots before the first day of the month */ 
  const daysArray = Array(firstDay).fill(null);

  /*
    Fill the month grid for every day and its respective date, by filling the days starting from number 1 and pushing after the null space in array to start with months starting day of week.
    every date is a object which has the day(date number), and 3 other props to check if current day is today's date, or previous date or if it matches the selected date
  */
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

/*
  shift the calendar view by `offset` months, reset currentDate to the 1st of that month, and clear any selected date
*/
  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDate(null);
  };
/*
  build a Date for the clicked day in the current month/year, and if it's today or in the future, mark it as selected
*/
  const handleDateClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (date >= today) setSelectedDate(date);
    
  };

  return (
    <div className="calendar">
      <div className="header">
        <button className='nav-button' onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button className='nav-button' onClick={() => changeMonth(1)}>&gt;</button>
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
