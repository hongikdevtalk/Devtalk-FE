import { useNavigate } from 'react-router-dom';
import devlogo2 from '../../assets/logos/devlogo2.svg';
import error2 from '../../assets/images/error2.svg';

const UserErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-[10px] pl-[20px]">
        <img src={devlogo2} alt="devlogo2" className="w-[119.06px] h-[24px]" />
      </div>

      <div className="flex flex-col items-center mt-[60px]">
        <p className="text-center text-black text-[26px] font-medium leading-normal">
          페이지를 찾을 수 없습니다
        </p>
        <p className="text-center text-black text-[20px] font-normal leading-normal">
          입력하신 주소를 다시 한 번 확인해주세요
        </p>
        <img
          src={error2}
          alt="error"
          className="mt-[30px]"
          style={{ width: '440px', height: '570px', flexShrink: 0 }}
        />
      </div>

      <div className="flex-1" />

      <div className="px-[20px] pb-[20px]">
        <button
          onClick={() => navigate('/')}
          className="flex h-[56px] justify-center items-center w-full rounded-[10px] text-white text-[20px] font-semibold leading-normal cursor-pointer"
          style={{
            background:
              'radial-gradient(557.08% 171.17% at 74.62% 100%, #BDF548 0%, #4EABB5 100%)',
          }}
        >
          메인페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default UserErrorPage;
