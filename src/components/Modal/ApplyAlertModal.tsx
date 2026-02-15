import React from 'react';

interface ApplyAlertModalProps {
  open: boolean;
  onClose: () => void;
}

const ApplyAlertModal: React.FC<ApplyAlertModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative bg-grey-700 rounded-12 shadow-lg w-[343px] z-10 text-center">
        <div className="text-white subhead-1-semibold mt-40 mb-8">이미 신청 기록이 있습니다.</div>
        <p className="text-grey-300 body-1-medium mb-28">
          데브톡 세미나는 한 회차에 한 번만 <br />
          신청할 수 있습니다.
        </p>

        <div className="border-t border-grey-500"></div>
        <button
          onClick={onClose}
          className="w-full py-20 text-gradient subhead-1-semibold rounded-12 cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ApplyAlertModal;
