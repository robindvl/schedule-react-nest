import { ApiProperty } from '@nestjs/swagger';
import type { TournamentChangeLogData } from '@repo/domain';

import { ChangeLogActorDto } from './change-log-actor.dto';
import { ChangeLogChangeDto } from './change-log-change.dto';

export class TournamentChangeLogDto implements TournamentChangeLogData {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: ['CREATE', 'UPDATE', 'DELETE'] })
  action!: TournamentChangeLogData['action'];

  @ApiProperty()
  scope!: string;

  @ApiProperty()
  summary!: string;

  @ApiProperty({ type: ChangeLogActorDto })
  actor!: ChangeLogActorDto;

  @ApiProperty()
  at!: string;

  @ApiProperty({ type: [ChangeLogChangeDto] })
  changes!: ChangeLogChangeDto[];
}
