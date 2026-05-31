import type { TournamentData } from '../entities/tournament.entity';

export interface TournamentApiResponse {
  data: TournamentData[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface TournamentFilterParams {
  status?: string;
  studioId?: string;
  dateFrom?: string;
  dateTo?: string;
  format?: string;
  gender?: string;
}
