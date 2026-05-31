import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ParticipantData } from '@repo/domain';

export class ParticipantDto implements ParticipantData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiPropertyOptional()
  photo?: string;

  @ApiPropertyOptional()
  rating?: number;
}
