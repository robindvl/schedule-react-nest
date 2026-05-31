import type { TournamentData } from '../entities/tournament.entity';
import type { TournamentDisplay } from '../interfaces/tournament-display.interface';
import {
  TOURNAMENT_GENDER_LABELS,
  TOURNAMENT_STATUS_LABELS,
} from '../constants/tournament.constants';

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

function mapStatus(
  status: TournamentData['status'],
): TournamentDisplay['status'] {
  switch (status) {
    case 'REGISTRATION':
      return 'registration';
    case 'RUNNING':
      return 'running';
    case 'CANCELED':
      return 'canceled';
    case 'COMPLETED':
      return 'completed';
  }
}

export class TournamentToDisplayTransformer {
  static transform(tournament: TournamentData): TournamentDisplay {
    const startsAt = new Date(tournament.startsAt);
    const endsAt = new Date(tournament.endsAt);
    const availableSpots = tournament.maxPlayers - tournament.participantsCount;
    const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');

    return {
      id: tournament.id,
      name: tournament.name,
      station: tournament.studioName,
      stationId: tournament.studioId,
      date: tournament.startsAt,
      day: startsAt.getDate(),
      month: MONTHS[monthKey] ?? '',
      weekday: WEEKDAYS[startsAt.getDay()] ?? '',
      timeStart: formatTime(tournament.startsAt),
      timeEnd: formatTime(tournament.endsAt),
      duration: Math.round((endsAt.getTime() - startsAt.getTime()) / 60000),
      trainerName: tournament.trainerName,
      trainerAvatar: tournament.trainerAvatarUrl,
      format: tournament.format,
      level: tournament.tournamentType,
      currentParticipants: tournament.participantsCount,
      maxParticipants: tournament.maxPlayers,
      availableSpots,
      status: mapStatus(tournament.status),
      gender: TOURNAMENT_GENDER_LABELS[tournament.gender] ?? tournament.gender,
      isFull: availableSpots <= 0,
      ctaLabel: tournament.skin.ctaLabel,
      publicUrl: tournament.publicUrl,
    };
  }

  static getStatusLabel(status: TournamentData['status']): string {
    return TOURNAMENT_STATUS_LABELS[status] ?? status;
  }
}
