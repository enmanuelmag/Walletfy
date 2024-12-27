import moment from 'moment';
import { v4 as uuid } from 'uuid';

import DataDS from '@api/domain/ds/DataDS';

import { EventType, EventCreateType } from '@customTypes/event';

const EVENTS_KEY = 'events';

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultEvents: EventType[] = [
  {
    id: uuid(),
    name: 'Salary',
    description: 'Monthly salary',
    amount: 5000,
    date: moment().unix(),
    type: 'income',
  },
  {
    id: uuid(),
    name: 'Rent',
    description: 'Monthly rent',
    amount: 1000,
    date: moment().unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: moment().unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: moment('2025-01-15').unix(),
    type: 'expense',
  },
  {
    id: uuid(),
    name: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: moment('2025-01-20').unix(),
    type: 'income',
  },
];

class LocalStorageDS extends DataDS {
  constructor() {
    super();

    const eventsRaw = localStorage.getItem(EVENTS_KEY);

    if (!eventsRaw) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
    }
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

      newEvents[eventIndex] = event;

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
