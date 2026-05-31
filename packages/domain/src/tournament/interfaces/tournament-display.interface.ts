export interface TournamentDisplay {
  id: string;
  name: string;
  station: string;
  stationId: string;
  date: string;
  day: number;
  month: string;
  weekday: string;
  timeStart: string;
  timeEnd: string;
  duration: number;
  trainerName: string;
  trainerAvatar: string;
  format: string;
  level: string;
  currentParticipants: number;
  maxParticipants: number;
  availableSpots: number;
  status: 'registration' | 'running' | 'canceled' | 'completed';
  gender: string;
  isFull: boolean;
  ctaLabel: string;
  publicUrl: string;
}
