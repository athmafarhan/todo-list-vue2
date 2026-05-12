// constants/sort.ts

export const SORT_OPTIONS = {
  DATE_ASC: {
    value: 'date-asc',
    label: 'Date (ASC)',
  },
  DATE_DESC: {
    value: 'date-desc',
    label: 'Date (DESC)',
  },
  A_Z: {
    value: 'a-z',
    label: 'A to Z',
  },
  Z_A: {
    value: 'z-a',
    label: 'Z to A',
  },
  DONE_FIRST: {
    value: 'done-first',
    label: 'Done first',
  },
  UNDONE_FIRST: {
    value: 'undone-first',
    label: 'Undone first',
  },
} as const

export type Sort =
  typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]['value']