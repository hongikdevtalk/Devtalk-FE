import { useParams } from 'react-router-dom';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';
import { useSeminarQr } from '../../../hooks/Applicants/useSeminarQr';

const QrCode = () => {
  const { seminarId } = useParams<{ seminarId: string }>();
  const { data: seminarNumsData } = useSeminarNums();
  const { data: qrData } = useSeminarQr(Number(seminarId));

  const seminar = seminarNumsData?.result?.find(
    (item) => item.seminarId === Number(seminarId),
  );

  return (
    <div className="mx-60 my-60">
      <h1 className="text-white heading-1-bold mb-12">
        제 {seminar?.seminarNum}회 Devtalk 세미나 QR
      </h1>
      <div className="flex justify-center items-center mt-60">
        {qrData?.result && (
          <img src={qrData.result} alt="QR 코드" style={{ width: 500, height: 500 }} />
        )}
      </div>
    </div>
  );
};

export default QrCode;
