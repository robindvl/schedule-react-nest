import { ApiProperty } from '@nestjs/swagger';
import type { TrainingTypeData } from '@repo/domain';

export class TrainingTypeDto implements TrainingTypeData {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  color!: string;

  @ApiProperty({ enum: ['GROUP', 'INDIVIDUAL'] })
  format!: TrainingTypeData['format'];
}
