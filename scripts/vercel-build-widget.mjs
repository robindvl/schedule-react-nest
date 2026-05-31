import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const widgetIndex = join(root, 'widgets/tournament-widget/dist/index.html');
const pnpm = 'npx -y pnpm@9.15.9';

function run(command) {
  execSync(command, { cwd: root, stdio: 'inherit' });
}

run(`${pnpm} --filter @widget/tournament-widget build`);

if (!existsSync(widgetIndex)) {
  throw new Error(`Widget build missing ${widgetIndex}`);
}
