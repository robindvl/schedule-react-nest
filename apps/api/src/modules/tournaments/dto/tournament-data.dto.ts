import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TournamentData } from '@repo/domain';

import { ParticipantDto } from './participant.dto';
import { TournamentChangeLogDto } from './tournament-change-log.dto';
import { TournamentCreatedByDto } from './tournament-created-by.dto';
import { TournamentDetailsDto } from './tournament-details.dto';
import { TournamentMechanicsDto } from './tournament-mechanics.dto';
import { TournamentSkinDto } from './tournament-skin.dto';
import { TournamentStatusAuditDto } from './tournament-status-audit.dto';
import { TournamentUpdatedByDto } from './tournament-updated-by.dto';

export class TournamentDataDto implements TournamentData {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: ['CUSTOM', 'VIVA'] })
  source!: TournamentData['source'];

  @ApiProperty()
  name!: string;

  @ApiProperty({
    enum: ['REGISTRATION', 'RUNNING', 'CANCELED', 'COMPLETED'],
  })
  status!: TournamentData['status'];

  @ApiProperty()
  rawStatus!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  publicUrl!: string;

  @ApiPropertyOptional()
  sourceTournamentId?: string;

  @ApiProperty()
  tournamentType!: string;

  @ApiProperty()
  isPublic!: boolean;

  @ApiProperty({ type: [String] })
  accessLevels!: string[];

  @ApiProperty({ enum: ['MIXED', 'FEMALE', 'MALE'] })
  gender!: TournamentData['gender'];

  @ApiProperty()
  maxPlayers!: number;

  @ApiProperty({ type: [ParticipantDto] })
  participants!: ParticipantDto[];

  @ApiProperty({ type: [ParticipantDto] })
  waitlist!: ParticipantDto[];

  @ApiProperty()
  participantsCount!: number;

  @ApiProperty()
  paidParticipantsCount!: number;

  @ApiProperty()
  waitlistCount!: number;

  @ApiProperty({ type: [String] })
  allowedManagerPhones!: string[];

  @ApiProperty({ type: [String] })
  publicationCommunityIds!: string[];

  @ApiProperty()
  studioId!: string;

  @ApiProperty()
  studioName!: string;

  @ApiProperty()
  courtName!: string;

  @ApiProperty()
  locationName!: string;

  @ApiProperty()
  trainerId!: string;

  @ApiProperty()
  trainerName!: string;

  @ApiProperty()
  trainerAvatarUrl!: string;

  @ApiProperty()
  exerciseTypeId!: string;

  @ApiProperty()
  startsAt!: string;

  @ApiProperty()
  endsAt!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty({ type: TournamentSkinDto })
  skin!: TournamentSkinDto;

  @ApiProperty({ type: [TournamentChangeLogDto] })
  changeLog!: TournamentChangeLogDto[];

  @ApiProperty({ type: TournamentStatusAuditDto })
  statusAudit!: TournamentStatusAuditDto;

  @ApiProperty({ type: TournamentCreatedByDto })
  createdBy!: TournamentCreatedByDto;

  @ApiProperty({ type: TournamentUpdatedByDto })
  updatedBy!: TournamentUpdatedByDto;

  @ApiProperty({ type: TournamentDetailsDto })
  details!: TournamentDetailsDto;

  @ApiPropertyOptional()
  linkedCustomTournamentId?: string;

  @ApiProperty()
  format!: string;

  @ApiPropertyOptional({ type: TournamentMechanicsDto })
  mechanics?: TournamentMechanicsDto;

  @ApiPropertyOptional()
  gameId?: string;
}
