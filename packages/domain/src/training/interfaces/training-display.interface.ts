export interface TrainingDisplay {
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
  coachName: string;
  coachAvatar: string | null;
  coachGrade: string;
  level: string;
  currentParticipants: number;
  maxParticipants: number;
  availableSpots: number;
  status: 'available' | 'waiting' | 'full';
  isInWaitlist: boolean;
  girlsOnly: boolean;
}
