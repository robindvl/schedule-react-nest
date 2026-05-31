import { useEffect, useMemo, useState } from 'react';

import {
  buildDatesFromItems,
  buildStationOptionsFromItems,
  buildTypeOptionsFromItems,
  TournamentCardList,
  type TournamentWidgetProps,
} from '../../../entities/tournament';
import {
  mapCardToMinimalDetail,
  TournamentDetailView,
  type TournamentDetailData,
} from '../../../features/tournament-detail';
import { DatePickerRow } from '../../../features/tournament-date-picker';
import { FilterBar } from '../../../features/tournament-filters';
import '../../../shared/styles/style.css';

import { TournamentSignupHeader } from './TournamentSignupHeader';
import './empty-list.css';


type WidgetView = 'list' | 'detail';

export function TournamentWidget({
  title = 'Запись на турниры',
  activeSection,
  onSectionChange,
  items,
  backLabel = '← Назад',
  onBack,
  onRefresh,
  onDateChange,
  onTypeChange,
  onStationChange,
  onOpenTournament,
  onLoadDetail,
}: TournamentWidgetProps) {
  const [view, setView] = useState<WidgetView>('list');
  const [detail, setDetail] = useState<TournamentDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  const handleOpenTournament = async (tournamentId: string) => {
    setView('detail');
    setDetail(null);
    setDetailLoading(true);

    try {
      if (onLoadDetail) {
        setDetail(await onLoadDetail(tournamentId));
      } else {
        const card = items.find((item) => item.id === tournamentId);
        setDetail(card ? mapCardToMinimalDetail(card) : null);
      }

      onOpenTournament?.(tournamentId);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setDetail(null);
  };

  const handleHeaderBack = () => {
    if (view === 'detail') {
      handleBackToList();
      return;
    }

    onBack?.();
  };

  if (view === 'detail') {
    return (
      <div className="tournament-signup-page">
        <TournamentSignupHeader
          title={title}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          backLabel={backLabel}
          onBack={handleHeaderBack}
        />

        <section className="tournament-signup-section tournament-signup-detail">
          {detailLoading && <p>Загрузка…</p>}
          {!detailLoading && detail && <TournamentDetailView data={detail} />}
          {!detailLoading && !detail && <p>Не удалось загрузить турнир</p>}
        </section>
      </div>
    );
  }

  return (
    <div className="tournament-signup-page">
      <TournamentSignupHeader
        title={title}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        backLabel={backLabel}
        onBack={handleHeaderBack}
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

        {filteredItems.length === 0 ? (
          <p className="tournament-signup-empty" role="status">
            На эту дату турниров больше нет, выберите другую дату
          </p>
        ) : (
          <TournamentCardList
            tournaments={filteredItems}
            onOpenTournament={handleOpenTournament}
          />
        )}
      </section>
    </div>
  );
}
