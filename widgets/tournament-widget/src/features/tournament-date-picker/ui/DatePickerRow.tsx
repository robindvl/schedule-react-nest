import type { TournamentSignupDateOption } from '../../../entities/tournament/model/types';

interface DatePickerRowProps {
  dates: TournamentSignupDateOption[];
  selectedDateId: string;
  onDateChange: (dateId: string) => void;
}

export function DatePickerRow({
  dates,
  selectedDateId,
  onDateChange,
}: DatePickerRowProps) {
  return (
    <div className="date-row">
      {dates.map((date) => (
        <div key={date.id} className="date-item">
          <div className="date-weekday">{date.weekday}</div>
          <button
            className={`date-chip${selectedDateId === date.id ? ' active' : ''}`}
            type="button"
            onClick={() => onDateChange(date.id)}
          >
            <div className="booking-date-badge">
              <div className="booking-date-badge-month">{date.month}</div>
              <div className="booking-date-badge-day">{date.day}</div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
