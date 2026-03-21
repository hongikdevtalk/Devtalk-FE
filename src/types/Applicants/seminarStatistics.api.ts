export interface SeminarStatisticsData {
  attendance: {
    total: number;
    attended: number;
    absent: number;
  };

  deptYear: {
    departments: { name: string; count: number }[];
    years: { name: string; count: number }[];
  };

  inflow: {
    name: string;
    count: number;
    percentage: number;
  }[];

  viewCount: {
    date: string;
    count: number;
  }[];
}

export interface SeminarStatisticsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SeminarStatisticsData;
}
