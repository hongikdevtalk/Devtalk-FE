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
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center gap-[24px] rounded-[10px] bg-white px-[30px] py-[40px]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-center gap-[15px]">
          <p className="heading-3-medium text-black">작성을 취소하시겠어요?</p>
          <p className="subhead-1-regular text-grey-700 text-center">
            지금 페이지를 나가면 입력하신 정보가<br />저장되지 않고 모두 삭제됩니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center gap-[12px]">
          <button
            onClick={onConfirm}
            className="cursor-pointer flex w-[150px] h-[45px] px-[41px] py-[12px] justify-center items-center rounded-[3px] border border-grey-700"
          >
            <span className="subhead-medium text-grey-700 whitespace-nowrap">작성 취소</span>
          </button>
          <button
            onClick={onCancel}
            className="cursor-pointer flex w-[150px] h-[45px] px-[26px] py-[12px] justify-center items-center rounded-[3px] bg-primary-200"
          >
            <span className="text-[18px] font-semibold leading-normal text-white">계속 작성하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyExitModal;
