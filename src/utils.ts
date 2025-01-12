import { TaskList } from "./features/taskListSlice";

export const daysInMonth = (month: number, year: number): number =>
  new Date(year, month, 0).getDate();

export function getDateString(date: Date): string;
export function getDateString(day: number, month: number, year: number): string;
export function getDateString (dayOrDate: number | Date, month?: number, year?: number): string {
  let date: Date;
  if (typeof(dayOrDate) ==='object') {
    date = dayOrDate;
  } else {
    date = new Date(year!, month!, dayOrDate);
  }
  
  return date.toLocaleString('default', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export const isMovementAllowed = (fromCell: string, toCell: string, fromIdx: number, toIdx: number) => {
  const isFromCurrentCell = fromCell === toCell;
  return isFromCurrentCell
    ? fromIdx < toIdx - 1 || fromIdx > toIdx
    : true;
}

const isObject = (x: object) => {
  return typeof x === 'object' && !Array.isArray(x) && x !== null;
}

export const getTaskListFromStorage = (): TaskList => {
  try {
    const taskList = JSON.parse(localStorage.getItem('addax-calendar-task-list') || '{}');
    return isObject(taskList) ? taskList : {};
  } catch {
    return {};
  }
}

export const setTaskListToStorage = (taskList: TaskList) => {
  localStorage.setItem('addax-calendar-task-list', JSON.stringify(taskList));
}
