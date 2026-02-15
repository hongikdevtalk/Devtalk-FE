export type CommonResponse<T = null> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
  error?: Record<string, any> | null;
};

// 빈 객체 응답
export type EmptyResultResponse = CommonResponse<Record<string, never>>;
