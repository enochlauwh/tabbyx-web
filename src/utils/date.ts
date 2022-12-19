import dayjs from 'dayjs';
import { Day } from 'react-modern-calendar-datepicker';

const getCalendarAvailableRange = () => {
  const today = dayjs();
  const startDate = today.add(2, 'days'); // 2 business days in advance
  const endDate = today.add(3, 'weeks'); // 3 weeks in advance maximum

  return {
    minimumDate: {
      year: startDate.year(),
      month: startDate.month() + 1, // month is 0-indexed
      day: startDate.date(),
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
