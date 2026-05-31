import { ApiProperty } from '@nestjs/swagger';
import type { TrainerData } from '@repo/domain';

import { TrainerGradeDto } from './trainer-grade.dto';

export class TrainerDto implements TrainerData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty({ type: String, nullable: true })
  photo!: string | null;

  @ApiProperty({ type: TrainerGradeDto })
  grade!: TrainerGradeDto;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  exerciseDirections!: TrainerData['exerciseDirections'];

  @ApiProperty({ type: String, nullable: true })
  bio!: string | null;
}
