import { useParams } from 'react-router-dom';
import SeminarDetailSpeakerCard from '../../../components/Seminar/SeminarDetailSpeakerCard';

const SpeakerDetail = () => {
  const { id, num, index } = useParams();

  return (
    <SeminarDetailSpeakerCard
      seminarId={Number(id)}
      seminarNum={Number(num)}
      index={Number(index)}
    />
  );
};

export default SpeakerDetail;
