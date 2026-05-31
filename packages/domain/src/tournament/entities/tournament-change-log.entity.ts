export interface ChangeLogChangeData {
  field: string;
  label: string;
  before?: string;
  after?: string;
}

export interface ChangeLogActorData {
  id: string;
  login?: string;
  name: string;
}

export interface TournamentChangeLogData {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  scope: string;
  summary: string;
  actor: ChangeLogActorData;
  at: string;
  changes: ChangeLogChangeData[];
}
