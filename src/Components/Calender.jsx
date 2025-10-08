import React from "react";
import "./Calender.css";

const Calender = () => {
  const daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const todayDate = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(todayDate.getMonth());
  const [currentYear, setCurrentYear] = React.useState(todayDate.getFullYear());

  // Số ngày trong tháng
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push("");
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const today =
    todayDate.getFullYear() === currentYear &&
    todayDate.getMonth() === currentMonth
      ? todayDate.getDate()
      : null;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calender">
      <div className="navigate-date">
        <h2 className="month">{months[currentMonth]}</h2>
        <h2 className="year">
          {currentYear}
          <div className="buttons">
            <i className="bx bx-chevrons-left" onClick={prevMonth}></i>
            <i className="bx bx-chevrons-right" onClick={nextMonth}></i>
          </div>
        </h2>
      </div>

      <div className="weekdays">
        {daysWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {days.map((day, index) => (
          <span key={index} className={day === today ? "today" : ""}>
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calender;
