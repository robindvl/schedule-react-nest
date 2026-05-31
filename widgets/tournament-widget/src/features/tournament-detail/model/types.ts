export type TournamentDetailTab = 'roster' | 'rules';

export interface TournamentDetailParticipant {
  id: string;
  name: string;
  initials: string;
  levelLabel: string;
  levelBadge: string;
  avatarUrl?: string;
  ringDegrees: number;
}

export interface TournamentDetailOrganizer {
  name: string;
  avatarUrl: string;
}

export interface TournamentDetailData {
  id: string;
  title: string;
  format: string;
  dateLabel: string;
  timeLabel: string;
  stationName: string;
  monthBadge: string;
  dayBadge: number;
  description: string;
  organizer: TournamentDetailOrganizer;
  participants: TournamentDetailParticipant[];
  maxParticipants: number;
  currentParticipants: number;
}
