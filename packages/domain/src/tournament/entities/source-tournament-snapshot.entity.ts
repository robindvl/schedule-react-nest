export interface SourceTournamentSnapshotData {
  id: string;
  source: string;
  name: string;
  status: string;
  startsAt: string;
  endsAt: string;
  studioId: string;
  studioName: string;
  courtName: string;
  locationName: string;
  trainerId: string;
  trainerName: string;
  trainerAvatarUrl: string;
  exerciseTypeId: string;
  tournamentType: string;
  maxPlayers: number;
  participantsCount: number;
}
