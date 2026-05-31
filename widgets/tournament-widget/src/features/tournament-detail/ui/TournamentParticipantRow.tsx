import type { TournamentDetailParticipant } from '../model/types';

interface TournamentParticipantRowProps {
  participant: TournamentDetailParticipant;
}

function buildRingBackground(degrees: number): string {
  return `conic-gradient(from 180deg, rgb(243, 132, 96) 0deg, rgb(234, 92, 51) ${degrees}deg, rgb(231, 226, 255) ${degrees}deg, rgb(231, 226, 255) 360deg)`;
}

export function TournamentParticipantRow({ participant }: TournamentParticipantRowProps) {
  const avatarUrl = participant.avatarUrl?.trim();

  return (
    <div className="details-roster-row">
      <div className="details-roster-player">
        <div
          className="details-roster-avatar-wrap has-level"
          style={{ background: buildRingBackground(participant.ringDegrees) }}
        >
          {avatarUrl ? (
            <img
              alt={participant.name}
              className="details-roster-avatar"
              src={avatarUrl}
            />
          ) : (
            <span className="details-roster-avatar details-roster-avatar-fallback">
              {participant.initials}
            </span>
          )}
          <span
            className="details-roster-avatar-level"
            style={{ backgroundColor: 'rgb(236, 99, 57)', color: 'rgb(255, 255, 255)' }}
          >
            {participant.levelBadge}
          </span>
        </div>
        <div className="details-roster-meta">
          <div className="details-roster-name">{participant.name}</div>
          <div className="details-roster-sub">{participant.levelLabel}</div>
        </div>
      </div>
    </div>
  );
}
