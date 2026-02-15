import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devlogo from '../../../assets/logos/devlogo.svg';
import { postAdminLogin } from '../../../apis/authApi';
import { STORAGE_KEY } from '../../../constants/key';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await postAdminLogin({
        loginId: id,
        password: pw,
      });
      if (res.isSuccess && res.result) {
        localStorage.setItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN, res.result.accessToken);
        localStorage.setItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN, res.result.refreshToken);
        setError(false);
        navigate('/admin/home/exposure');
      }
    } catch (err) {
      setError(true);
    }
  };

  const isDisabled = id.trim() === '' || pw.trim() === '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-60">
      {/* 로고 + 타이틀 */}
      <div className="flex items-center gap-x-8 mb-12 ">
        <img src={devlogo} alt="devlogo" className="w-[100px] h-[41.1px]" />
        <h1 className="heading-1-bold">Devtalk Admin</h1>
      </div>

      {/* 설명문 */}
      <p className="body-1-medium text-grey-300 mb-[70px]">
        관리자 아이디와 비밀번호를 입력해주세요.
      </p>

      {/* 입력폼 */}
      <div className="flex flex-col gap-y-12 w-[442px]">
        <input
          className="bg-grey-600 w-full h-[55px] p-12 rounded-8 body-2-medium"
          type="text"
          placeholder="아이디를 입력하세요."
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (error) setError(false);
          }}
        />
        <input
          className="bg-grey-600 w-full h-[55px] p-12 rounded-8 body-2-medium"
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            if (error) setError(false);
          }}
        />
        {error && (
          <p className="text-status-error text-sm">등록되지 않은 아이디 또는 비밀번호입니다.</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="w-[442px] mt-60 flex items-center justify-center">
        <button
          onClick={handleLogin}
          disabled={isDisabled}
          className={`w-full h-[50px] rounded-8 cursor-pointer body-1-medium
            ${isDisabled ? 'bg-grey-900 text-grey-300 cursor-not-allowed' : 'bg-green-300 text-black'}`}
        >
          관리자 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
