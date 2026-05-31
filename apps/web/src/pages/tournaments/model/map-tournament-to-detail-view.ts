import type { TournamentData } from '@repo/domain';
import type { TournamentDetailData, TournamentDetailParticipant } from '@widget/tournament-widget';

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

function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim()[0] ?? '';
  const last = lastName.trim()[0] ?? '';

  return `${first}${last}`.toUpperCase() || '?';
}

function mapParticipant(
  participant: TournamentData['participants'][number],
  index: number,
  levelBadge: string,
): TournamentDetailParticipant {
  return {
    id: participant.id,
    name: `${participant.firstName} ${participant.lastName}`.trim(),
    initials: getInitials(participant.firstName, participant.lastName),
    levelLabel: `Уровень ${levelBadge}`,
    levelBadge,
    avatarUrl: participant.photo,
    ringDegrees: 16 + (index % 5) * 18,
  };
}

export function mapTournamentToDetailView(
  tournament: TournamentData,
): TournamentDetailData {
  const startsAt = new Date(tournament.startsAt);
  const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');
  const levelBadge = tournament.tournamentType;
  const participants = tournament.participants.map((participant, index) =>
    mapParticipant(participant, index, levelBadge),
  );

  const descriptionParts = [tournament.skin.title || tournament.name];
  if (tournament.gender === 'FEMALE') {
    descriptionParts.push('Женский турнир');
  }

  return {
    id: tournament.id,
    title: tournament.skin.title || tournament.name,
    format: tournament.format,
    dateLabel: formatLongDate(tournament.startsAt),
    timeLabel: `${formatTime(tournament.startsAt)} • ${formatTime(tournament.endsAt)}`,
    stationName: tournament.studioName,
    monthBadge: MONTHS[monthKey] ?? '',
    dayBadge: startsAt.getDate(),
    description: descriptionParts.join('\n'),
    organizer: {
      name: tournament.trainerName,
      avatarUrl: tournament.trainerAvatarUrl,
    },
    participants,
    maxParticipants: tournament.maxPlayers,
    currentParticipants: tournament.participantsCount,
  };
}
