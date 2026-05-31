import type { SignupSectionId } from '../../../entities/tournament';

const SECTIONS: { id: SignupSectionId; label: string }[] = [
  { id: 'trainings', label: 'Тренировочные' },
  { id: 'tournaments', label: 'Соревновательные' },
];

interface TournamentSignupHeaderProps {
  title: string;
  activeSection: SignupSectionId;
  onSectionChange: (section: SignupSectionId) => void;
  backLabel: string;
  onBack?: () => void;
}

export function TournamentSignupHeader({
  title,
  activeSection,
  onSectionChange,
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
      <nav
        className="tournament-signup-section-nav"
        aria-label="Разделы записи"
      >
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`tournament-signup-section-nav-item${
              activeSection === id ? ' is-active' : ''
            }`}
            aria-current={activeSection === id ? 'page' : undefined}
            onClick={() => {
              if (id !== activeSection) {
                onSectionChange(id);
              }
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
