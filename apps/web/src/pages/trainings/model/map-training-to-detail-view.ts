import type { TrainingData } from '@repo/domain';
import type { TournamentDetailData } from '@widget/tournament-widget';

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

function formatLongDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function mapTrainingToDetailView(training: TrainingData): TournamentDetailData {
  const startsAt = new Date(training.timeFrom);
  const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');
  const trainer = training.trainers[0];
  const trainerName = trainer
    ? `${trainer.firstName} ${trainer.lastName}`.trim()
    : '';
  return {
    id: training.id,
    title: training.direction.name,
    format: training.type.name,
    dateLabel: formatLongDate(training.timeFrom),
    timeLabel: `${formatTime(training.timeFrom)} • ${formatTime(training.timeTo)}`,
    stationName: training.studio.name,
    monthBadge: MONTHS[monthKey] ?? '',
    dayBadge: startsAt.getDate(),
    description: training.direction.description || training.direction.name,
    organizer: {
      name: trainerName,
      avatarUrl: trainer?.photo ?? '',
    },
    participants: [],
    maxParticipants: training.maxClientsCount,
    currentParticipants: training.clientsCount,
  };
}
