import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useElapsedTime } from './useElapsedTime';

describe('useElapsedTime', () => {
  it('should initialize time with the startTime value', () => {
    const running = ref(false);
    const startTime = ref(1000);

    const { time } = useElapsedTime(running, startTime);

    expect(time.value).toBe(1000);
  });

  it('should stop the timer when running is set to false', () => {
    vi.useFakeTimers();

    const running = ref(true);
    const startTime = ref(1000);

    const { time } = useElapsedTime(running, startTime);

    running.value = false;

    vi.advanceTimersByTime(2000);

    expect(time.value).toBe(1000);

    vi.useRealTimers();
  });

  it('should not start the timer if startTime is undefined', () => {
    const running = ref(true);
    const startTime = ref(undefined);

    const { time } = useElapsedTime(running, startTime);

    expect(time.value).toBeUndefined();
  });
});
