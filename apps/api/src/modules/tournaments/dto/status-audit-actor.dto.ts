import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { StatusAuditActorData } from '@repo/domain';

export class StatusAuditActorDto implements StatusAuditActorData {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  login?: string | null;

  @ApiProperty()
  name!: string;
}
