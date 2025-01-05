import { useState } from "react";
import { getDateString } from "../utils";

const date = new Date();

function useCalendar () {
  const currentYear = date.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());

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
        const day = daysInPrevMonth - (prevRest - idx - 1);
  
        return ({
          day,
          key: getDateString(day, selectedMonth - 1, currentYear),
          disabled: true,
        })
      }),
      selectedMonth: [...new Array(daysInSelectedMonth)].map((_, idx) => {
        const day = idx + 1;
        const key = getDateString(day, selectedMonth, currentYear);
  
        return ({
          day,
          key,
          isCurrent: key === getDateString(date),
        })
      }),
      nextMonth: [...new Array(nextRest)].map((_, idx) => ({
        day: idx + 1,
        key: getDateString(idx + 1, selectedMonth + 1, currentYear),
        disabled: true,
      })),
    }
  }
}

export default useCalendar;