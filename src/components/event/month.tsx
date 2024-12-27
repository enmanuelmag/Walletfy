import React from 'react';
import moment from 'moment';

import { DATE_FORMAT } from '@constants/app';
import { MonthType } from '@customTypes/month';

import { $ } from '@utils/styles';

type MonthProps = {
  data: MonthType;
};

const MonthCard = (props: MonthProps) => {
  const { name, year, balance, events } = props.data;

  return (
    <article className={$('cd-p-[1rem] cd-flex')}>
      <div className="cd-flex cd-flex-col cd-justify-between cd-rounded-md cd-shadow-lg cd-gap-y-[1rem] cd-border cd-border-gray-100">
        <div className="cd-flex cd-flex-col cd-gap-y-[0.5rem]">
          <section className="cd-flex cd-justify-between cd-items-center cd-px-[1rem] cd-py-[0.5rem]">
            <p
              className={$(
                'cd-text-lg cd-font-semibold cd-text-gray-800 cd-capitalize'
              )}
            >
              {name} {year}
            </p>
          </section>
          <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-mb-[0.5rem]" />
          <section className="cd-px-[1rem]">
            {events.map((event, index) => (
              <React.Fragment key={index}>
                <div
                  data-tooltip-place="bottom-start"
                  data-tooltip-id="tooltip-event"
                  data-tooltip-content={event.description}
                  className={$('cd-flex cd-justify-between cd-gap-x-[8rem]')}
                >
                  <div className="cd-flex cd-flex-col cd-text-base cd-text-gray-700">
                    <span className="cd-text-sm cd-text-gray-700">
                      {event.name}
                    </span>
                    <span className="cd-text-xs cd-text-gray-500">
                      {moment.unix(event.date).format(DATE_FORMAT)}{' '}
                    </span>
                  </div>
                  <div
                    className={$(
                      'cd-text-sm',
                      event.type === 'income'
                        ? 'cd-text-green-600'
                        : 'cd-text-red-400'
                    )}
                  >
                    ${event.amount}
                  </div>
                </div>
                {index < events.length - 1 && (
                  <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-my-[0.5rem]" />
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
        <footer className={$('cd-flex cd-flex-col cd-gap-y-[0.1rem]')}>
          <div className="cd-border-b cd-border-gray-200 cd-w-full cd-h-[1px] cd-my-[0.5rem]" />
          <div className="cd-px-[1rem] cd-pb-[1rem]">
            {Object.keys(balance).map((key, index) => (
              <div
                key={index}
                className={$(
                  'cd-flex cd-text-sm cd-flex-row cd-justify-between'
                )}
              >
                <p className="cd-capitalize cd-font-semibold cd-text-gray-700">
                  {key}
                </p>
                <p className=" cd-text-gray-700">
                  ${balance[key as keyof typeof balance]}
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
