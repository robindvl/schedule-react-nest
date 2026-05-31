import { useState } from 'react';

import type { TournamentDetailData, TournamentDetailTab } from '../model/types';

import { TournamentParticipantRow } from './TournamentParticipantRow';

interface TournamentDetailViewProps {
  data: TournamentDetailData;
  onInviteFriend?: () => void;
}

export function TournamentDetailView({ data, onInviteFriend }: TournamentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TournamentDetailTab>('roster');
  const organizerAvatar = data.organizer.avatarUrl.trim();

  return (
    <>
      <div className="details-card tournament-signup-details-card">
        <div className="details-row">
          <div className="details-main">
            <div className="details-date details-date-capitalize">{data.dateLabel}</div>
            <div className="details-time">{data.timeLabel}</div>
            <div className="details-time">
              <button type="button" className="tournament-signup-station-link">
                {data.stationName}
              </button>
            </div>
            <div className="details-time details-time-strong">{data.title}</div>
            <div className="details-time">{data.format}</div>
          </div>
          <button
            type="button"
            className="calendar-date-badge-button"
            disabled
            aria-label="Добавить событие в календарь"
            title="Добавить в календарь"
          >
            <span className="booking-date-badge game-created-date-badge">
              <span className="booking-date-badge-month">{data.monthBadge}</span>
              <span className="booking-date-badge-day">{data.dayBadge}</span>
            </span>
            <span className="calendar-date-badge-caption">в календарь</span>
          </button>
        </div>
      </div>

      <div className="details-tabs" role="tablist" aria-label="Разделы турнира">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'roster'}
          className={`details-tab${activeTab === 'roster' ? ' active' : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          Состав
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'rules'}
          className={`details-tab${activeTab === 'rules' ? ' active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Регламент
        </button>
      </div>

      {activeTab === 'roster' ? (
        <>
          <div className="details-roster-card details-organizer-card">
            <div className="details-roster-head">
              <div className="details-roster-title">Организатор</div>
            </div>
            <div className="details-roster-list">
              <div className="details-roster-row">
                <div className="details-roster-player">
                  {organizerAvatar ? (
                    <img
                      alt={data.organizer.name}
                      className="details-roster-avatar"
                      src={organizerAvatar}
                    />
                  ) : (
                    <span className="details-roster-avatar details-roster-avatar-fallback">
                      {data.organizer.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div className="details-roster-meta">
                    <div className="details-roster-name">{data.organizer.name}</div>
                  </div>
                </div>
                <span className="details-roster-badge">Организатор</span>
              </div>
            </div>
          </div>

          {data.description ? (
            <div
              className="details-match-comment tournament-signup-description"
              aria-label="Описание турнира"
            >
              <span className="details-match-comment-quote" aria-hidden="true">
                “
              </span>
              <span style={{ whiteSpace: 'pre-line' }}>{data.description}</span>
              <span className="details-match-comment-quote" aria-hidden="true">
                ”
              </span>
            </div>
          ) : null}

          <div className="details-roster-card">
            <div className="details-roster-head">
              <div className="details-roster-title">Участники турнира</div>
              <div className="details-roster-count">
                {data.currentParticipants}/{data.maxParticipants}
              </div>
            </div>
            <div className="details-roster-list">
              {data.participants.map((participant) => (
                <TournamentParticipantRow key={participant.id} participant={participant} />
              ))}
              <button
                type="button"
                className="details-roster-row details-roster-row-invite"
                onClick={onInviteFriend}
              >
                <span className="details-roster-player">
                  <span
                    className="details-roster-avatar-wrap details-roster-avatar-wrap-invite"
                    aria-hidden="true"
                  >
                    <span className="details-roster-avatar details-roster-avatar-invite-plus">
                      +
                    </span>
                  </span>
                  <span className="details-roster-meta">
                    <span className="details-roster-name">Пригласи друга</span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="tournament-signup-register-stack">
            <div className="tournament-signup-auth">
              <div className="tournament-signup-auth-head">
                <strong>
                  <span className="tournament-signup-auth-title">Выбери способ записи</span>
                </strong>
              </div>
              <div className="tournament-signup-payment-options">
                <div className="tournament-signup-payment-group">
                  <button type="button" className="tournament-signup-payment-purchase-toggle">
                    Записаться разово или по абонементу
                  </button>
                </div>
                <div className="tournament-signup-payment-group">
                  <button type="button" className="tournament-signup-payment-purchase-toggle">
                    Войти и записаться по подписке
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="details-roster-card">
          <div className="details-roster-head">
            <div className="details-roster-title">Регламент</div>
          </div>
          <p className="details-time">Регламент турнира будет опубликован позже.</p>
        </div>
      )}
    </>
  );
}
