import type { SeminarDetailState, SeminarState } from '../../../types/SeminarManage/seminar.state';
import {
  useSeminarUpdate,
  useSeminarFilesUpdate,
  useSeminarDelete,
} from '../data/useSeminarDetail';
import { useSeminarAdd } from '../data/useSeminarAdd';
import { mapStateToUpdateRequest } from '../../../utils/seminarMapper';
import type { AddSeminarRequest } from '../../../types/SeminarManage/seminarAdd.api';
import type { PendingFiles } from '../../../types/SeminarManage/seminarFile.api';

// 세미나 수정
export const useSeminarUpdateActions = (seminarId: number | undefined) => {
  const updateSeminarMutation = useSeminarUpdate(seminarId);
  const updateFilesMutation = useSeminarFilesUpdate(seminarId);
  const deleteSeminarMutation = useSeminarDelete(seminarId);

  const handleUpdateSeminar = async (
    currentState: SeminarDetailState,
    pendingFiles: SeminarState['pendingFiles']
  ) => {
    if (!seminarId) {
      throw new Error('세미나 ID가 없습니다.');
    }

    try {
      // 기본 정보 수정
      const updateRequest = mapStateToUpdateRequest(currentState);
      await updateSeminarMutation.mutateAsync(updateRequest);

      // 파일 수정
      const hasFileChanges =
        pendingFiles.thumbnail ||
        pendingFiles.materials.length > 0 ||
        pendingFiles.speakerProfiles.size > 0 ||
        pendingFiles.deletedMaterialUrls?.length > 0;

      if (hasFileChanges) {
        const speakerIds: number[] = [];
        const speakerProfiles: File[] = [];

        pendingFiles.speakerProfiles.forEach((file, speakerId) => {
          if (file !== null) {
            speakerIds.push(speakerId);
            speakerProfiles.push(file);
          }
        });

        await updateFilesMutation.mutateAsync({
          deleteMaterialUrls: pendingFiles.deletedMaterialUrls || [],
          speakerIds,
          thumbnailFile: pendingFiles.thumbnail || undefined,
          materials: pendingFiles.materials.length > 0 ? pendingFiles.materials : undefined,
          speakerProfiles: speakerProfiles.length > 0 ? speakerProfiles : undefined,
        });
      }

      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || '세미나 수정에 실패했습니다. 다시 시도해주세요.';
      throw new Error(errorMessage);
    }
  };

  const handleDeleteSeminar = async () => {
    if (!seminarId) {
      throw new Error('세미나 ID가 없습니다.');
    }

    try {
      await deleteSeminarMutation.mutateAsync(seminarId);
      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || '세미나 삭제에 실패했습니다. 다시 시도해주세요.';
      throw new Error(errorMessage);
    }
  };

  return {
    handleUpdateSeminar,
    handleDeleteSeminar,
    isLoading:
      updateSeminarMutation.isPending ||
      updateFilesMutation.isPending ||
      deleteSeminarMutation.isPending,
  };
};

// 세미나 추가
export const useSeminarAddActions = () => {
  const addSeminarMutation = useSeminarAdd();

  const handleAddSeminar = async (data: AddSeminarRequest, pendingFiles: PendingFiles) => {
    try {
      await addSeminarMutation.mutateAsync({ data, fileData: pendingFiles });
      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || '세미나 추가에 실패했습니다. 다시 시도해주세요.';
      throw new Error(errorMessage);
    }
  };

  return {
    handleAddSeminar,
    isLoading: addSeminarMutation.isPending,
  };
};
