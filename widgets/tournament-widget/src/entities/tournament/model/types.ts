export interface TournamentSignupDateOption {
  id: string;
  weekday: string;
  day: number;
  month: string;
}

export interface TournamentSignupFilterOption {
  value: string;
  label: string;
}

export interface TournamentSignupTrainer {
  name: string;
  avatarUrl: string;
  stationLabel: string;
}

export interface TournamentSignupCard {
  id: string;
  dateId: string;
  trainer: TournamentSignupTrainer;
  format: string;
  title: string;
  dateDay: number;
  dateMonth: string;
  dateWeekday: string;
  scheduleLabel: string;
  locationLabel: string;
  levelLabel: string;
  priceLabel: string;
  currentParticipants: number;
  maxParticipants: number;
  availableSpots: number;
  waitlistCount: number;
  actionLabel: string;
}

export type SignupSectionId = 'trainings' | 'tournaments';

export interface TournamentWidgetProps {
  /** Общий заголовок страницы (после «Назад») */
  title?: string;
  activeSection: SignupSectionId;
  onSectionChange: (section: SignupSectionId) => void;
  items: TournamentSignupCard[];
  /** YYYY-MM-DD; when set, the date row is controlled by the parent */
  selectedDateId?: string;
  /** List is being refetched (e.g. after date change) */
  loading?: boolean;
  backLabel?: string;
  onBack?: () => void;
  onRefresh?: () => void;
  onDateChange?: (dateId: string) => void;
  onTypeChange?: (value: string) => void;
  onStationChange?: (value: string) => void;
  onOpenTournament?: (tournamentId: string) => void;
  onLoadDetail?: (
    tournamentId: string,
  ) => Promise<
    import('../../../features/tournament-detail').TournamentDetailData | null
  >;
}
