import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TournamentDetailsData } from '@repo/domain';

import { SourceTournamentSnapshotDto } from './source-tournament-snapshot.dto';
import { TournamentStatusAuditDto } from './tournament-status-audit.dto';

export class TournamentDetailsDto implements TournamentDetailsData {
  @ApiProperty({ type: TournamentStatusAuditDto })
  statusAudit!: TournamentStatusAuditDto;

  @ApiPropertyOptional({ type: SourceTournamentSnapshotDto })
  sourceTournamentSnapshot?: SourceTournamentSnapshotDto;
}
