import DataDS from '@api/domain/ds/DataDS';

import { EventCreateType, EventType } from '@customTypes/event';

class DataRepoImpl {
  private data: DataDS;

  constructor(data: DataDS) {
    this.data = data;
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
}

export default DataRepoImpl;
