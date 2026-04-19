export interface BaseResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface RegistrationResult {
  seminarNum: number;
  departmentRatios: { department: string; count: number; percentage: number }[];
  gradeRatios: { grade: string; count: number; percentage: number }[];
  attendanceSummary: {
    totalApplicants: number;
    presentCount: number;
    attendanceRate: number;
  };
  inflows: {
    inflowType: string;
    count: number;
    inflowRate: number;
  };
}

export interface KeywordSearchCount {
  date: string;
  keyword: string;
  searchCount: number;
}

export interface PopularKeywordsResult {
  totalSearchCount: number;
  keywords: KeywordSearchCount[];
}

export interface ViewCountItem {
  date: string;
  viewCount: number;
}

export interface ViewStatisticsResult {
  totalviewcount: number;
  viewPoints: ViewCountItem[];
}
