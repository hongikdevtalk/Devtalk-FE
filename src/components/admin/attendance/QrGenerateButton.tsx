import { useNavigate } from 'react-router-dom';

interface QrGenerateButtonProps {
  seminarId: number;
}

const QrGenerateButton = ({ seminarId }: QrGenerateButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      style={{ width: 100, height: 20 }}
      className="bg-[#ADE657] text-black text-xs font-semibold rounded"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/admin/seminars/${seminarId}/qr`);
      }}
    >
      QR 생성
    </button>
  );
};

export default QrGenerateButton;
