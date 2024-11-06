import { describe, it, expect, vi } from 'vitest';
import useApiClient from './useApiClient';
import WoodpeckerClient from '~/lib/api';

vi.mock('./useConfig', () => ({
  default: vi.fn(() => ({
    rootPath: '/api',
    csrf: 'csrf-token',
  })),
}));

describe('useApiClient', () => {
  it('should create a new instance of WoodpeckerClient on first call', () => {
    const apiClient = useApiClient();
    expect(apiClient).toBeInstanceOf(WoodpeckerClient);
    expect(apiClient.server).toBe('/api');
    expect(apiClient.csrf).toBe('csrf-token');
  });

  it('should return the same instance on subsequent calls', () => {
    const firstClient = useApiClient();
    const secondClient = useApiClient();
    expect(firstClient).toBe(secondClient);
  });
});
