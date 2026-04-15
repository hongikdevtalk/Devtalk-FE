type CtaProps = {
  bodyText?: string;
  buttonText: string;
  onClick: () => void;
};

const Cta = ({ bodyText, buttonText, onClick }: CtaProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-16 px-20 pt-20 pb-[24px]">
      {bodyText && <div className="body-2-semibold text-grey-100">{bodyText}</div>}
      <button
        onClick={onClick}
        className="flex h-[56px] px-24 justify-center items-center gap-[10px] self-stretch rounded-[10px] text-white text-[20px] font-semibold leading-normal cursor-pointer"
        style={{ background: 'radial-gradient(557.08% 171.17% at 74.62% 100%, #BDF548 0%, #4EABB5 100%)' }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Cta;
