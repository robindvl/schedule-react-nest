import type { TrainingData } from '@repo/domain';
import type { TournamentSignupCard } from '@widget/tournament-widget';

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

function formatTime(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function resolveLevel(directionName: string): string {
  return directionName.includes('D+') ? 'D+' : 'D';
}

function toDateId(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function mapTrainingsToWidgetItems(
  trainings: TrainingData[],
): TournamentSignupCard[] {
  return trainings.map((training) => {
    const startsAt = new Date(training.timeFrom);
    const trainer = training.trainers[0];
    const availableSpots = training.maxClientsCount - training.clientsCount;
    const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');
    const weekday = WEEKDAYS[startsAt.getDay()] ?? '';
    const month = MONTHS[monthKey] ?? '';
    const timeStart = formatTime(training.timeFrom);
    const timeEnd = formatTime(training.timeTo);
    const trainerGrade =
      trainer?.grade.name ?? resolveLevel(training.direction.name);
    const genderLabel = training.girlsOnly ? 'Ж' : 'М/Ж';

    return {
      id: training.id,
      dateId: toDateId(training.timeFrom),
      trainer: {
        name: trainer ? `${trainer.firstName} ${trainer.lastName}`.trim() : '',
        avatarUrl: trainer?.photo ?? '',
        stationLabel: training.studio.name,
      },
      format: training.type.name,
      title: training.direction.name,
      dateDay: startsAt.getDate(),
      dateMonth: month,
      dateWeekday: weekday,
      scheduleLabel: `${weekday}, ${timeStart}-${timeEnd}`,
      locationLabel: training.studio.name,
      levelLabel: `${trainerGrade} · ${genderLabel}`,
      priceLabel: 'энергия',
      currentParticipants: training.clientsCount,
      maxParticipants: training.maxClientsCount,
      availableSpots,
      waitlistCount: training.inWaitlist ? 1 : 0,
      actionLabel: 'Открыть',
    };
  });
}
