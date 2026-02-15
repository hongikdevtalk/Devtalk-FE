import React from 'react';

interface AuthDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  adminName: string;
  adminId: string;
}

const AuthDeleteModal: React.FC<AuthDeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
  adminName,
  adminId,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* 모달 */}
      <div className="relative bg-grey-700 rounded-12 shadow-lg h-[340px] w-[607px] z-10 flex flex-col items-center justify-center text-center">
        <div className="text-white heading-1-semibold mb-20">
          ‘{adminName}’ 님의 관리자 권한을 삭제하시겠어요?
        </div>
        <p className="text-grey-300 heading-2-semibold mb-[75px]">ID: {adminId}</p>

        <div className="border-t border-grey-500 flex absolute bottom-0 left-0 w-full h-[87px]">
          <button
            onClick={onCancel}
            className="flex-1 py-20 heading-1-semibold text-white cursor-pointer hover:bg-grey-900/12"
          >
            취소하기
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-20 heading-1-semibold text-status-error border-l border-grey-500 cursor-pointer hover:bg-grey-900/12"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDeleteModal;
