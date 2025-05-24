export const hasProperty = <T extends object, K extends PropertyKey, V>(
  obj: T,
  key: K,
  predicate: (value: unknown) => value is V
): obj is T & Record<K, V> => {
  return key in obj && predicate((obj as any)[key]);
};
