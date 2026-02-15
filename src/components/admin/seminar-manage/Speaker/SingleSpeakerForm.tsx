import '../../../../styles/formInput.css';
import deleteIcon from '../../../../assets/icons/common/delete.svg';
import type { SpeakerState as Speaker } from '../../../../types/SeminarManage/seminar.state';

interface SingleSpeakerFormProps {
  partNumber: number;
  speakerData: Speaker;
  onChange: (field: keyof Speaker, value: string | File | null) => void;
}

const SingleSpeakerForm = ({ partNumber, speakerData, onChange }: SingleSpeakerFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name as keyof Speaker, e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange('profileUrl', file as unknown as any);
    }
  };

  const handleFileRemove = () => {
    onChange('profileUrl', null);
  };

  return (
    <div className="flex gap-5">
      <h3 className="heading-3-semibold text-white mb-6">{partNumber}부</h3>
      <div className="flex-1 space-y-6 p-5 bg-grey-800 rounded-10">
        {/* 프로필 사진 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label className="subhead-1-medium text-center">프로필 사진</label>
          <div className="flex items-center space-x-4 h-[35px]">
            <input
              type="file"
              accept="image/*"
              id={`profileUrl-${partNumber}`}
              onChange={handleFileChange}
              className="hidden"
            />
            {speakerData.profileUrl ? (
              <div className="flex items-center justify-between w-full">
                <span className="body-1-semibold text-grey-300">
                  {(speakerData as any).profileUrl?.name ||
                    speakerData.profileFileName ||
                    '첨부된 이미지'}
                </span>
                <button type="button" onClick={handleFileRemove} className="cursor-pointer">
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor={`profileUrl-${partNumber}`}
                  className="cursor-pointer body-1-semibold w-[80px] h-full px-4 py-2 mr-5 bg-green-300 text-black rounded-8 hover:opacity-80 flex items-center justify-center"
                >
                  파일 선택
                </label>
                <span className="body-2-semibold text-grey-300">선택된 파일 없음</span>
              </>
            )}
          </div>
        </div>

        {/* 이름 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label htmlFor={`name-${partNumber}`} className="subhead-1-medium text-center">
            이름
          </label>
          <input
            id={`name-${partNumber}`}
            name="name"
            value={speakerData.name}
            onChange={handleInputChange}
            type="text"
            placeholder="이름을 입력해주세요."
            className="form-input-base form-input-text"
          />
        </div>

        {/* 소속 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label htmlFor={`organization-${partNumber}`} className="subhead-1-medium text-center">
            소속
          </label>
          <textarea
            id={`organization-${partNumber}`}
            name="organization"
            value={speakerData.organization}
            onChange={handleInputChange}
            rows={4}
            placeholder="소속을 입력해주세요."
            className="form-input-base form-input-textarea"
          />
        </div>

        {/* 이력 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label htmlFor={`history-${partNumber}`} className="subhead-1-medium text-center">
            이력
          </label>
          <textarea
            id={`history-${partNumber}`}
            name="history"
            value={speakerData.history}
            onChange={handleInputChange}
            rows={4}
            placeholder="이력을 입력해주세요."
            className="form-input-base form-input-textarea"
          />
        </div>

        {/* 강연 제목 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label htmlFor={`title-${partNumber}`} className="subhead-1-medium text-center">
            강연 제목
          </label>
          <textarea
            id={`sessionTitle-${partNumber}`}
            name="sessionTitle"
            value={speakerData.sessionTitle}
            onChange={handleInputChange}
            rows={4}
            placeholder="강연 제목을 입력해주세요."
            className="form-input-base form-input-textarea"
          />
        </div>

        {/* 강연 내용 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label htmlFor={`description-${partNumber}`} className="subhead-1-medium text-center">
            강연 내용
          </label>
          <textarea
            id={`sessionContent-${partNumber}`}
            name="sessionContent"
            value={speakerData.sessionContent}
            onChange={handleInputChange}
            rows={10}
            placeholder={`강연 내용을 입력해주세요. 강조하고 싶은 텍스트 앞뒤에 %를 입력하면 강조처리 됩니다.\n(예: %LLM은 어쩌다 이렇게 똑똑해졌을까요?%)`}
            className="form-input-base form-input-textarea"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleSpeakerForm;
