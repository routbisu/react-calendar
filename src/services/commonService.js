const monthsDict = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Get Month name from month number
 * @param {number} monthNumber Month number where 1 is January & 12 in December
 */
export const getMonthName = monthNumber => {
  return monthsDict[monthNumber - 1];
};

/**
 * Get last date of a month
 * @param {number} year
 * @param {number} month
 */
export const getLastDate = (year, month) => {
  const date = new Date(year, month, 0);
  return date.getDate();
};

/**
 * Get day from date
 * @param {number} year Year
 * @param {number} month Month number
 * @param {number} date Date
 */
export const getDayFromDate = (year, month, date, getDayNumber = false) => {
  const currentDate = new Date(year, month, date);
  const dayNumber = currentDate.getDay();
  return getDayNumber ? dayNumber : weekDays[dayNumber];
};
