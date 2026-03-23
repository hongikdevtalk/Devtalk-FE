export interface KeywordSearchCount {
  keyword: string;
  count: number;
}

export const MOCK_POPULAR_KEYWORDS: KeywordSearchCount[] = [
  { keyword: 'IT', count: 50 },
  { keyword: 'LLM', count: 40 },
  { keyword: '개발', count: 30 },
  { keyword: 'AI', count: 10 },
  { keyword: '금융', count: 5 },
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
