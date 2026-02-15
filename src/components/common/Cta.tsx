import { useShowSeminar } from '../../contexts/ShowSeminarContext';
import { useGetUserSeminar } from '../../hooks/userMainPage/useSeminar';
import { Button } from '../Button/Button';

type CtaProps = {
  bodyText: string;
  buttonText: string;
  onClick: () => void;
  isActive?: boolean;
};

const Cta = ({ bodyText, buttonText, onClick, isActive }: CtaProps) => {
  const { seminarId } = useShowSeminar();
  const { data: seminar } = useGetUserSeminar(seminarId ?? 1);

  const extractDate = (dateString?: string) => dateString?.split(' ')[0] ?? '';

  return (
    <div
      className={`w-[375px] ${isActive ? 'h-[128px]' : 'h-[152px]'} flex flex-col justify-center items-center gap-16 px-20 pt-20 pb-[24px] button-bg`}
    >
      {isActive ? (
        <div className="body-2-semibold text-grey-100">{bodyText}</div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-[256px] h-[44px] body-2-semibold text-grey-100">
          {bodyText}
          <div className="whitespace-nowrap">
            신청 기간은{' '}
            <span className="text-gradient">
              {`${extractDate(seminar?.result?.startDate)} ~ ${extractDate(seminar?.result?.endDate)}`}
            </span>{' '}
            입니다
          </div>
        </div>
      )}
      <Button variant="home" text={buttonText} onClick={onClick} />
    </div>
  );
};

export default Cta;
