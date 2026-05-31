import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const widgetDist = join(root, 'widgets/tournament-widget/dist');
const mfPublic = join(root, 'apps/web/public/mf-widget');
const pnpm = 'npx -y pnpm@9.15.9';

function run(command, env = {}) {
  execSync(command, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

run(`${pnpm} --filter @repo/domain build`);
run(`${pnpm} --filter @widget/tournament-widget build`);

if (!existsSync(join(widgetDist, 'remoteEntry.js'))) {
  throw new Error(`Widget build missing remoteEntry.js at ${widgetDist}`);
}

rmSync(mfPublic, { recursive: true, force: true });
mkdirSync(mfPublic, { recursive: true });
cpSync(widgetDist, mfPublic, { recursive: true });

run(`${pnpm} --filter web build`, {
  VITE_TOURNAMENT_WIDGET_REMOTE: '/mf-widget/remoteEntry.js',
});
