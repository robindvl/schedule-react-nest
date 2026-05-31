import type { TournamentSignupCard } from '../model/types';
import { cardStyles as s } from '../../../shared/ui/card-styles';
import { CalendarIcon, LevelIcon, LocationIcon, TrophyIcon } from '../../../shared/ui/icons';

interface TournamentCardProps {
  tournament: TournamentSignupCard;
  onOpen?: (tournamentId: string) => void;
}

export function TournamentCard({ tournament, onOpen }: TournamentCardProps) {
  const segments = Array.from({ length: tournament.maxParticipants }, (_, index) =>
    index < tournament.currentParticipants,
  );
  const avatarUrl = tournament.trainer.avatarUrl.trim();

  return (
    <article className={`community-feed-card community-feed-card--tournament ${s.card}`}>
      <div className={s.layout}>
        <div className={s.author}>
          <div className={s.avatar}>
            {avatarUrl ? <img alt="" src={avatarUrl} /> : null}
          </div>
          <div className={s.authorText}>
            <span className={s.authorName}>{tournament.trainer.name}</span>
            <span className={s.authorHandle}>{tournament.trainer.stationLabel}</span>
          </div>
          <span className={s.menuDots}>...</span>
        </div>

        <div className={s.tournament}>
          <div className={s.topLine}>
            <span className={s.badge}>
              <TrophyIcon />
              {tournament.format}
            </span>
            <div
              className={s.dateWrap}
              aria-label={`Дата турнира ${tournament.dateDay} ${tournament.dateMonth} ${tournament.dateWeekday}`}
            >
              <div className={s.dateBadge}>
                <span className={s.dateDay}>{tournament.dateDay}</span>
                <span className={s.dateMonth}>{tournament.dateMonth}</span>
              </div>
            </div>
          </div>

          <h3 className={s.title}>{tournament.title}</h3>

          <div className={s.meta}>
            <span className={s.metaRow}>
              <span className={s.metaIcon}>
                <CalendarIcon />
              </span>
              <span>{tournament.scheduleLabel}</span>
            </span>
            <span className={s.metaRow}>
              <span className={s.metaIcon}>
                <LocationIcon />
              </span>
              <span>{tournament.locationLabel}</span>
            </span>
            <span className={s.metaRow}>
              <span className={s.metaIcon}>
                <LevelIcon />
              </span>
              <span>{tournament.levelLabel}</span>
            </span>
          </div>

          <div className={s.priceWrap}>
            <button
              className={s.price}
              type="button"
              aria-expanded="false"
              aria-haspopup="dialog"
              aria-label="Стоимость энергии"
            >
              {tournament.priceLabel}
            </button>
          </div>

          <div className={s.capacity}>
            <div className={s.progressTrack}>
              {segments.map((filled, index) => (
                <span
                  key={index}
                  className={`${s.progressSegment}${filled ? ` ${s.progressSegmentFilled}` : ''}`}
                />
              ))}
            </div>
            <div className={s.capacityLabels}>
              <div className={s.capacityLabel}>
                <span className={s.capacityLabelAccent}>{tournament.currentParticipants}</span>
                <span className={s.capacityLabelMuted}>
                  /{tournament.maxParticipants} участников
                </span>
              </div>
              <div className={s.capacityRemaining}>
                осталось: {tournament.availableSpots} мест
              </div>
            </div>
          </div>

          <div className={s.footer}>
            <span className={s.waitlist}>Лист ожидания: {tournament.waitlistCount}</span>
            <button
              type="button"
              className={s.action}
              onClick={() => onOpen?.(tournament.id)}
            >
              {tournament.actionLabel}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
