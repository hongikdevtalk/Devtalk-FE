import FormField from './FormField';
import AdminPresentationUpload from '../../upload/AdminPresentationUpload';
import type {
  FormErrors,
  SeminarDetailState,
  SeminarState,
} from '../../../../types/SeminarManage/seminar.state';
import { useCallback } from 'react';

interface SeminarFormProps {
  data: SeminarDetailState;
  pendingFiles: SeminarState['pendingFiles'];
  updateSeminarData: (data: Partial<SeminarDetailState>) => void;
  updatePendingFiles: (data: Partial<SeminarState['pendingFiles']>) => void;
  errors: FormErrors;
}

const SeminarForm = ({
  data,
  pendingFiles,
  updateSeminarData,
  updatePendingFiles,
  errors,
}: SeminarFormProps) => {
  // 회차의 Input 이밴트 핸들러
  const handleSeminarNumChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value === '' || /^\d*$/.test(value)) {
        const finalValue = value === '' ? null : parseInt(value);
        updateSeminarData({ seminarNum: finalValue });
      }
    },
    [updateSeminarData]
  );

  // 붙여넣기 이밴트 핸들러
  const handleSeminarNumPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pastedText = e.clipboardData.getData('text');
      const numbersOnly = pastedText.replace(/\D/g, '');

      if (numbersOnly) {
        updateSeminarData({ seminarNum: parseInt(numbersOnly) });
      }
    },
    [updateSeminarData]
  );

  // Input 이벤트 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateSeminarData({ [name]: value });
    },
    [updateSeminarData]
  );

  // 파일 업로드 핸들러
  const handleFileUpload = useCallback(
    (newFiles: File[]) => {
      updatePendingFiles({ materials: [...pendingFiles.materials, ...newFiles] });
    },
    [pendingFiles.materials, updatePendingFiles]
  );

  // 로컬 파일 제거 핸들러
  const handleFileRemove = useCallback(
    (indexToRemove: number) => {
      const updatedFiles = pendingFiles.materials.filter((_, index) => index !== indexToRemove);
      updatePendingFiles({ materials: updatedFiles });
    },
    [pendingFiles.materials, updatePendingFiles]
  );

  // 서버 파일 제거 핸들러
  const handleServerFileRemove = useCallback(
    (indexToRemove: number) => {
      const fileToDelete = data.materials[indexToRemove];

      const updatedMaterials = data.materials.filter((_, i) => i !== indexToRemove);
      updateSeminarData({ materials: updatedMaterials });

      updatePendingFiles({
        deletedMaterialUrls: [...pendingFiles.deletedMaterialUrls, fileToDelete.fileUrl],
      });
    },
    [data.materials, pendingFiles.deletedMaterialUrls, updateSeminarData, updatePendingFiles]
  );

  return (
    <div className="bg-grey-900 p-6 rounded-10">
      <h2 className="heading-2-bold text-white mb-[24px]">세미나 상세정보</h2>

      <form>
        <FormField
          label="회차"
          id="seminarNum"
          placeholder="회차를 입력해주세요."
          value={data.seminarNum ?? ''}
          onChange={handleSeminarNumChange}
          onPaste={handleSeminarNumPaste}
        />
        <FormField
          label="일정"
          id="seminarDate"
          placeholder="일정을 입력해주세요. (ex: 2025.10.8.18:00)"
          value={data.seminarDate}
          onChange={handleInputChange}
          error={errors.date}
        />
        <FormField
          label="장소"
          id="place"
          placeholder="장소를 입력해주세요."
          value={data.place}
          onChange={handleInputChange}
        />
        <FormField
          label="주제"
          id="topic"
          placeholder="주제를 입력해주세요. (20자 이내)"
          value={data.topic}
          onChange={handleInputChange}
          maxLength={20}
        />

        <p className="subhead-1-medium text-white mb-[16px]">발표자료</p>
        <AdminPresentationUpload
          onUpload={handleFileUpload}
          onRemove={handleFileRemove}
          serverFiles={data.materials}
          onRemoveServer={handleServerFileRemove}
        />
      </form>
    </div>
  );
};

export default SeminarForm;
