import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ChangeLogActorData } from '@repo/domain';

export class ChangeLogActorDto implements ChangeLogActorData {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  login?: string;

  @ApiProperty()
  name!: string;
}
