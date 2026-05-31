import type { TrainingData } from '../entities/training.entity';
import type { TrainingDisplay } from '../interfaces/training-display.interface';
import { TrainingStatus } from '../enums/training.enums';

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

function resolveStatus(
  training: TrainingData,
  availableSpots: number,
): TrainingDisplay['status'] {
  if (training.inWaitlist) {
    return TrainingStatus.WAITING;
  }
  if (availableSpots > 0) {
    return TrainingStatus.AVAILABLE;
  }
  return TrainingStatus.FULL;
}

export class TrainingToTournamentTransformer {
  static transform(training: TrainingData): TrainingDisplay {
    const startsAt = new Date(training.timeFrom);
    const endsAt = new Date(training.timeTo);
    const trainer = training.trainers[0];
    const availableSpots = training.maxClientsCount - training.clientsCount;
    const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');

    return {
      id: training.id,
      name: training.direction.name,
      station: training.studio.name,
      stationId: training.studio.id,
      date: training.timeFrom,
      day: startsAt.getDate(),
      month: MONTHS[monthKey] ?? '',
      weekday: WEEKDAYS[startsAt.getDay()] ?? '',
      timeStart: formatTime(training.timeFrom),
      timeEnd: formatTime(training.timeTo),
      duration: Math.round((endsAt.getTime() - startsAt.getTime()) / 60000),
      coachName: trainer
        ? `${trainer.firstName} ${trainer.lastName}`.trim()
        : '',
      coachAvatar: trainer?.photo ?? null,
      coachGrade: trainer?.grade.name ?? '',
      level: resolveLevel(training.direction.name),
      currentParticipants: training.clientsCount,
      maxParticipants: training.maxClientsCount,
      availableSpots,
      status: resolveStatus(training, availableSpots),
      isInWaitlist: training.inWaitlist,
      girlsOnly: training.girlsOnly,
    };
  }
}
