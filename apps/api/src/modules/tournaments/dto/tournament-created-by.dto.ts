import { ApiProperty } from '@nestjs/swagger';
import type { TournamentCreatedByData } from '@repo/domain';

export class TournamentCreatedByDto implements TournamentCreatedByData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  login!: string;

  @ApiProperty()
  name!: string;
}
