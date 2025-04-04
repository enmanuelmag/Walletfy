import moment from 'moment';
import { v4 as uuid } from 'uuid';
import {
  ChatCompletionMessageParam,
  deleteModelAllInfoInCache,
  deleteModelWasmInCache,
  deleteModelInCache,
  MLCEngine,
} from '@mlc-ai/web-llm';

import DataDS from '@api/domain/ds/DataDS';

import { EventType, EventCreateType } from '@customTypes/event';
import { LLM_MODEL } from '@constants/app';
import queryClient from '@api/datasource/query';
import QKeys from '@constants/query';

const EVENTS_KEY = 'events';

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultEvents: EventType[] = [
  {
    id: uuid(),
    name: 'Salary',
    description: 'Monthly salary',
    amount: 5000,
    date: moment('2024-12-15').unix(),
    type: 'income',
  },
  {
    id: uuid(),
    name: 'Rent',
    description: 'Monthly rent',
    amount: 1000,
    date: moment('2024-12-27').unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: moment('2024-12-29').unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Amazon shopping',
    description: 'Bought some items on Amazon',
    amount: 200,
    date: moment('2025-01-15').unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'New brand RTX 5090',
    description: "I won't never recovery financially from this",
    amount: 4800,
    date: moment('2025-01-15').unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Salary',
    description: 'Weekly groceries',
    amount: 5000,
    date: moment('2025-01-20').unix(),
    type: 'income',
  },
];

class LocalStorageDS extends DataDS {
  engine: MLCEngine | null = null;
  percentageModel: number;

  constructor() {
    super();

    const eventsRaw = localStorage.getItem(EVENTS_KEY);

    if (!eventsRaw) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
    }

    this.percentageModel = 0;
    this.loadModel();
  }

  getPercentage(): number {
    return this.percentageModel;
  }

  loadEvents(): EventType[] {
    try {
      const eventsRaw = localStorage.getItem(EVENTS_KEY) || '[]';

      const events = JSON.parse(eventsRaw) as EventType[];

      return events.sort((a, b) => b.date - a.date);
    } catch (error) {
      console.error('Error loading events', error);
      throw new Error('Error loading events');
    }
  }

  async loadModel() {
    await deleteModelAllInfoInCache(LLM_MODEL);
    await deleteModelWasmInCache(LLM_MODEL);
    await deleteModelInCache(LLM_MODEL);

    // this.engine = await CreateMLCEngine(LLM_MODEL, {
    //   initProgressCallback: (data) => {
    //     console.log('[DS] Progress:', data.progress, data.text);

    //     if (data.progress < 1) {
    //       this.percentageModel = data.progress;
    //     } else if (data.text.includes('Finish')) {
    //       this.percentageModel = data.progress;
    //     }

    //     queryClient.refetchQueries({
    //       queryKey: [QKeys.GET_MODEL_STATUS],
    //       exact: true,
    //     });
    //   },
    // });

    this.engine = new MLCEngine({
      initProgressCallback: (data) => {
        console.log('[DS] Progress:', data.progress, data.text);

        if (data.progress < 1) {
          this.percentageModel = data.progress;
        } else if (data.text.includes('Finish')) {
          this.percentageModel = data.progress;
        }

        queryClient.refetchQueries({
          queryKey: [QKeys.GET_MODEL_STATUS],
          exact: true,
        });
      },
    });

    await this.engine.reload(LLM_MODEL);
  }

  parseDataEvents() {
    const eventsString = this.loadEvents()
      .map(
        (event) =>
          `${event.name} (${event.description}) is a ${
            event.type
          } with amount of ${event.amount} and happens on ${moment(
            event.date * 1000
          ).format('YYYY-MM-DD')}`
      )
      .join('\n');

    console.log(eventsString);

    return eventsString;
  }

  async askModel(prompt: string) {
    if (!this.engine) {
      throw new Error('Model not loaded');
    }

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are a agent that must answer to the user information about his events of expenses and incomes The user events are:\n${this.parseDataEvents()}. Just answer the user questions based on this information. Be brief and concise.`,
      },

      { role: 'user', content: prompt },
    ];

    try {
      const response = await this.engine.chat.completions.create({
        frequency_penalty: 1.2,
        messages,
      });

      return response.choices[0].message.content ?? 'No response';
    } catch (error) {
      console.error('Error asking model', error);
      throw new Error('Error asking model');
    }
  }

  async getEvents(): Promise<EventType[]> {
    try {
      await sleep();

      return this.loadEvents();
    } catch (error) {
      console.error('Error getting events', error);
      throw new Error('Error getting events');
    }
  }
  async createEvent(event: EventCreateType) {
    try {
      await sleep();

      const events = this.loadEvents();

      const newEvent = {
        ...event,
        id: uuid(),
        date: moment().unix(),
      };

      const newEvents = [...events, newEvent];

      localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));

      return true;
    } catch (error) {
      console.error('Error creating event', error);
      throw new Error('Error creating event');
    }
  }
  async updateEvent(event: EventType) {
    try {
      await sleep();

      const events = this.loadEvents();

      const eventIndex = events.findIndex((e) => e.id === event.id);

      if (eventIndex === -1) {
        throw new Error('Event not found');
      }

      const newEvents = [...events];

      newEvents[eventIndex] = {
        ...newEvents[eventIndex],
        ...event,
      };

      console.log('Event updated', newEvents[eventIndex]);

      localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));

      return true;
    } catch (error) {
      console.error('Error updating event', error);
      throw new Error('Error updating event');
    }
  }
  async deleteEvent(id: string) {
    try {
      await sleep();

      const events = this.loadEvents();

      const newEvents = events.filter((e) => e.id !== id);

      localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));

      return true;
    } catch (error) {
      console.error('Error deleting event', error);
      throw new Error('Error deleting event');
    }
  }
  async getEvent(id: string) {
    try {
      await sleep();

      const events = this.loadEvents();

      const event = events.find((e) => e.id === id);

      if (!event) {
        throw new Error('Event not found');
      }

      return event;
    } catch (error) {
      console.error('Error getting event', error);
      throw new Error('Error getting event');
    }
  }
}

export default LocalStorageDS;
