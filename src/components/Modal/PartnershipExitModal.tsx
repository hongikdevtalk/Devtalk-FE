import React from 'react';

interface PartnershipExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const PartnershipExitModal: React.FC<PartnershipExitModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] px-20">
      {/* 뒷배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" onClick={onClose} />

      {/* 모달 */}
      <div className="relative z-10 w-full max-w-[343px] bg-white rounded-[15px] flex flex-col items-center shadow-lg overflow-hidden px-[30px] py-[40px]">
        <div className="flex flex-col items-center mb-6">
          <p className="heading-3-medium text-black leading-[1.4] break-keep whitespace-pre-line">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full h-[45px] rounded-[8px] border border-grey-400 bg-white active:bg-grey-50 transition-colors flex items-center justify-center"
        >
          <span className="text-grey-700 subhead-1-semibold cursor-pointer">닫기</span>
        </button>
      </div>
    </div>
  );
};

export default PartnershipExitModal;
