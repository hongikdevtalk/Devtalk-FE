import { useNavigate } from "react-router-dom";

export const ButtonExSeminar = () => {
  const navigate = useNavigate();

  return (
    <button className="w-[156px] h-[40px] rounded-80 body-2-semibold text-white bg-grey-900/70 cursor-pointer"
    onClick = {() => navigate('/seminar')}>
      이전 세미나 알아보기
    </button>
  );
};
