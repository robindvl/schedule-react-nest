import { ApiProperty } from '@nestjs/swagger';
import type { MechanicsConfigData } from '@repo/domain';

import { MechanicsWeightsDto } from './mechanics-weights.dto';

export class MechanicsConfigDto implements MechanicsConfigData {
  @ApiProperty()
  mode!: string;

  @ApiProperty({ type: Number, nullable: true })
  rounds!: number | null;

  @ApiProperty({ type: Number, nullable: true })
  courts!: number | null;

  @ApiProperty()
  useRatings!: boolean;

  @ApiProperty()
  firstRoundSeeding!: string;

  @ApiProperty()
  roundExactThreshold!: number;

  @ApiProperty()
  balanceOutlierThreshold!: number;

  @ApiProperty()
  balanceOutlierWeight!: number;

  @ApiProperty()
  strictPartnerUniqueness!: string;

  @ApiProperty()
  strictBalance!: string;

  @ApiProperty()
  avoidRepeatOpponents!: boolean;

  @ApiProperty()
  avoidRepeatPartners!: boolean;

  @ApiProperty()
  distributeByesEvenly!: boolean;

  @ApiProperty()
  historyDepth!: number;

  @ApiProperty()
  localSearchIterations!: number;

  @ApiProperty()
  pairingExactThreshold!: number;

  @ApiProperty()
  matchExactThreshold!: number;

  @ApiProperty({ type: MechanicsWeightsDto })
  weights!: MechanicsWeightsDto;
}
