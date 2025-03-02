import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import DataRepo from '@api/datasource';

import { EventType } from '@customTypes/event';
import { MonthType } from '@customTypes/month';

import QKeys from '@constants/query';

import { buildMonths } from '@utils/month';
import { isLoadingOrRefetchQuery } from '@utils/network';

import MonthCard from '@components/event/month';
import NumberInput from '@components/form/Number';

import { RoutesApp } from '@constants/routes';
import Input from '@components/form/Input';

const Home = () => {
  const [initialBalance, setInitialBalance] = React.useState(0);

  const eventsQuery = useQuery<EventType[], Error>({
    queryKey: [QKeys.GET_EVENTS],
    queryFn: async () => {
      const response = await DataRepo.getEvents();

      return response;
    },
  });

  const monthsQuery = useQuery<
    MonthType[],
    Error,
    MonthType[],
    [string, string]
  >({
    refetchOnMount: true,
    enabled: Boolean(eventsQuery.data),
    queryKey: [QKeys.BUILD_MONTHS, JSON.stringify(eventsQuery.data)],
    queryFn: async ({ queryKey }) => {
      const [, events] = queryKey;
      const response = buildMonths(initialBalance, JSON.parse(events));

      return response;
    },
  });

  const askMutation = useMutation<string, Error, string, string>({
    mutationFn: async (prompt) => {
      const response = await DataRepo.askModel(prompt);

      return response;
    },
    onSettled: (_, error) => {
      if (error) {
        console.error('Error asking model', error);
      }
    },
  });

  const isLoading = isLoadingOrRefetchQuery(eventsQuery, monthsQuery);

  const [prompt, setPrompt] = React.useState('What is the amount of my salary');

  const { data: events } = eventsQuery;

  const { data: months } = monthsQuery;

  return (
    <div className="cd-mt-[1rem]">
      <div className="cd-mb-4 cd-flex cd-justify-between cd-items-end">
        <div className="cd-flex cd-items-end">
          <NumberInput
            label="Dinero inicial"
            min={0}
            value={initialBalance}
            onChange={(value) => setInitialBalance(value)}
          />
          <button
            className="cd-ml-4 cd-py-[0.5rem] cd-px-[1rem] cd-bg-violet-500 cd-text-white cd-rounded-md cd-shadow-lg hover:cd-bg-violet-600"
            onClick={() => {
              console.log('refetch');
              monthsQuery.refetch();
            }}
          >
            Calcular
          </button>
        </div>

        <a
          href={RoutesApp.EVENT_FORM.replace(':id?', '')}
          className="cd-py-[0.5rem] cd-px-[1rem] cd-bg-violet-500 cd-text-white cd-rounded-md cd-shadow-lg hover:cd-bg-violet-600"
        >
          Add Event
        </a>
      </div>
      <div>
        {isLoading && (
          <div className="cd-flex cd-justify-center cd-items-center cd-h-[10rem] cd-text-lg cd-font-semibold cd-text-gray-700 dark:cd-text-gray-300">
            Loading your events...
          </div>
        )}

        {!isLoading && months && Boolean(months?.length) && (
          <React.Fragment>
            <div className="cd-flex cd-justify-between cd-items-center">
              <p className="cd-text-lg cd-font-semibold cd-text-gray-800 dark:cd-text-gray-200">
                You have {events?.length} events in {months.length} months
              </p>
            </div>
            <div className="cd-flex cd-flex-wrap cd-flex-row">
              {months.map((month) => (
                <MonthCard key={`${month.month}-${month.year}`} data={month} />
              ))}
            </div>
          </React.Fragment>
        )}

        {!isLoading && (
          <section className="cd-mt-8">
            <form
              className="cd-flex cd-flex-row cd-items-end"
              onSubmit={(e) => {
                e.preventDefault();
                askMutation.mutate(prompt);
              }}
            >
              <Input
                className="cd-w-[90%]"
                label="Pregunta al modelo de IA"
                placeholder="Realiza las consultas al modelo"
                onChange={(value) => setPrompt(value)}
                value={prompt}
              />
              <button
                type="submit"
                className="cd-w-[10%] cd-ml-4 cd-py-[0.5rem] cd-px-[1rem] cd-bg-violet-500 cd-text-white cd-rounded-md cd-shadow-lg hover:cd-bg-violet-600"
              >
                Ask
              </button>
            </form>

            <div className="cd-mt-4">
              {askMutation.isPending && (
                <div className="cd-flex cd-justify-center cd-items-center cd-h-[10rem] cd-text-lg cd-font-semibold cd-text-gray-700 dark:cd-text-gray-300">
                  Asking the model...
                </div>
              )}

              {askMutation.isSuccess && (
                <div
                  className="
                cd-mt-4 cd-text-md cd-font-semibold cd-text-gray-800 dark:cd-text-gray-200
                cd-border cd-border-gray-300 cd-rounded-md cd-shadow-sm cd-p-4
                cd-bg-white dark:cd-bg-zinc-800
                "
                >
                  {askMutation.data}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
