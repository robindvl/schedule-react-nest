/** API-метод с path (без origin) для React Query keys и инвалидации. */
export type ApiMethod<T extends (...args: never[]) => unknown> = T & {
  readonly path: string;
};

export function methodApi<T extends (...args: never[]) => unknown>(
  fn: T,
  path: string,
): ApiMethod<T> {
  const method = ((...args: Parameters<T>) =>
    fn(...args)) as ApiMethod<T>;
  Object.defineProperty(method, 'path', {
    value: path,
    writable: false,
    enumerable: true,
    configurable: false,
  });
  return method;
}
