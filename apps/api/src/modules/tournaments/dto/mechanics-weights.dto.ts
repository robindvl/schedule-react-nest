import { ApiProperty } from '@nestjs/swagger';
import type { MechanicsWeightsData } from '@repo/domain';

export class MechanicsWeightsDto implements MechanicsWeightsData {
  @ApiProperty()
  partnerRepeat!: number;

  @ApiProperty()
  partnerImmediateRepeat!: number;

  @ApiProperty()
  opponentRepeat!: number;

  @ApiProperty()
  opponentRecentRepeat!: number;

  @ApiProperty()
  balance!: number;

  @ApiProperty()
  unevenBye!: number;

  @ApiProperty()
  consecutiveBye!: number;

  @ApiProperty()
  pairInternalImbalance!: number;
}
