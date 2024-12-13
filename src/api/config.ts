export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? '/api/anthropic'
    : 'http://localhost:3000/api/anthropic',
} as const;
