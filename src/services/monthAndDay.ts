const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const getMonthAndDay = (dayOfYear: number): string => {
  if (dayOfYear < 1 || dayOfYear > 366) return '-';

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let month = 0;
  let day = dayOfYear;

  if (dayOfYear > 59) {
    if ((dayOfYear % 4 === 0 && dayOfYear % 100 !== 0) || dayOfYear % 400 === 0)
      monthDays[1] = 29;
  }

  for (let i = 0; i < monthDays.length; i++) {
    if (day <= monthDays[i]) {
      month = i;
      break;
    }
    day -= monthDays[i];
  }

  return `${day} ${monthNames[month]}`;
};
