import React from 'react';

interface ApplyExitModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ApplyExitModal: React.FC<ApplyExitModalProps> = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative bg-grey-700 rounded-12 shadow-lg w-[343px] z-10 text-center">
        <div className="text-white subhead-1-semibold mt-40 mb-8">
          진행 상황이 저장되지 않습니다.
        </div>
        <p className="text-grey-300 body-1-medium mb-28">정말 신청 페이지에서 나가시겠어요?</p>

        <div className="border-t border-grey-500 flex">
          <button
            onClick={onConfirm}
            className="flex-1 py-20 subhead-1-semibold text-white border-r border-grey-500 cursor-pointer"
          >
            나가기
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-20 subhead-1-semibold text-gradient cursor-pointer"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyExitModal;
