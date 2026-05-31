import { ApiProperty } from '@nestjs/swagger';
import type { TrainerGradeData } from '@repo/domain';

export class TrainerGradeDto implements TrainerGradeData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}
