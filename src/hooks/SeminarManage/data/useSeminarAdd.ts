import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AddSeminarRequest } from '../../../types/SeminarManage/seminarAdd.api';
import type { PendingFiles } from '../../../types/SeminarManage/seminarFile.api';
import { postSeminar } from '../../../apis/SeminarDetail/seminarAddApi';
import { QUERY_KEYS } from '../../../constants/queryKey';

// 세미나 추가
export const useSeminarAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: AddSeminarRequest; fileData: PendingFiles }) =>
      postSeminar(params.data, params.fileData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.ADMIN_SEMINAR_CARDS],
      });
    },
  });
};
