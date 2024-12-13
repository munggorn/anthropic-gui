import { ANTHROPIC_CONFIG } from '@/api/config';
import { ApiSettingOptions } from '@/typings/common';

export interface PromptRequest extends ApiSettingOptions {
  prompt: string;
  signal?: AbortSignal;
}

export const submitPrompt = async ({
  model,
  temperature,
  topK,
  topP,
  apiKey,
  maxTokens,
  prompt,
  signal,
}: PromptRequest) => {
  const requestBody = {
    model: "claude-3-sonnet-20240229", // Updated model name
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature,
    top_k: topK,
    top_p: topP,
    max_tokens: maxTokens,
    stream: true,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    signal: signal,
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      requestOptions,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    return response;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
};
