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
    model: 'claude-3-sonnet-20240229',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
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
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    signal,
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(
      `${ANTHROPIC_CONFIG.anthropicApiPrefix}/v1/messages`,
      requestOptions,
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
