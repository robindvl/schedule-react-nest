import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TournamentStatusAuditData } from '@repo/domain';

import { StatusAuditActorDto } from './status-audit-actor.dto';
import { StatusAuditChangeDto } from './status-audit-change.dto';

export class TournamentStatusAuditDto implements TournamentStatusAuditData {
  @ApiProperty({ type: StatusAuditChangeDto })
  lastChange!: StatusAuditChangeDto;

  @ApiProperty({ type: [StatusAuditChangeDto] })
  history!: StatusAuditChangeDto[];

  @ApiPropertyOptional()
  canceledAt?: string;

  @ApiPropertyOptional({ type: StatusAuditActorDto })
  canceledBy?: StatusAuditActorDto;

  @ApiPropertyOptional()
  cancelReason?: string;

  @ApiPropertyOptional()
  autoCanceledAt?: string;

  @ApiPropertyOptional()
  autoCancelReason?: string;

  @ApiPropertyOptional()
  autoCancelSource?: string;
}
