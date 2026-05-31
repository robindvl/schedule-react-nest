import { ApiProperty } from '@nestjs/swagger';
import type { TournamentUpdatedByData } from '@repo/domain';

export class TournamentUpdatedByDto implements TournamentUpdatedByData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}
