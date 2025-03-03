import type { EventCreateType, EventType } from '@customTypes/event';

abstract class DataDS {
  abstract percentageModel: number;

  abstract getPercentage(): number;

  abstract loadEvents(): EventType[];

  abstract parseDataEvents(): string;

  abstract getEvents(): Promise<EventType[]>;

  abstract createEvent(event: EventCreateType): Promise<boolean>;

  abstract updateEvent(event: EventType): Promise<boolean>;

  abstract deleteEvent(id: string): Promise<boolean>;

  abstract getEvent(id: string): Promise<EventType>;

  abstract askModel(prompt: string): Promise<string>;
}

export default DataDS;
