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