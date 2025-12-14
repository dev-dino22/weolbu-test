export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (a instanceof Date && b instanceof Date)
      return a.getTime() === b.getTime();

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (
        !deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
      )
        return false;
    }

    return true;
  }

  return false;
}

export function equalByKeys<T extends Record<string, unknown>>(
  objA: T | null | undefined,
  objB: T | null | undefined,
  keys: (keyof T)[]
): boolean {
  for (const k of keys) {
    if (!deepEqual(objA?.[k], objB?.[k])) return false;
  }
  return true;
}
