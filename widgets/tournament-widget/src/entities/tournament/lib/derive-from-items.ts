import type {
  TournamentSignupCard,
  TournamentSignupDateOption,
  TournamentSignupFilterOption,
} from '../model/types';

const WEEKDAYS = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'] as const;

const MONTHS: Record<string, string> = {
  '01': 'ЯНВ',
  '02': 'ФЕВ',
  '03': 'МАР',
  '04': 'АПР',
  '05': 'МАЙ',
  '06': 'ИЮН',
  '07': 'ИЮЛ',
  '08': 'АВГ',
  '09': 'СЕН',
  '10': 'ОКТ',
  '11': 'НОЯ',
  '12': 'ДЕК',
};

/** Next `count` calendar days starting from today in the given IANA timezone. */
export function buildScheduleDates(
  count = 14,
  timeZone = 'Europe/Moscow',
): TournamentSignupDateOption[] {
  const startId = new Intl.DateTimeFormat('en-CA', { timeZone }).format(
    new Date(),
  );
  const [startYearRaw, startMonthRaw, startDayRaw] = startId.split('-');
  const startYear = Number(startYearRaw);
  const startMonth = Number(startMonthRaw);
  const startDay = Number(startDayRaw);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startYear, startMonth - 1, startDay + index);
    const monthKey = String(date.getMonth() + 1).padStart(2, '0');
    const day = date.getDate();
    const year = date.getFullYear();

    return {
      id: `${year}-${monthKey}-${String(day).padStart(2, '0')}`,
      weekday: WEEKDAYS[date.getDay()] ?? '',
      day,
      month: MONTHS[monthKey] ?? '',
    };
  });
}

export function buildDatesFromItems(
  items: TournamentSignupCard[],
): TournamentSignupDateOption[] {
  const datesById = new Map<string, TournamentSignupDateOption>();

  for (const item of items) {
    if (!datesById.has(item.dateId)) {
      datesById.set(item.dateId, {
        id: item.dateId,
        weekday: item.dateWeekday,
        day: item.dateDay,
        month: item.dateMonth,
      });
    }
  }

  if (datesById.size === 0) {
    return buildScheduleDates();
  }

  return [...datesById.values()].sort((left, right) =>
    left.id.localeCompare(right.id),
  );
}

function buildFilterOptions(
  values: string[],
  allLabel: string,
): TournamentSignupFilterOption[] {
  return [
    { value: '__all__', label: allLabel },
    ...values.map((value) => ({ value, label: value })),
  ];
}

export function buildTypeOptionsFromItems(
  items: TournamentSignupCard[],
): TournamentSignupFilterOption[] {
  const formats = [...new Set(items.map((item) => item.format))].sort();

  return buildFilterOptions(formats, 'Все типы');
}

export function buildStationOptionsFromItems(
  items: TournamentSignupCard[],
): TournamentSignupFilterOption[] {
  const stations = [...new Set(items.map((item) => item.locationLabel))].sort();

  return buildFilterOptions(stations, 'Все станции');
}
