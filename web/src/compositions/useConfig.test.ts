import { describe, it, expect, vi } from 'vitest';
import useConfig from './useConfig';
import useApiClient from './useApiClient';
import WoodpeckerClient from '~/lib/api';

vi.mock('./useConfig', () => ({
  default: vi.fn(() => ({
    rootPath: '/api',
    csrf: 'csrf-token',
  })),
}));

describe('useApiClient', () => {
  it('should create an instance of WoodpeckerClient with correct parameters', () => {
    const apiClient = useApiClient();
    const config = useConfig();

    expect(apiClient).toBeInstanceOf(WoodpeckerClient);
    expect(apiClient.server).toBe(config.rootPath);
    expect(apiClient.csrf).toBe(config.csrf);
  });

  it('should return the same instance on subsequent calls', () => {
    const firstClient = useApiClient();
    const secondClient = useApiClient();

    expect(firstClient).toBe(secondClient);
  });
});
