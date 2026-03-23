const MOCK_STATS_DATA = {
  attendance: {
    totalCount: 100,
    attendanceCount: 60,
    absentCount: 40,
  },
  deptYear: {
    departments: [
      { name: '컴퓨터공학과', count: 40 },
      { name: '시각디자인과', count: 30 },
      { name: '경영학과', count: 20 },
      { name: '기타', count: 10 },
    ],
    years: [
      { name: '1학년', count: 20 },
      { name: '2학년', count: 30 },
      { name: '3학년', count: 40 },
      { name: '4학년', count: 10 },
    ],
  },
  inflow: [
    { name: '지인', count: 60, percentage: 60 },
    { name: '교내 게시물', count: 20, percentage: 20 },
    { name: '에타, 학과 채팅방', count: 10, percentage: 10 },
    { name: 'SNS', count: 5, percentage: 5 },
    { name: '기타', count: 5, percentage: 5 },
  ],
};
export default MOCK_STATS_DATA;
