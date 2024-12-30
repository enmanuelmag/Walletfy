import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import DataRepo from '@api/datasource';

import {
  EventType,
  EventCreateType,
  EventCreateSchema,
} from '@customTypes/event';

import QKeys from '@constants/query';

import Input from '@components/form/Input';
import DateInput from '@components/form/Date';
import NumberInput from '@components/form/Number';
import SelectInput from '@components/form/Select';
import moment from 'moment';
import { isLoadingMutation, isLoadingOrRefetchQuery } from '@utils/network';
import { RoutesApp } from '@constants/routes';
import FileInput from '@components/form/File';
import queryClient from '@api/datasource/query';

const INITIAL_EVENT: EventCreateType = {
  name: '',
  description: '',
  date: moment().unix(),
  amount: 0,
  type: 'income',
};

const FormEvent = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const mode = id ? 'edit' : 'create';

  const formEvent = useForm<EventCreateType>({
    resolver: zodResolver(EventCreateSchema),
  });

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

  const eventCreateMutation = useMutation<
    boolean,
    Error,
    EventCreateType,
    EventType
  >({
    mutationFn: async (data) => {
      const response = await DataRepo.createEvent(data);

      queryClient.invalidateQueries({
        queryKey: [QKeys.GET_EVENTS],
        refetchType: 'all',
      });

      queryClient.invalidateQueries({
        queryKey: [QKeys.GET_EVENT, id],
        refetchType: 'all',
        exact: true,
      });

      return response;
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Failed to create event');
        console.error(error);
        return;
      }
      alert('Event created');
      formEvent.reset(INITIAL_EVENT);
      navigate(RoutesApp.HOME);
    },
  });

  const eventUpdateMutation = useMutation<boolean, Error, EventType, EventType>(
    {
      mutationFn: async (data) => {
        const response = await DataRepo.updateEvent(data);

        queryClient.invalidateQueries({
          queryKey: [QKeys.GET_EVENTS],
          refetchType: 'all',
        });

        queryClient.invalidateQueries({
          queryKey: [QKeys.GET_EVENT, id],
          refetchType: 'all',
          exact: true,
        });

        return response;
      },
      onSettled: (_, error) => {
        if (error) {
          alert('Failed to update event');
          console.error(error);
          return;
        }
        alert('Event updated');
        navigate(RoutesApp.HOME);
      },
    }
  );

  React.useEffect(() => {
    if (mode === 'create' || !eventQuery.data) {
      return;
    }
    formEvent.reset(eventQuery.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventQuery.data, mode]);

  const isLoadingQuery = isLoadingOrRefetchQuery(eventQuery);

  const isSubmitting = isLoadingMutation(
    eventCreateMutation,
    eventUpdateMutation
  );

  return (
    <div className="cd-mt-[2rem] cd-flex cd-flex-col cd-items-center">
      {isLoadingQuery && (
        <div className="cd-mt-[1rem] cd-text-lg cd-font-semibold cd-text-gray-800 dark:cd-text-gray-300">
          Loading...
        </div>
      )}
      {!isLoadingQuery && (
        <form
          className="cd-flex cd-flex-col cd-w-full md:cd-w-[40%] cd-gap-y-[1rem]"
          onSubmit={formEvent.handleSubmit((data) => {
            if (mode === 'create') {
              eventCreateMutation.mutate(data);
            } else if (id) {
              eventUpdateMutation.mutate({
                ...data,
                id,
              });
            } else {
              alert('Invalid mode');
            }
          })}
        >
          <h1 className="cd-mb-[1rem] dark:cd-text-gray-200">
            {mode === 'edit' ? 'Edit' : 'Create'} event
          </h1>
          <Controller
            name="name"
            control={formEvent.control}
            render={({ field }) => (
              <Input
                label="Name"
                value={field.value}
                onChange={field.onChange}
                error={formEvent.formState.errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={formEvent.control}
            render={({ field }) => (
              <Input
                label="Description"
                value={field.value}
                onChange={field.onChange}
                error={formEvent.formState.errors.description?.message}
              />
            )}
          />

          <Controller
            name="date"
            control={formEvent.control}
            render={({ field }) => (
              <DateInput
                label="Date"
                value={field.value}
                onChange={field.onChange}
                error={formEvent.formState.errors.date?.message}
              />
            )}
          />

          <Controller
            name="amount"
            control={formEvent.control}
            render={({ field }) => (
              <NumberInput
                label="Amount"
                value={field.value}
                onChange={field.onChange}
                error={formEvent.formState.errors.amount?.message}
              />
            )}
          />

          <Controller
            name="type"
            control={formEvent.control}
            render={({ field }) => (
              <SelectInput
                label="Type"
                value={field.value}
                options={['income', 'expense']}
                onChange={field.onChange}
                error={formEvent.formState.errors.type?.message}
              />
            )}
          />

          <Controller
            name="attachment"
            control={formEvent.control}
            render={({ field }) => (
              <FileInput
                label="Attachment"
                value={field.value}
                onChange={field.onChange}
                error={formEvent.formState.errors.attachment?.message}
              />
            )}
          />

          <button
            className="cd-mt-4 cd-py-2 cd-px-4 cd-bg-violet-500 cd-text-white cd-rounded-md hover:cd-bg-violet-600"
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FormEvent;
