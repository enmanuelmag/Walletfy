import DataDS from '@api/domain/ds/DataDS';

import { EventCreateType, EventType } from '@customTypes/event';

class DataRepoImpl {
  private data: DataDS;

  constructor(data: DataDS) {
    this.data = data;
  }

  getPercentage(): number {
    return this.data.getPercentage();
  }

  loadEvents(): EventType[] {
    return this.data.loadEvents();
  }

  parseDataEvents(): string {
    return this.data.parseDataEvents();
  }

  async getEvents(): Promise<EventType[]> {
    return this.data.getEvents();
  }

  async createEvent(event: EventCreateType): Promise<boolean> {
    return this.data.createEvent(event);
  }

  async updateEvent(event: EventType): Promise<boolean> {
    return this.data.updateEvent(event);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.data.deleteEvent(id);
  }

  async getEvent(id: string): Promise<EventType> {
    return this.data.getEvent(id);
  }

  async askModel(prompt: string): Promise<string> {
    return this.data.askModel(prompt);
  }
}

export default DataRepoImpl;
