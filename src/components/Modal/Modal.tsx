interface ModalProps {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
}

const Modal = ({ open, title, body, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-20">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative flex flex-col items-center gap-[24px] rounded-[10px] bg-white"
        style={{ padding: '40px 30px', width: '350px', height: '250px' }}
      >
        <p className="self-stretch text-black text-[20px] font-medium" style={{ lineHeight: 'normal' }}>
          {title}
        </p>
        <p className="self-stretch text-[#7B7E84] text-[18px] font-normal" style={{ lineHeight: 'normal' }}>
          {body}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-[45px] justify-center items-center gap-[10px] self-stretch rounded-[3px] border border-[#7B7E84] cursor-pointer"
          style={{ padding: '12px 140px', whiteSpace: 'nowrap' }}
        >
          <span className="text-[#7B7E84] text-[18px] font-medium" style={{ lineHeight: 'normal' }}>
            닫기
          </span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
