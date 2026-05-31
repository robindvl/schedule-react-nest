import type { TournamentSignupFilterOption } from '../../../entities/tournament/model/types';
import { RefreshIcon } from '../../../shared/ui/icons';

interface FilterBarProps {
  typeOptions: TournamentSignupFilterOption[];
  stationOptions: TournamentSignupFilterOption[];
  selectedType: string;
  selectedStation: string;
  onTypeChange: (value: string) => void;
  onStationChange: (value: string) => void;
  onRefresh?: () => void;
}

export function FilterBar({
  typeOptions,
  stationOptions,
  selectedType,
  selectedStation,
  onTypeChange,
  onStationChange,
  onRefresh,
}: FilterBarProps) {
  return (
    <div className="tournament-signup-filterbar">
      <label className="tournament-signup-filter">
        <span>Тип</span>
        <select value={selectedType} onChange={(event) => onTypeChange(event.target.value)}>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="tournament-signup-filter">
        <span>Станция</span>
        <select
          value={selectedStation}
          onChange={(event) => onStationChange(event.target.value)}
        >
          {stationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        className="tournament-signup-refresh"
        type="button"
        aria-label="Обновить турниры"
        title="Обновить"
        onClick={onRefresh}
      >
        <RefreshIcon />
      </button>
    </div>
  );
}
