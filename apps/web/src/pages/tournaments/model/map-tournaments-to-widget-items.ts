import type { TournamentData } from '@repo/domain';
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

const GENDER_SHORT: Record<TournamentData['gender'], string> = {
  MIXED: 'М/Ж',
  FEMALE: 'Ж',
  MALE: 'М',
};

function formatTime(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function toDateId(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function mapTournamentsToWidgetItems(
  tournaments: TournamentData[],
): TournamentSignupCard[] {
  return tournaments.map((tournament) => {
    const startsAt = new Date(tournament.startsAt);
    const availableSpots = tournament.maxPlayers - tournament.participantsCount;
    const monthKey = String(startsAt.getMonth() + 1).padStart(2, '0');
    const weekday = WEEKDAYS[startsAt.getDay()] ?? '';
    const month = MONTHS[monthKey] ?? '';
    const timeStart = formatTime(tournament.startsAt);
    const timeEnd = formatTime(tournament.endsAt);

    return {
      id: tournament.id,
      dateId: toDateId(tournament.startsAt),
      trainer: {
        name: tournament.trainerName,
        avatarUrl: tournament.trainerAvatarUrl,
        stationLabel: tournament.studioName,
      },
      format: tournament.format,
      title: tournament.skin.title || tournament.name,
      dateDay: startsAt.getDate(),
      dateMonth: month,
      dateWeekday: weekday,
      scheduleLabel: `${weekday}, ${timeStart}-${timeEnd}`,
      locationLabel: tournament.studioName,
      levelLabel: `${tournament.tournamentType} · ${GENDER_SHORT[tournament.gender]}`,
      priceLabel: 'энергия',
      currentParticipants: tournament.participantsCount,
      maxParticipants: tournament.maxPlayers,
      availableSpots,
      waitlistCount: tournament.waitlistCount,
      actionLabel: 'Открыть',
    };
  });
}
