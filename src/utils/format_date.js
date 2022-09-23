import dayjs from 'dayjs';

export function formatDate(date, formatStr = 'MM月DD日') {
  return dayjs(date).format(formatStr);
}

export function getDiffDays(start, end) {
  return dayjs(end).diff(start, 'day');
}
