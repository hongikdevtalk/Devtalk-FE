import comingSoonGraphic from '../../assets/images/comingSoon.png';

const ComingSoon = () => {
  return (
    <>
      <div className="flex flex-col gap-28">
        <div className="flex flex-col w-[375px] px-20 pt-[50px] text-center gap-[8px]">
          <span className="pretendard text-[40px] font-semibold text-gradient-light">
            Coming Soon
          </span>
          <span className="text-grey-200 body-1-medium">다음 DevTalk 세션을 기대해주세요!</span>
        </div>
        <img src={comingSoonGraphic} alt="Coming Soon" />
      </div>
    </>
  );
};

export default ComingSoon;
