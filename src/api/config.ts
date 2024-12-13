export const ANTHROPIC_CONFIG = {
  anthropicApiPrefix: 'https://api.anthropic.com',
  defaultModel: 'claude-3-sonnet-20240229',
  apiVersion: '2023-06-01',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/api/anthropic'
    : 'http://localhost:3000/api/anthropic',
} as const;
