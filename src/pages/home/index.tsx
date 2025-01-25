import React from 'react';
import { useQuery } from '@tanstack/react-query';

import DataRepo from '@api/datasource';

import { EventType } from '@customTypes/event';
import { MonthType } from '@customTypes/month';

import QKeys from '@constants/query';

import { buildMonths } from '@utils/month';
import { isLoadingOrRefetchQuery } from '@utils/network';

import MonthCard from '@components/event/month';
import NumberInput from '@components/form/Number';

import { RoutesApp } from '@constants/routes';

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

  const isLoading = isLoadingOrRefetchQuery(eventsQuery, monthsQuery);

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
      </div>
    </div>
  );
};

export default Home;
