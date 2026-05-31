import type { TournamentSignupCard } from '../../../entities/tournament/model/types';
import type { TournamentDetailData } from './types';

export function mapCardToMinimalDetail(card: TournamentSignupCard): TournamentDetailData {
  const [timeStart = '', timeEnd = ''] = card.scheduleLabel
    .split(', ')[1]
    ?.split('-') ?? ['', ''];

  const timeLabel =
    timeStart && timeEnd ? `${timeStart.trim()} • ${timeEnd.trim()}` : card.scheduleLabel;

  return {
    id: card.id,
    title: card.title,
    format: card.format,
    dateLabel: `${card.dateWeekday.toLowerCase()}, ${card.dateDay} ${card.dateMonth.toLowerCase()}`,
    timeLabel,
    stationName: card.locationLabel,
    monthBadge: card.dateMonth,
    dayBadge: card.dateDay,
    description: card.title,
    organizer: {
      name: card.trainer.name,
      avatarUrl: card.trainer.avatarUrl,
    },
    participants: [],
    maxParticipants: card.maxParticipants,
    currentParticipants: card.currentParticipants,
  };
}
