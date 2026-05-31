import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { tournamentSignupMockItems } from './src/entities/tournament';
import { TournamentWidget } from './src/widgets/tournament-signup';
import './src/shared/styles/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TournamentWidget title="Запись на турниры" items={tournamentSignupMockItems} />
  </StrictMode>,
);
