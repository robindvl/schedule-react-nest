import { ApiProperty } from '@nestjs/swagger';
import type { TournamentMechanicsData } from '@repo/domain';

import { MechanicsConfigDto } from './mechanics-config.dto';

class TournamentMechanicsRawDto {
  @ApiProperty()
  enabled!: boolean;

  @ApiProperty({ type: MechanicsConfigDto })
  config!: MechanicsConfigDto;
}

export class TournamentMechanicsDto implements TournamentMechanicsData {
  @ApiProperty()
  enabled!: boolean;

  @ApiProperty({ type: MechanicsConfigDto })
  config!: MechanicsConfigDto;

  @ApiProperty({ type: TournamentMechanicsRawDto })
  raw!: TournamentMechanicsRawDto;
}
