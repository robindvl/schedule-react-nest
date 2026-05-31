export enum TournamentSource {
  CUSTOM = 'CUSTOM',
  VIVA = 'VIVA',
}

export enum TournamentStatus {
  REGISTRATION = 'REGISTRATION',
  RUNNING = 'RUNNING',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum TournamentGender {
  MIXED = 'MIXED',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export enum TournamentFormat {
  AMERICANO = 'Американо',
  AMERICANO_PARNY = 'Американо Парный',
  MEXICANO = 'Мексикано',
  ROUND_ROBIN = 'Round robin',
}

export enum MechanicsMode {
  SHORT_AMERICANO = 'short_americano',
  TEAM_AMERICANO = 'team_americano',
  ROUND_ROBIN = 'round_robin',
}
