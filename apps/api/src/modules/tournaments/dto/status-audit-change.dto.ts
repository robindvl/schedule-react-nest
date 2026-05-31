import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { StatusAuditChangeData } from '@repo/domain';

import { StatusAuditActorDto } from './status-audit-actor.dto';

export class StatusAuditChangeDto implements StatusAuditChangeData {
  @ApiProperty()
  at!: string;

  @ApiPropertyOptional()
  fromStatus?: string;

  @ApiProperty()
  toStatus!: string;

  @ApiProperty()
  reason!: string;

  @ApiProperty({ type: StatusAuditActorDto })
  actor!: StatusAuditActorDto;

  @ApiPropertyOptional()
  source?: string;

  @ApiPropertyOptional()
  auto?: boolean;
}
