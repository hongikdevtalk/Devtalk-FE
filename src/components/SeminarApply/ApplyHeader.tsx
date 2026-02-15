import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/icons/components/SeminarApply/arrow.svg';

type ApplyHeaderProps = {
  backTo: string;
};

const ApplyHeader = ({ backTo }: ApplyHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center w-full h-14 bg-black px-20">
      <div className="flex items-center justify-between w-50 h-7">
        <img
          src={arrow}
          alt="arrow"
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate(backTo)}
        />
        <div className="subhead-2-medium text-white">신청하기</div>
      </div>
    </header>
  );
};

export default ApplyHeader;
