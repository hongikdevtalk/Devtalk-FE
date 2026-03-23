export interface ViewCountItem {
  date: string;
  count: number;
}

export const MOCK_VIEW_DATA: ViewCountItem[] = [
  { date: '11/29', count: 30 },
  { date: '11/30', count: 40 },
  { date: '12/01', count: 31 },
  { date: '12/02', count: 60 },
  { date: '12/03', count: 52 },
  { date: '12/04', count: 38 },
  { date: '12/05', count: 42 },
];

export const DATE_OPTIONS = {
  years: ['2024', '2025', '2026'],
  months: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')),
  days: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
  hours: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
  minutes: ['00', '10', '20', '30', '40', '50'],
};

export const DATE_UNITS = [
  { label: '년', key: 'years' },
  { label: '월', key: 'months' },
  { label: '일', key: 'days' },
  { label: '시', key: 'hours' },
  { label: '분', key: 'minutes' },
] as const;

export type DateUnitKey = (typeof DATE_UNITS)[number]['key'];
