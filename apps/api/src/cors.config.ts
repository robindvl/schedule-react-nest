/**
 * CORS_ORIGINS — список через запятую. Спецзначения:
 * - `*` — любой origin (только для отладки)
 * - `*.vercel.app` — любой поддомен vercel.app (production/preview фронта)
 *
 * Если CORS_ORIGINS пуст и приложение на Vercel (VERCEL=1) — разрешены *.vercel.app и localhost.
 */
const VERCEL_APP = /^https:\/\/[\w.-]+\.vercel\.app$/;
const LOCALHOST = /^http:\/\/localhost(:\d+)?$/;

function parseOriginList(): string[] {
  return (
    process.env.CORS_ORIGINS?.split(',').map((item) => item.trim()).filter(Boolean) ??
    []
  );
}

export function isCorsOriginAllowed(origin: string | undefined): boolean {
  if (!origin) {
    return true;
  }

  const list = parseOriginList();

  if (list.includes('*')) {
    return true;
  }

  if (list.includes(origin)) {
    return true;
  }

  if (list.includes('*.vercel.app') && VERCEL_APP.test(origin)) {
    return true;
  }

  const frontendUrl = process.env.FRONTEND_URL?.trim();
  if (frontendUrl && origin === frontendUrl.replace(/\/+$/, '')) {
    return true;
  }

  if (list.length === 0) {
    if (process.env.VERCEL === '1' && VERCEL_APP.test(origin)) {
      return true;
    }
    if (LOCALHOST.test(origin)) {
      return true;
    }
    return false;
  }

  return false;
}

export function getCorsOptions() {
  return {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      callback(null, isCorsOriginAllowed(origin));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  };
}
