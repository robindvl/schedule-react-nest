/**
 * Точечный доступ по пути `a.b.c` для дерева API (без type-fest `Get`: у Path нет union depth,
 * совпадающего с `Paths<>` в новых версиях type-fest).
 */
export type GetApiClientType<
  T,
  Path extends string,
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? T[Head] extends object
      ? GetApiClientType<T[Head], Tail>
      : never
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

/**
 * Recursively collect all paths to object nodes (not to functions).
 */
export type AllPaths<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends (...args: unknown[]) => unknown
          ? never
          : T[K] extends object
            ? `${K}` | `${K}.${AllPaths<T[K]> & string}`
            : never
        : never;
    }[keyof T] extends infer O
    ? Exclude<O, never>
    : never
  : never;

export type ApiClientKey<T> = AllPaths<T>;

type PathToPascalCase<Path extends string> =
  Path extends `${infer Head}.${infer Tail}`
    ? `${Capitalize<Head>}${PathToPascalCase<Tail>}`
    : Capitalize<Path>;

type PathToHookName<Path extends string> = `use${PathToPascalCase<Path>}Api`;

/** Map of hook names to hook return types, derived from client shape T. */
export type ApiHooks<T> = {
  [Path in AllPaths<T> &
    string as PathToHookName<Path>]: () => GetApiClientType<T, Path>;
};
