import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ChangeLogChangeData } from '@repo/domain';

export class ChangeLogChangeDto implements ChangeLogChangeData {
  @ApiProperty()
  field!: string;

  @ApiProperty()
  label!: string;

  @ApiPropertyOptional()
  before?: string;

  @ApiPropertyOptional()
  after?: string;
}
