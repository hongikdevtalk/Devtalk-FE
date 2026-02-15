import React, { useState, memo } from 'react';
import deleteIcon from '../../../assets/icons/common/delete.svg';
import type { FileData } from '../../../types/SeminarManage/seminarFile.api';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BITES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface AdminPresentationUploadProps {
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  serverFiles?: FileData[];
  onRemoveServer?: (index: number) => void;
  maxFiles?: number;
  accept?: string;
}

const FileItem = memo(
  ({
    fileName,
    fileSize,
    onRemove,
  }: {
    fileName: string;
    fileSize: number;
    onRemove?: () => void;
  }) => (
    <div className="bg-grey-700 rounded-8 p-24 flex justify-between items-center">
      <span className="text-grey-200 subhead-2-medium">
        {fileName} [{(fileSize / (1024 * 1024)).toFixed(1)}MB]
      </span>
      {onRemove && (
        <button onClick={onRemove} className="cursor-pointer" type="button">
          <img src={deleteIcon} alt="삭제" />
        </button>
      )}
    </div>
  )
);

const AdminPresentationUpload: React.FC<AdminPresentationUploadProps> = ({
  onUpload,
  onRemove,
  serverFiles = [],
  onRemoveServer,
  maxFiles = 10,
  accept = '.pdf,.ppt,.pptx,image/*',
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);

    const validFiles: File[] = [];
    const oversizedFiles: string[] = [];

    fileArray.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BITES) {
        oversizedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (oversizedFiles.length > 0) {
      alert(
        `${oversizedFiles.join('\n')}\n\n위 파일은 ${MAX_FILE_SIZE_MB}MB를 초과하여 업로드 할 수 없습니다.`
      );
    }

    if (validFiles.length === 0) {
      return;
    }

    if (serverFiles.length + files.length + validFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지만 업로드할 수 있습니다.`);
      return;
    }

    const updated = [...files, ...validFiles];
    setFiles(updated);
    onUpload(updated);
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onRemove(index);
  };

  return (
    <div className="w-full mx-auto">
      {/* 업로드 박스 */}
      <div
        className="bg-grey-700 rounded-8 flex flex-col p-[73px] items-center justify-center text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-white subhead-2-medium mb-24">
          첨부할 파일을 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.
        </p>
        <label className="cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <span className="w-[175px] h-[52px] px-[50px] py-[12px] bg-green-300 text-black rounded-8 heading-3-semibold flex items-center justify-center hover:opacity-80">
            파일 선택
          </span>
        </label>
      </div>

      {/* 파일 개수 표시 (서버+로컬) */}
      <span className="flex items-center gap-1 mt-20 mb-16">
        <span className={serverFiles.length + files.length ? 'text-green-300' : 'text-grey-300'}>
          {serverFiles.length + files.length}개
        </span>
        <span className="text-grey-300"> / {maxFiles}개</span>
      </span>

      {/* 파일 정보 박스 */}
      <div className="space-y-8">
        {/* 서버 파일 목록 */}
        {serverFiles.map((file, i) => (
          <FileItem
            key={`server-${file.fileUrl}-${i}`}
            fileName={file.fileName}
            fileSize={file.fileSize}
            onRemove={onRemoveServer ? () => onRemoveServer(i) : undefined}
          />
        ))}

        {/* 로컬 업로드 파일 목록 */}
        {files.map((file, i) => (
          <FileItem
            key={`local-${file.name}-${i}`}
            fileName={file.name}
            fileSize={file.size}
            onRemove={() => handleRemove(i)}
          />
        ))}

        {/* 파일 없음 표시 */}
        {serverFiles.length === 0 && files.length === 0 && (
          <span className="text-grey-200">첨부된 파일 없음</span>
        )}
      </div>
    </div>
  );
};

export default AdminPresentationUpload;
