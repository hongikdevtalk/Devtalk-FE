type ModalVariant = 'deleteSeminar' | 'deleteReview' | 'cancel';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: ModalVariant;
}

const MODAL_CONTENT = {
  deleteSeminar: {
    message: '해당 세미나를 정말 삭제하시겠습니까?',
    warningMessage: '삭제 시 해당 세미나의 모든 정보는 삭제되며,\n복구할 수 없습니다.',
    confirmText: '세미나 삭제하기',
  },
  deleteReview: {
    message: '해당 후기를 정말 삭제하시겠습니까?',
    warningMessage: '삭제 시 해당 후기의 모든 정보는 삭제되며,\n복구할 수 없습니다.',
    confirmText: '후기 삭제하기',
  },
  cancel: {
    message: '변경사항이 있습니다.\n정말 취소하시겠습니까?',
    warningMessage: '취소 시 변경된 모든 내용은 저장되지 않습니다.',
    confirmText: '취소하기',
  },
} as const;

const AdminModal = ({ isOpen, onClose, onConfirm, variant }: ConfirmModalProps) => {
  if (!isOpen) return null;

  const content = MODAL_CONTENT[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-grey-700 rounded-8 w-full max-w-[400px] min-h-[200px] mx-4 p-[32px] flex flex-col justify-between">
        {/* 모달 내용 */}
        <div className="mb-[20px] text-center">
          <p className="heading-3-semibold text-white mb-[15px] whitespace-pre-line">
            {content.message}
          </p>
          <p className="body-2-medium text-status-error whitespace-pre-line">
            {content.warningMessage}
          </p>
        </div>

        {/* 버튼 */}
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={onClose}
            className="subhead-1-semibold py-3 px-5 bg-grey-800 text-white rounded-8 hover:bg-grey-600 transition-colors cursor-pointer"
          >
            {variant === 'cancel' ? '돌아가기' : '취소하기'}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="subhead-1-semibold py-3 px-5 bg-status-error/15 rounded-8 transition-colors text-status-error cursor-pointer hover:text-white hover:bg-status-error/40"
          >
            {content.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
