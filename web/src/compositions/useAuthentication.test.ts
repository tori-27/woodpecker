import { describe, it, expect, vi } from 'vitest';
import useAuthentication from './useAuthentication';

vi.mock('~/compositions/useConfig', () => ({
  default: vi.fn(() => ({
    rootPath: '/api',
    user: { id: 1, name: 'Test User' },
  })),
}));

vi.mock('~/compositions/useUserConfig', () => ({
  default: vi.fn(() => ({
    setUserConfig: vi.fn(),
  })),
}));

describe('useAuthentication', () => {
  it('should indicate authentication status based on user', () => {
    const auth = useAuthentication();
    expect(auth.isAuthenticated).toBe(true);
  });
});
