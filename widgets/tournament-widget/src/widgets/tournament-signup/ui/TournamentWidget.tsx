import { useEffect, useMemo, useState } from 'react';

import {
  buildDatesFromItems,
  buildStationOptionsFromItems,
  buildTypeOptionsFromItems,
  TournamentCardList,
  type TournamentWidgetProps,
} from '../../../entities/tournament';
import { DatePickerRow } from '../../../features/tournament-date-picker';
import { FilterBar } from '../../../features/tournament-filters';
import '../../../shared/styles/style.css';

import { TournamentSignupHeader } from './TournamentSignupHeader';

export function TournamentWidget({
  title,
  items,
  backLabel = '← Назад',
  onBack,
  onRefresh,
  onDateChange,
  onTypeChange,
  onStationChange,
  onOpenTournament,
}: TournamentWidgetProps) {
  const dates = useMemo(() => buildDatesFromItems(items), [items]);
  const typeOptions = useMemo(() => buildTypeOptionsFromItems(items), [items]);
  const stationOptions = useMemo(
    () => buildStationOptionsFromItems(items),
    [items],
  );

  const [selectedDateId, setSelectedDateId] = useState('');
  const [selectedType, setSelectedType] = useState('__all__');
  const [selectedStation, setSelectedStation] = useState('__all__');

  useEffect(() => {
    setSelectedDateId(dates[0]?.id ?? '');
  }, [dates]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesDate = !selectedDateId || item.dateId === selectedDateId;
      const matchesType =
        selectedType === '__all__' || item.format === selectedType;
      const matchesStation =
        selectedStation === '__all__' ||
        item.locationLabel === selectedStation;

      return matchesDate && matchesType && matchesStation;
    });
  }, [items, selectedDateId, selectedStation, selectedType]);

  const handleDateChange = (dateId: string) => {
    setSelectedDateId(dateId);
    onDateChange?.(dateId);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onTypeChange?.(value);
  };

  const handleStationChange = (value: string) => {
    setSelectedStation(value);
    onStationChange?.(value);
  };

  return (
    <div className="tournament-signup-page">
      <TournamentSignupHeader
        title={title}
        backLabel={backLabel}
        onBack={onBack}
      />

      <section className="tournament-signup-section">
        <DatePickerRow
          dates={dates}
          selectedDateId={selectedDateId}
          onDateChange={handleDateChange}
        />

        <FilterBar
          typeOptions={typeOptions}
          stationOptions={stationOptions}
          selectedType={selectedType}
          selectedStation={selectedStation}
          onTypeChange={handleTypeChange}
          onStationChange={handleStationChange}
          onRefresh={onRefresh}
        />

        <TournamentCardList
          tournaments={filteredItems}
          onOpenTournament={onOpenTournament}
        />
      </section>
    </div>
  );
}
