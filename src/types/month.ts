import { z } from 'zod';
import { EventSchema } from './event';

export const MonthSchema = z.object({
  name: z.string(),
  month: z.number(),
  year: z.number(),
  events: z.array(EventSchema),
  balance: z.object({
    income: z.number(),
    expense: z.number(),
    balance: z.number(),
  }),
});

export type MonthType = z.infer<typeof MonthSchema>;
