export function pathToHookName(path: string): string {
  const name = path
    .split('.')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return `use${name}Api`;
}

export function createApiHooks<TStub extends Record<string, unknown>>(
  stub: TStub,
  useApiClient: (path: string) => unknown,
): Record<string, () => unknown> {
  const hooks: Record<string, () => unknown> = {};

  function walk(obj: Record<string, unknown>, prefix: string) {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (value != null && typeof value === 'object' && !Array.isArray(value)) {
        const hookName = pathToHookName(path);
        hooks[hookName] = () => useApiClient(path);
        walk(value as Record<string, unknown>, path);
      }
    }
  }

  walk(stub, '');
  return hooks;
}

