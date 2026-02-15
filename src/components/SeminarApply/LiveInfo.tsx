const LiveInfo = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-[335px] h-[92px] rounded-8 bg-grey-900 flex items-center justify-center">
        <p className="body-2-medium text-grey-100">
          링크는 행사 전날 개별 안내 드릴 예정이며,
          <br />
          현장 참여 우대를 위해, 온라인 참여자는 Q&A 및 이벤트
          <br />
          대상에서 제외됩니다.
        </p>
      </div>

      <div className="w-[335px] h-[52px] rounded-8 bg-grey-900 flex items-center justify-center">
        <p className="body-2-medium text-grey-100">
          가능한 현장 참여로 생생함과 열기를 함께해주세요 🙌
        </p>
      </div>
    </div>
  );
};

export default LiveInfo;
