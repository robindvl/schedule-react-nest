interface TournamentSignupHeaderProps {
  title: string;
  backLabel: string;
  onBack?: () => void;
}

export function TournamentSignupHeader({
  title,
  backLabel,
  onBack,
}: TournamentSignupHeaderProps) {
  return (
    <header className="tournament-signup-header">
      <button className="page-back" type="button" onClick={onBack}>
        {backLabel}
      </button>
      <div className="tournament-signup-header-title">
        <div className="page-title">{title}</div>
      </div>
    </header>
  );
}
