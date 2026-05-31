import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiDistMain = join(root, 'apps/api/dist/src/main.js');
const pnpm = 'npx -y pnpm@9.15.9';

function run(command) {
  execSync(command, { cwd: root, stdio: 'inherit' });
}

run(`${pnpm} --filter @repo/domain build`);
run(`${pnpm} --filter api build`);

if (!existsSync(apiDistMain)) {
  throw new Error(`API build missing ${apiDistMain}`);
}
