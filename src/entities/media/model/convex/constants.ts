export const convexMediaStatusValues = [
  'all',
  'scheduled',
  'watching',
  'postponed',
  'abandoned',
  'completed',
  'favorite',
] as const;

export type TMediaStatusValues = (typeof convexMediaStatusValues)[number];
