export interface MechanicsWeightsData {
  partnerRepeat: number;
  partnerImmediateRepeat: number;
  opponentRepeat: number;
  opponentRecentRepeat: number;
  balance: number;
  unevenBye: number;
  consecutiveBye: number;
  pairInternalImbalance: number;
}

export interface MechanicsConfigData {
  mode: string;
  rounds: number | null;
  courts: number | null;
  useRatings: boolean;
  firstRoundSeeding: string;
  roundExactThreshold: number;
  balanceOutlierThreshold: number;
  balanceOutlierWeight: number;
  strictPartnerUniqueness: string;
  strictBalance: string;
  avoidRepeatOpponents: boolean;
  avoidRepeatPartners: boolean;
  distributeByesEvenly: boolean;
  historyDepth: number;
  localSearchIterations: number;
  pairingExactThreshold: number;
  matchExactThreshold: number;
  weights: MechanicsWeightsData;
}

export interface TournamentMechanicsData {
  enabled: boolean;
  config: MechanicsConfigData;
  raw: {
    enabled: boolean;
    config: MechanicsConfigData;
  };
}
