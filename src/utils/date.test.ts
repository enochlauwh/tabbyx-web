import * as DateUtils from './date';
import { describe, test, afterEach, expect } from 'vitest';
import MockDate from 'mockdate';
import dayjs from 'dayjs';

describe('DateUtils', () => {
  describe('getCalendarAvailableRange', () => {
    afterEach(() => {
      MockDate.reset();
    });

    test('it should get the range for today until 3 weeks from today', () => {
      MockDate.set('2020-01-01');
      const today = dayjs();
      const startDate = today.add(2, 'days'); // 2 business days in advance
      const endDate = today.add(3, 'weeks');

      const { minimumDate, maximumDate } =
        DateUtils.getCalendarAvailableRange();

      expect(minimumDate).toEqual({
        year: startDate.year(),
        month: startDate.month() + 1,
        day: startDate.date(),
      });

      expect(maximumDate).toEqual({
        year: endDate.year(),
        month: endDate.month() + 1,
        day: endDate.date(),
      });
    });
  });

  describe('getCalendarDisabledDays', () => {
    afterEach(() => {
      MockDate.reset();
    });

    test('it should return all weekend days', () => {
      MockDate.set('2020-01-01');

      const disabledDays = DateUtils.getCalendarDisabledDays();
      const expectedResult = [
        { year: 2020, month: 1, day: 4 },
        { year: 2020, month: 1, day: 5 },
        { year: 2020, month: 1, day: 11 },
        { year: 2020, month: 1, day: 12 },
        { year: 2020, month: 1, day: 18 },
        { year: 2020, month: 1, day: 19 },
      ];

      expect(disabledDays).toEqual(expectedResult);
    });
  });
});
