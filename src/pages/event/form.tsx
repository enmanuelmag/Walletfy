import DataRepo from '@api/datasource';
import QKeys from '@constants/query';
import { EventType } from '@customTypes/event';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const FormEvent = () => {
  const { id } = useParams<{ id: string }>();

  const mode = id ? 'edit' : 'create';

  const eventQuery = useQuery<
    EventType | null,
    Error,
    EventType,
    [string, string | undefined]
  >({
    enabled: Boolean(id),
    queryKey: [QKeys.GET_EVENT, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const response = await DataRepo.getEvent(id!);

      return response;
    },
  });

  const { data: event } = eventQuery;

  return (
    <div>
      <h1>{mode === 'edit' ? 'Edit' : 'Create'} Event</h1>
      <p>{event?.name}</p>
    </div>
  );
};

export default FormEvent;
