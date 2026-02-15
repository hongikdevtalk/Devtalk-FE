import { useEffect, useState } from 'react';
import { getSeminarList } from '../../../apis/seminarList';
import ToggleField from '../../../components/admin/home/ToggleField';
import { postShowSeminar } from '../../../apis/HomeManage/showSeminarApi';
import { getShowSeminar } from '../../../apis/ShowSeminar/userShowSeminar';
import { useQuery } from '@tanstack/react-query';
import SeminarNumDropdown from '../../../components/admin/home/SeminarNumDropdown';

const HomeExposure = () => {
  const { data } = useQuery({
    queryKey: ['showSeminar'],
    queryFn: getShowSeminar,
    staleTime: 0,
  });

  const [seminarList, setSeminarList] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [applyActive, setApplyActive] = useState<boolean>(false);
  const [liveActive, setLiveActive] = useState<boolean>(false);

  //세미나 번호들을 불러옴
  useEffect(() => {
    const loadSeminarNums = async () => {
      const listData = await getSeminarList();
      const seminarNums = listData.result?.seminarList.map((s) => Number(s.seminarNum)) ?? [];
      setSeminarList(seminarNums);
    };

    loadSeminarNums();
  }, []);

  //현재 홈화면에 노출되는 회차와 신청, 라이브 활성화 정보
  useEffect(() => {
    if (data?.result) {
      setSelected(data.result.seminarNum ?? null);
      setApplyActive(data.result.applicantActivate ?? false);
      setLiveActive(data.result.liveActivate ?? false);
    }
  }, [data]);

  //노출 회차 선택
  const handleChangeSeminar = async (value: number | null) => {
    setSelected(value);
    await postShowSeminar({
      seminarNum: value,
      applicantActivate: applyActive,
      liveActivate: liveActive,
    });
  };

  //신청 활성화 선택
  const handleToggleApply = async () => {
    const newState = !applyActive;
    setApplyActive(newState);
    await postShowSeminar({
      seminarNum: selected,
      applicantActivate: newState,
      liveActivate: liveActive,
    });
  };

  //Live 활성화 선택
  const handleToggleLive = async () => {
    const newState = !liveActive;
    setLiveActive(newState);
    await postShowSeminar({
      seminarNum: selected,
      applicantActivate: applyActive,
      liveActivate: newState,
    });
  };

  return (
    <div className="space-y-40 mx-60 mb-[175px]">
      <h1 className="mt-60 heading-1-bold text-white">홈화면 노출 회차</h1>
      <div className="w-full min-w-[650px] h-[172px] mx-auto bg-grey-900 p-6 rounded-10 space-y-24">
        <h2 className="heading-2-bold text-white mb-24">노출 회차 선택</h2>
        <SeminarNumDropdown
          options={seminarList}
          selected={selected}
          onChange={handleChangeSeminar}
        />
      </div>
      <ToggleField fieldName="신청 활성화" isEnabled={applyActive} onToggle={handleToggleApply} />
      <ToggleField fieldName="Live 활성화" isEnabled={liveActive} onToggle={handleToggleLive} />
    </div>
  );
};

export default HomeExposure;
