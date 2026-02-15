import SingleSpeakerForm from './SingleSpeakerForm';
import type { SpeakerState } from '../../../../types/SeminarManage/seminar.state';

interface SpeakerFormProps {
  speakers: SpeakerState[];
  onChange: (updatedSpeakers: SpeakerState[]) => void;
  updateSpeakerProfile: (key: number, value: File | null) => void;
}

const SpeakerForm = ({ speakers, onChange, updateSpeakerProfile }: SpeakerFormProps) => {
  const handleSpeakerChange = (
    index: number,
    field: keyof SpeakerState,
    value: string | File | null
  ) => {
    const updatedSpeakers = speakers.map((speaker, i) =>
      i === index ? { ...speaker, [field]: value } : speaker
    );
    onChange(updatedSpeakers);

    if (field === 'profileUrl') {
      const key = speakers[index].speakerId ?? index;
      updateSpeakerProfile(key, value instanceof File ? value : null);
    }
  };

  return (
    <div className="bg-grey-900 p-6 rounded-10">
      <h2 className="heading-2-bold text-white mb-6">연사진 정보</h2>
      <div className="space-y-[64px]">
        {speakers.map((speaker, index) => (
          <SingleSpeakerForm
            key={index}
            partNumber={index + 1}
            speakerData={speaker}
            onChange={(field, value) => handleSpeakerChange(index, field, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakerForm;
