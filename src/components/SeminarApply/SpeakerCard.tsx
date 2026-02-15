import sampleSpeaker from '../../assets/images/sampleSpeaker.svg';

type SpeakerCardProps = {
  name: string;
  title: string;
  history?: string;
  organization?: string;
  description: string;
  profileUrl?: string;
};

const SpeakerCard = ({ name, title, organization, description, profileUrl }: SpeakerCardProps) => {
  // %~% 텍스트 <span>으로 변환
  const highlightDescription = (text: string) => {
    return text.replace(/%([^%]+)%/g, '<span class="text-gradient">$1</span>');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-[335px] h-[622px] rounded-12 bg-grey-800 gap-5 justify-center">
        <div className="flex flex-col items-center justify-center gap-[18px]">
          <img
            src={profileUrl || sampleSpeaker}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = sampleSpeaker;
            }}
            alt={`${name} 사진`}
            className="rounded-full w-[120px] h-[120px] object-cover"
          />
          <div>
            <div className="flex flex-row gap-1 items-center justify-center">
              <p className="subhead-1-semibold text-grey-200">연사</p>
              <p className="heading-2-semibold text-white">{name}</p>
              <p className="subhead-1-semibold text-grey-200">님</p>
            </div>
            <div
              className="
    body-2-medium text-grey-200 text-center
    overflow-x-auto whitespace-nowrap
    max-w-[260px] px-2
    scrollbar-none
  "
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {organization}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <hr className="text-grey-700 w-[295px]" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="heading-3-semibold text-center text-white w-[267px] break-all">
            {title}
          </div>
          <div
            className="body-2-medium text-grey-200 w-[295px] whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: highlightDescription(description ?? '') }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
