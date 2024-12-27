import { z } from 'zod';

export const EventOptionSchema = z.enum(['income', 'expense']);

export type EventOptionType = z.infer<typeof EventOptionSchema>;

export const EventSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description must be at most 200 characters'),
  amount: z
    .number()
    .min(1, 'Amount must be at least 1')
    .max(1_000_000, 'Amount must be at most 1000'),
  date: z.number(),
  type: EventOptionSchema,
  attachment: z.string().optional(),
});

export type EventType = z.infer<typeof EventSchema>;

// Form
export const EventCreateSchema = EventSchema.omit({ id: true });

export type EventCreateType = z.infer<typeof EventCreateSchema>;
