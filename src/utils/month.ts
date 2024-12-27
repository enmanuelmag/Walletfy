import { EventType } from '@customTypes/event';
import { MonthType } from '@customTypes/month';
import moment from 'moment';

export const buildMonths = (events?: EventType[]) => {
  const months: MonthType[] = [];

  if (!events?.length) return months;

  //group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const date = moment.unix(event.date);
    const month = date.format('MMMM');
    const year = date.year();

    const key = `${month}-${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(event);

    return acc;
  }, {} as Record<string, EventType[]>);

  //build months
  for (const key in eventsByMonth) {
    const [monthName, year] = key.split('-');

    const events = eventsByMonth[key];

    const balance = events.reduce(
      (acc, event) => {
        acc[event.type] += event.amount;

        return acc;
      },
      { income: 0, expense: 0 }
    );

    const total = balance.income - balance.expense;

    months.push({
      name: monthName,
      month: moment().month(monthName).month() + 1,
      year: Number(year),
      events,
      balance: {
        balance: total,
        income: balance.income,
        expense: balance.expense,
      },
    });
  }

  return months.sort((a, b) => a.year - b.year);
};
