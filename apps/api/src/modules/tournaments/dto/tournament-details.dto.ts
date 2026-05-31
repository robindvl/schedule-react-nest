import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TournamentDetailsData } from '@repo/domain';

import { TournamentStatusAuditDto } from './tournament-status-audit.dto';

export class TournamentDetailsDto implements TournamentDetailsData {
  @ApiProperty({ type: TournamentStatusAuditDto })
  statusAudit!: TournamentStatusAuditDto;

  @ApiPropertyOptional({ type: Object })
  sourceTournamentSnapshot?: TournamentDetailsData['sourceTournamentSnapshot'];
}
