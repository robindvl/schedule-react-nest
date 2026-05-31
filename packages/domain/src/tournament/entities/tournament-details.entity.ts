import type { SourceTournamentSnapshotData } from './source-tournament-snapshot.entity';
import type { TournamentStatusAuditData } from './tournament-status-audit.entity';

export interface TournamentDetailsData {
  statusAudit: TournamentStatusAuditData;
  sourceTournamentSnapshot?: SourceTournamentSnapshotData;
}
