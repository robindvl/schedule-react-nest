import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { tournamentSignupMockItems } from './src/entities/tournament';
import { tournamentDetailMock } from './src/features/tournament-detail';
import { TournamentWidget } from './src/widgets/tournament-signup';
import './src/shared/styles/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TournamentWidget
      title="Запись на турниры"
      items={tournamentSignupMockItems}
      onLoadDetail={async () => tournamentDetailMock}
    />
  </StrictMode>,
);
