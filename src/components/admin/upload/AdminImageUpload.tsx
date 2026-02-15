import React from 'react';
import deleteIcon from '../../../assets/icons/common/delete.svg';
import LoadingSpinner from '../../common/LoadingSpinner';

interface AdminImageUploadProps {
  title: string;
  serverFileName?: string; // 서버에서 받아온 파일 이름
  serverFileUrl?: string; // 미리보기 이미지 url
  serverFileCount?: number; // 현재 서버에 등록된 파일 개수
  isUploading?: boolean; // 업로딩
  pendingFile?: File; // 로컬에서 방금 업로드한 파일 (미리보기 용)
  onUpload: (files: File[]) => void; // 서버 업로드 요청
  onRemove: () => void; // 서버 삭제 요청
}

const AdminImageUpload: React.FC<AdminImageUploadProps> = ({
  title,
  serverFileName,
  serverFileUrl,
  serverFileCount = 0,
  isUploading = false,
  pendingFile,
  onUpload,
  onRemove,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(undefined);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const files = Array.from(newFiles);
    onUpload(files); // 서버 업로드 요청
  };

  // 로컬 업로드 파일 미리보기 URL 관리
  React.useEffect(() => {
    if (pendingFile) {
      const objectUrl = URL.createObjectURL(pendingFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(undefined);
  }, [pendingFile]);

  return (
    <div className="w-full  mx-auto bg-grey-900 p-6 rounded-10 space-y-4 relative">
      {/* 제목 */}
      <h2 className="heading-2-bold text-white mb-24">{title}</h2>

      {/* 업로드 박스 */}
      <div
        className={`bg-grey-700 rounded-8 flex flex-col p-[73px] items-center justify-center text-center transition-all duration-200 ${
          isUploading ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-white subhead-2-medium mb-24">
          첨부할 이미지를 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.
        </p>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <span className="w-[175px] h-[52px] px-[50px] py-[12px] bg-green-300 text-black rounded-8 heading-3-semibold flex items-center justify-center hover:opacity-80">
            파일 선택
          </span>
        </label>
      </div>

      {/* 업로드 중 로딩 */}
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-8">
          <LoadingSpinner />
        </div>
      )}

      {/* 파일 개수 표시 */}
      <span className="flex items-center gap-1 mt-20 mb-16">
        <span className={serverFileCount || pendingFile ? 'text-green-300' : 'text-grey-300'}>
          {serverFileCount || pendingFile ? 1 : 0}개
        </span>
        <span className="text-grey-300"> / 1개</span>
      </span>

      {/* 파일 정보 박스 */}
      <div className="space-y-2">
        {pendingFile || serverFileName ? (
          <div className="bg-grey-700 rounded-8 px-24 py-20 flex justify-between items-center">
            <div className="flex items-center gap-12">
              {/* 썸네일 */}
              {(previewUrl || serverFileUrl) && (
                <img
                  src={previewUrl || serverFileUrl}
                  alt={pendingFile ? pendingFile.name : serverFileName || 'thumbnail'}
                  className="w-[26px] h-[26px] object-cover rounded-6 border border-grey-600"
                />
              )}
              <span className="text-grey-200 subhead-2-medium">
                {pendingFile ? pendingFile.name : serverFileName || '첨부된 이미지'}
              </span>
            </div>
            <button onClick={onRemove} className="cursor-pointer">
              <img src={deleteIcon} alt="삭제" />
            </button>
          </div>
        ) : (
          <span className="text-grey-200">첨부된 이미지 없음</span>
        )}
      </div>
    </div>
  );
};

export default AdminImageUpload;
