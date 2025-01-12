import { useState } from "react";
import { getDateString } from "../utils";

const currentDate = new Date();

function useCalendar () {
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const selectedMonthStart = new Date(currentYear, selectedMonth, 1);
  const selectedMonthEnd = new Date(currentYear, selectedMonth + 1, 0);

  const prevMonthEnd = new Date(currentYear, selectedMonth, 0);
  const daysInPrevMonth = prevMonthEnd.getDate();
  const daysInSelectedMonth = selectedMonthEnd.getDate();

  const selectedMonthName = selectedMonthStart.toLocaleString('default', { year: 'numeric', month: 'long' });

  const prevRest = selectedMonthStart.getDay();
  const nextRest = (prevRest + daysInSelectedMonth >= 35 ? 6 : 13) - selectedMonthEnd.getDay();

  const showNext = () => {
    setSelectedMonth(prev => prev + 1)
  }

  const showPrev = () => {
    setSelectedMonth(prev => prev - 1)
  }

  return {
    title: selectedMonthName,
    showNext,
    showPrev,
    days: {
      prevMonth: [...new Array(prevRest)].map((_, idx) => {
        const date = daysInPrevMonth - (prevRest - idx - 1);
  
        return ({
          id: getDateString(date, selectedMonth - 1, currentYear),
          date,
          disabled: true,
        })
      }),
      selectedMonth: [...new Array(daysInSelectedMonth)].map((_, idx) => {
        const date = idx + 1;
        const id = getDateString(date, selectedMonth, currentYear);
  
        return ({
          id,
          date,
          isCurrent: id === getDateString(currentDate),
        })
      }),
      nextMonth: [...new Array(nextRest)].map((_, idx) => ({
        id: getDateString(idx + 1, selectedMonth + 1, currentYear),
        date: idx + 1,
        disabled: true,
      })),
    }
  }
}

export default useCalendar;