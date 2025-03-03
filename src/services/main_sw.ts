import DataRepo from '@api/datasource';
import { LLM_MODEL } from '@constants/app';
import * as webllm from '@mlc-ai/web-llm';

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        new URL('sw.ts', import.meta.url),
        { type: 'module' }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

export async function askToModel(prompt: string) {
  console.log('Asking model');
  const initProgressCallback = (report: webllm.InitProgressReport) => {
    console.log(`SW Progress: ${report.progress}`);
  };

  console.log('CREATING ENGINE: CreateServiceWorkerMLCEngine');

  //await navigator.serviceWorker.ready; // <<----- WAIT TO BE READY

  console.log('Model loading');

  const engine: webllm.ServiceWorkerMLCEngine =
    await webllm.CreateServiceWorkerMLCEngine(LLM_MODEL, {
      initProgressCallback,
      logLevel: 'DEBUG',
    });

  console.log('Model loaded');

  try {
    const context = DataRepo.parseDataEvents();

    const request: webllm.ChatCompletionRequest = {
      messages: [
        {
          role: 'system',
          content: `You are a agent that must answer to the user information about his events of expenses and incomes The user events are:\n${context}`,
        },

        { role: 'user', content: prompt },
      ],
      n: 3,
      temperature: 1.5,
      max_tokens: 256,
    };

    console.log('Requesting completion');

    const reply0 = await engine.chat.completions.create(request);

    return reply0.choices[0].message.content ?? 'No response';
  } catch (error) {
    console.error('Error loading events', error);
    throw new Error('Error loading events');
  }
}
