import type { ParticipantData } from './participant.entity';
import type {
  TournamentCreatedByData,
  TournamentUpdatedByData,
} from './tournament-actor.entity';import type { TournamentChangeLogData } from './tournament-change-log.entity';
import type { TournamentDetailsData } from './tournament-details.entity';
import type { TournamentMechanicsData } from './tournament-mechanics.entity';
import type { TournamentSkinData } from './tournament-skin.entity';
import type { TournamentStatusAuditData } from './tournament-status-audit.entity';

export interface TournamentData {
  id: string;
  source: 'CUSTOM' | 'VIVA';
  name: string;
  status: 'REGISTRATION' | 'RUNNING' | 'CANCELED' | 'COMPLETED';
  rawStatus: string;
  slug: string;
  publicUrl: string;
  sourceTournamentId?: string;
  tournamentType: string;
  isPublic: boolean;
  accessLevels: string[];
  gender: 'MIXED' | 'FEMALE' | 'MALE';
  maxPlayers: number;
  participants: ParticipantData[];
  waitlist: ParticipantData[];
  participantsCount: number;
  paidParticipantsCount: number;
  waitlistCount: number;
  allowedManagerPhones: string[];
  publicationCommunityIds: string[];
  studioId: string;
  studioName: string;
  courtName: string;
  locationName: string;
  trainerId: string;
  trainerName: string;
  trainerAvatarUrl: string;
  exerciseTypeId: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  skin: TournamentSkinData;
  mechanics?: TournamentMechanicsData;
  changeLog: TournamentChangeLogData[];
  statusAudit: TournamentStatusAuditData;
  createdBy: TournamentCreatedByData;
  updatedBy: TournamentUpdatedByData;
  details: TournamentDetailsData;
  linkedCustomTournamentId?: string;
  format: string;
  gameId?: string;
}
