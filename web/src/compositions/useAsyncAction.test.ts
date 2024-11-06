import { describe, it, expect, vi } from 'vitest';
import { useAsyncAction } from './useAsyncAction';

describe('useAsyncAction', () => {
  it('should execute the action and set isLoading correctly', async () => {
    const mockAction: () => Promise<void> = vi.fn(async () => Promise.resolve());
    const { doSubmit, isLoading } = useAsyncAction(mockAction);

    expect(isLoading.value).toBe(false);

    const submitPromise = doSubmit();
    expect(isLoading.value).toBe(true);

    await submitPromise;
    expect(isLoading.value).toBe(false);
    expect(mockAction).toHaveBeenCalled();
  });

  it('should handle errors correctly', async () => {
    const error = new Error('Test error');
    const mockAction: () => Promise<void> = vi.fn(async () => {
      throw error;
    });
    const mockOnError = vi.fn();
    const { doSubmit, isLoading } = useAsyncAction(mockAction, mockOnError);

    await doSubmit();
    expect(mockAction).toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalledWith(error);
    expect(isLoading.value).toBe(false);
  });

  it('should not execute the action if already loading', async () => {
    const mockAction: () => Promise<void> = vi.fn(async () => new Promise<void>(() => {}));
    const { doSubmit, isLoading } = useAsyncAction(mockAction);

    void doSubmit();
    expect(isLoading.value).toBe(true);

    await doSubmit();
    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(isLoading.value).toBe(true);
  });
});
