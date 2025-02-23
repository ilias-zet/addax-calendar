import { TaskList } from "./features/taskListSlice";
import { store } from "./store";

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

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: true;
  counties: string[];
  launchYear: number;
  types: string[];
}

export const getTaskInfo = (taskId: string, taskList?: TaskList) => {
  const list = taskList || store.getState().tasklist;
  for (const [cellId, array] of Object.entries(list)) {
    const idx = array.findIndex(obj => obj.id === taskId);
    if (idx !== -1) return { cellId, idx, task: array[idx] };
  }
  return { cellId: '', idx: -1, task: null };
}

export const getHolidays = async (year: number): Promise<TaskList> => {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/ua`);
    const holidays = await response.json() as Holiday[];
    return holidays
      .filter(({ global }) => global)
      .reduce((acc, { name: title, date }) => ({
        ...acc,
        [date]: (acc[date] || []).concat({
          id: generateId(),
          title,
          description: ''
        }),
      }), {} as TaskList);
  } catch (err) {
    console.error(err);
    return {};
  }
}