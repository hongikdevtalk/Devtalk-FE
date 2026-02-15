import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import errorImg from '/src/assets/images/error.svg';

const UserErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <div className="flex flex-col w-full h-[105px] px-20 ">
        <p className="heading-1-bold text-gradient-light">오류가 발생했어요</p>
        <div className="body-1-medium text-grey-200">
          <p>주소가 잘못 입력되거나</p>
          <p>변경 혹은 삭제되어 페이지를 찾을 수 없어요</p>
        </div>
      </div>
      <img src={errorImg} alt="error image" className="w-[303px] h-[438px] mt-[33px] mb-[21px]" />
      <Button variant="default" text="메인 페이지로 돌아가기" onClick={() => navigate('/')} />
    </div>
  );
};

export default UserErrorPage;
