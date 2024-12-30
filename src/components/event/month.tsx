import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { DATE_FORMAT } from '@constants/app';
import { RoutesApp } from '@constants/routes';

import { MonthType } from '@customTypes/month';

import { $ } from '@utils/styles';

type MonthProps = {
  data: MonthType;
};

const MonthCard = (props: MonthProps) => {
  const { name, year, flow, events } = props.data;

  const navigate = useNavigate();

  return (
    <article className={$('cd-p-[1rem] cd-flex')}>
      <div
        className={$(
          'cd-rounded-md cd-shadow-lg cd-gap-y-[1rem] ',
          'cd-flex cd-flex-col cd-justify-between',
          'cd-border cd-border-gray-100 dark:cd-border-zinc-700',
          'cd-bg-white dark:cd-bg-zinc-800'
        )}
      >
        <div className="cd-flex cd-flex-col cd-gap-y-[0.5rem]">
          <section className="cd-flex cd-justify-between cd-items-center cd-px-[1rem] cd-py-[0.5rem]">
            <p
              className={$(
                'cd-text-lg cd-font-semibold cd-capitalize',
                'cd-text-gray-800 dark:cd-text-gray-200'
              )}
            >
              {name} {year}
            </p>
          </section>
          <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-mb-[0.5rem] dark:cd-border-zinc-500" />
          <section className="cd-px-[0.5rem]">
            {events.map((event, index) => (
              <React.Fragment key={index}>
                <div
                  data-tooltip-place="bottom-start"
                  data-tooltip-id="tooltip-event"
                  data-tooltip-html={`
                    <div class="cd-flex cd-flex-col cd-justify-center cd-items-center cd-p-[0.5rem]">
                      <p class="cd-text-sm">${event.description}</p>  
                      ${
                        event.attachment
                          ? `<img src="${event.attachment}" alt="attachment" class="cd-mt-2 cd-w-20 cd-h-20" />`
                          : ''
                      }
                    </div>
                  `}
                  className={$(
                    'cd-p-[0.5rem] cd-rounded-md',
                    'cd-flex cd-justify-between cd-gap-x-[8rem]',
                    'hover:cd-bg-gray-100  dark:hover:cd-bg-zinc-700'
                  )}
                  onClick={() => {
                    if (
                      confirm(`Do you want to edit the event "${event.name}"?`)
                    ) {
                      navigate(RoutesApp.EVENT_FORM.replace(':id', event.id));
                    }
                  }}
                >
                  <div className="cd-flex cd-flex-col cd-text-base cd-text-gray-700">
                    <span className="cd-text-sm cd-text-gray-700 dark:cd-text-gray-200">
                      {event.name}
                    </span>
                    <span className="cd-text-xs cd-text-gray-500 dark:cd-text-gray-300">
                      {moment.unix(event.date).format(DATE_FORMAT)}{' '}
                    </span>
                  </div>
                  <div
                    className={$(
                      'cd-text-sm',
                      event.type === 'income'
                        ? 'cd-text-green-600 dark:cd-text-green-400'
                        : 'cd-text-red-400 dark:cd-text-red-300'
                    )}
                  >
                    ${event.amount}
                  </div>
                </div>
                {index < events.length - 1 && (
                  <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-my-[0.5rem] dark:cd-border-zinc-500" />
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
        <footer className={$('cd-flex cd-flex-col cd-gap-y-[0.1rem]')}>
          <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-my-[0.5rem] dark:cd-border-zinc-500" />
          <div className="cd-px-[1rem] cd-pb-[1rem]">
            {Object.keys(flow).map((key, index) => (
              <div
                key={index}
                className={$(
                  'cd-flex cd-text-sm cd-flex-row cd-justify-between'
                )}
              >
                <p className="cd-capitalize cd-font-semibold cd-text-gray-700 dark:cd-text-gray-200">
                  {key}
                </p>
                <p className=" cd-text-gray-700 dark:cd-text-gray-200">
                  ${flow[key as keyof typeof flow]}
                </p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
};

export default MonthCard;
