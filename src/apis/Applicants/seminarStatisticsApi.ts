import { adminInstance } from '../adminInstance';
import type { SeminarStatisticsResponse } from '../../types/Applicants/seminarStatistics.api';

export const getSeminarStatistics = async (
  round: number,
  startDate?: string,
  endDate?: string
): Promise<SeminarStatisticsResponse> => {
  const { data } = await adminInstance.get<SeminarStatisticsResponse>(
    `/admin/statistics/registration`,
    {
      params: {
        round,
        start_date: startDate,
        end_date: endDate,
      },
    }
  );
  return data;
};

export const getPopularKeywords = async (
  startDate?: string,
  endDate?: string
): Promise<SeminarStatisticsResponse> => {
  const { data } = await adminInstance.get(`/admin/statistics/search`, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });
  return data;
};

export const getViewStatistics = async (
  round: number,
  startDate?: string,
  endDate?: string
): Promise<SeminarStatisticsResponse> => {
  const { data } = await adminInstance.get(`/admin/statistics/views`, {
    params: {
      round,
      start_date: startDate,
      end_date: endDate,
    },
  });
  return data;
};
