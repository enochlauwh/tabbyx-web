import dayjs from 'dayjs';
import { Day } from 'react-modern-calendar-datepicker';

const getCalendarAvailableRange = () => {
  const today = dayjs();
  const endDate = today.add(3, 'weeks');

  return {
    minimumDate: {
      year: today.year(),
      month: today.month() + 1, // month is 0-indexed
      day: today.date(),
    },
    maximumDate: {
      year: endDate.year(),
      month: endDate.month() + 1, // month is 0-indexed
      day: endDate.date(),
    },
  };
};

const getCalendarDisabledDays = () => {
  const currentDate = dayjs();
  const endDate = currentDate.add(3, 'weeks');

  const disabledDays: Day[] = [];
  // Disable all weekends
  for (let i = currentDate; i.isBefore(endDate); i = i.add(1, 'day')) {
    if (i.day() === 0 || i.day() === 6) {
      disabledDays.push({
        year: i.year(),
        month: i.month() + 1,
        day: i.date(),
      });
    }
  }
  return disabledDays;
};

export { getCalendarAvailableRange, getCalendarDisabledDays };
