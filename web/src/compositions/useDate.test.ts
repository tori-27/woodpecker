import { describe, it, expect, vi } from 'vitest';
import { useDate } from './useDate';
import dayjs from 'dayjs';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn(() => 'YYYY-MM-DD HH:mm:ss'),
  }),
}));

describe('useDate', () => {
  const { toLocaleString, timeAgo, prettyDuration, durationAsNumber } = useDate();

  it('should format date to locale string', () => {
    const date = new Date('2024-11-06T10:00:00Z');
    const result = toLocaleString(date);
    expect(result).toBe(dayjs(date).format('YYYY-MM-DD HH:mm:ss'));
  });

  it('should return correct "time ago"', () => {
    const date = new Date('2024-11-01T10:00:00Z');
    const result = timeAgo(date);
    expect(result).toBe(dayjs().to(dayjs(date)));
  });

  it('should format duration to human-readable string', () => {
    const result = prettyDuration(60000); // 1 minute
    expect(result).toBe('a minute');
  });

  it('should format duration as number string', () => {
    const result = durationAsNumber(60000); // 1 minute
    expect(result).toBe('01:00');
  });
});
