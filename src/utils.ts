import { TaskList } from "./features/taskListSlice";

export function daysInMonth(date: Date): number;
export function daysInMonth(month: number, year: number): number ;
export function daysInMonth(monthOrDate: number | Date, year?: number): number {
  let date: Date;
  if (typeof(monthOrDate) ==='object') {
    date = new Date(monthOrDate.getFullYear(), monthOrDate.getMonth() + 1, 0);
  } else {
    date = new Date(year!, monthOrDate, 0);
  }
  return date.getDate();
}

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

export const arrayMove = <T>(arr: T[], fromIdx: number, toIdx: number) => {
  if (fromIdx === toIdx) return;
  const direction = fromIdx - toIdx;
  const resultIdx = direction < 0 ? toIdx - 1 : toIdx;
  const element = arr[fromIdx];
  arr.splice(fromIdx, 1);
  arr.splice(resultIdx, 0, element);
}

export const generateId = () => {
  const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export const isWhitespace = (str: string) =>  /^\s*$/.test(str);
