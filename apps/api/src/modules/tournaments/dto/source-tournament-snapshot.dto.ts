import { ApiProperty } from '@nestjs/swagger';
import type { SourceTournamentSnapshotData } from '@repo/domain';

export class SourceTournamentSnapshotDto implements SourceTournamentSnapshotData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  startsAt!: string;

  @ApiProperty()
  endsAt!: string;

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
  tournamentType!: string;

  @ApiProperty()
  maxPlayers!: number;

  @ApiProperty()
  participantsCount!: number;
}
