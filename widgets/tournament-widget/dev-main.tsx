import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  tournamentSignupMockItems,
  type SignupSectionId,
} from './src/entities/tournament';
import { tournamentDetailMock } from './src/features/tournament-detail';
import { TournamentWidget } from './src/widgets/tournament-signup';
import './src/shared/styles/style.css';

function DevApp() {
  const [activeSection, setActiveSection] =
    useState<SignupSectionId>('tournaments');

  return (
    <TournamentWidget
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      items={tournamentSignupMockItems}
      onLoadDetail={async () => tournamentDetailMock}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevApp />
  </StrictMode>,
);
