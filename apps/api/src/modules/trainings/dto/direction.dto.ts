import { ApiProperty } from '@nestjs/swagger';
import type { DirectionData } from '@repo/domain';

export class DirectionDto implements DirectionData {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: String, nullable: true })
  photo!: string | null;

  @ApiProperty()
  whatToTake!: string;

  @ApiProperty({ type: String, nullable: true })
  photoWeb!: string | null;

  @ApiProperty()
  duration!: string;

  @ApiProperty({ type: String, nullable: true })
  technicalBreakBeforeDuration!: string | null;

  @ApiProperty({ type: String, nullable: true })
  technicalBreakAfterDuration!: string | null;
}
