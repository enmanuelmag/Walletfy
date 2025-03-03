// main.ts
import DataRepo from '@api/datasource';
import { LLM_MODEL } from '@constants/app';
import {
  ChatCompletionRequest,
  CreateWebWorkerMLCEngine,
} from '@mlc-ai/web-llm';

export async function askToModel(prompt: string) {
  const engine = await CreateWebWorkerMLCEngine(
    new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
    }),
    LLM_MODEL,
    {
      initProgressCallback: (progress) => {
        console.log(`Worker Progress: ${progress.progress}`);
      },
    } // engineConfig
  );

  try {
    const context = DataRepo.parseDataEvents();

    const request: ChatCompletionRequest = {
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
