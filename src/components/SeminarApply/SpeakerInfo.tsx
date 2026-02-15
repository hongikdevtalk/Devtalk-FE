import sampleSpeaker from '../../assets/images/sampleSpeaker.svg';

type SpeakerInfoProps = {
  name: string;
  organization?: string;
  history?: string; // \n 포함 가능
  profileUrl?: string;
  roleLabel?: string; // 기본: "연사님"
  className?: string;
};

const SpeakerInfo = ({
  name,
  organization,
  profileUrl,
  roleLabel = '연사님',
  className = '',
}: SpeakerInfoProps) => {
  return (
    <div className={`w-[335px] h-[100px] rounded-8 bg-grey-900 flex px-12 ${className}`}>
      <div className="flex flex-row gap-6 items-center">
        {/* 프로필 이미지 (fallback 포함) */}
        <img
          src={profileUrl || sampleSpeaker}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = sampleSpeaker;
          }}
          alt={`${name} 사진`}
          className="w-[65px] h-[65px] rounded-full object-cover"
        />

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-[5px] overflow-hidden">
          <div className="flex flex-row gap-[9px] items-center">
            <p className="subhead-1-semibold text-white truncate">{name}</p>
            <p className="body-2-medium text-grey-300">{roleLabel}</p>
          </div>
          {organization && (
            <p
              className="body-2-medium text-grey-200 overflow-x-auto whitespace-nowrap max-w-[200px] pr-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {organization}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerInfo;
