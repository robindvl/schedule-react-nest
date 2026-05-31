export interface BaseEvent {
  id: string;
  name: string;
  studioName: string;
  studioId: string;
  startsAt: string;
  endsAt: string;
  trainerName: string;
  trainerAvatarUrl: string | null;
  currentParticipants: number;
  maxParticipants: number;
}
