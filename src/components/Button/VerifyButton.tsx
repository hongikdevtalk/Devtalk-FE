const VerifyButton = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isActive}
      className="flex w-[125px] shrink-0 justify-center items-center gap-[10px] rounded-[10px] cursor-pointer"
      style={{
        padding: '16px 45px',
        background: isActive
          ? 'radial-gradient(557.08% 171.17% at 74.62% 100%, #ADE657 0%, #4CBCA5 100%)'
          : '#E8EAEF',
      }}
    >
      <span
        className="text-[20px] font-medium"
        style={{ color: isActive ? '#FFFFFF' : '#7B7E84', lineHeight: 'normal' }}
      >
        확인
      </span>
    </button>
  );
};

export default VerifyButton;
