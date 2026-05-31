export interface StatusAuditActorData {
  id: string;
  login?: string | null;
  name: string;
}

export interface StatusAuditChangeData {
  at: string;
  fromStatus?: string;
  toStatus: string;
  reason: string;
  actor: StatusAuditActorData;
  source?: string;
  auto?: boolean;
}

export interface TournamentStatusAuditData {
  lastChange: StatusAuditChangeData;
  history: StatusAuditChangeData[];
  canceledAt?: string;
  canceledBy?: StatusAuditActorData;
  cancelReason?: string;
  autoCanceledAt?: string;
  autoCancelReason?: string;
  autoCancelSource?: string;
}
