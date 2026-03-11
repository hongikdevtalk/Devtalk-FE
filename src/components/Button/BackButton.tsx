import { useNavigate } from 'react-router-dom';
import chevronleft from '../../assets/icons/common/chevronleft.svg';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`text-white hover:opacity-70 transition-opacity ${className} cursor-pointer`}
      aria-label="뒤로가기"
    >
      <img src={chevronleft} alt="뒤로가기" className="w-7 h-7" />
    </button>
  );
};

export default BackButton;
