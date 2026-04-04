import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';

const QrCode = () => {
  const { seminarId } = useParams<{ seminarId: string }>();
  const { data: seminarNumsData } = useSeminarNums();

  const seminar = seminarNumsData?.result?.find(
    (item) => item.seminarId === Number(seminarId),
  );

  const verificationUrl = `${window.location.origin}/seminar/live/verification`;

  return (
    <div className="mx-60 my-60">
      <h1 className="text-white heading-1-bold mb-12">
        제 {seminar?.seminarNum}회 Devtalk 세미나 QR
      </h1>
      <div className="flex justify-center items-center mt-60">
        <QRCodeSVG value={verificationUrl} size={500} />
      </div>
    </div>
  );
};

export default QrCode;
