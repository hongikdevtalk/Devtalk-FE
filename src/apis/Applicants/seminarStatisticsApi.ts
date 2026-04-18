import { adminInstance } from '../adminInstance';
import type {
  BaseResponse,
  RegistrationResult,
  KeywordSearchCount,
  ViewCountItem,
} from '../../types/Applicants/seminarStatistics.api';

export const getSeminarStatistics = async (seminarId: number) => {
  const { data } = await adminInstance.get<BaseResponse<RegistrationResult>>(
    `/admin/seminars/${seminarId}/statistics`
  );
  return data;
};

export const getPopularKeywords = async (from?: string, to?: string) => {
  const { data } = await adminInstance.get<BaseResponse<KeywordSearchCount[]>>(
    `/admin/stats/search/top5`,
    {
      params: {
        from: from,
        to: to,
      },
    }
  );
  return data;
};

export const getViewStatistics = async (seminarId: number, from?: string, to?: string) => {
  const { data } = await adminInstance.get<BaseResponse<ViewCountItem[]>>(
    `/admin/stats/seminars/${seminarId}/views`,
    {
      params: {
        from: from,
        to: to,
      },
    }
  );
  return data;
};
