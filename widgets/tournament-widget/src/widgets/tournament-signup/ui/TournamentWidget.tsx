import { useMemo, useState } from 'react';

import {
  buildScheduleDates,
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

import { TournamentSignupHeader } from './TournamentSignupHeader';


type WidgetView = 'list' | 'detail';

export function TournamentWidget({
  title = 'Запись на турниры',
  activeSection,
  onSectionChange,
  items,
  selectedDateId: selectedDateIdProp,
  loading = false,
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

  const scheduleDates = useMemo(() => buildScheduleDates(14), []);
  const typeOptions = useMemo(() => buildTypeOptionsFromItems(items), [items]);
  const stationOptions = useMemo(
    () => buildStationOptionsFromItems(items),
    [items],
  );

  const [uncontrolledDateId, setUncontrolledDateId] = useState(
    () => scheduleDates[0]?.id ?? '',
  );
  const selectedDateId = selectedDateIdProp ?? uncontrolledDateId;
  const [selectedType, setSelectedType] = useState('__all__');
  const [selectedStation, setSelectedStation] = useState('__all__');

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
    if (selectedDateIdProp === undefined) {
      setUncontrolledDateId(dateId);
    }
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
          dates={scheduleDates}
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

        {loading ? (
          <p className="tournament-signup-loading" role="status">
            Загрузка…
          </p>
        ) : filteredItems.length === 0 ? (
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
