import { useQuery } from '@tanstack/react-query';
import { getSeminarDetail } from '../../apis/seminarDetail';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { Chip } from '../Chip/Chip';
import download from '../../assets/icons/common/download.svg';

const SeminarDetailCard = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['seminarDetail', id],
    queryFn: () => getSeminarDetail(id),
    enabled: Number.isFinite(id),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  if (isLoading || !data?.result) {
    return <LoadingSpinner />;
  }

  const { seminarNum, topic, thumbnailUrl, seminarDate, place, fileUrls } = data?.result || {};
  const formDate = formatDate(seminarDate ?? '');

  const handleDownloadFiles = async () => {
    if (!fileUrls || fileUrls.length === 0) {
      alert('다운로드할 파일이 없습니다.');
      return;
    }

    try {
      for (const url of fileUrls) {
        const res = await axios.get(url, {
          responseType: 'blob',
        });

        const filename = `devtalik_${seminarNum}회차`;
        const blobUrl = URL.createObjectURL(res.data);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (e) {
      alert('파일 다운로드 중 오류가 발생했습니다.');
    }
  };

  return data ? (
    <div className="w-full gap-[20px] flex flex-col transition-all duration-500 ease-out">
      <div className="relative h-[266px] w-full shrink-0">
        <img src={thumbnailUrl} alt="seminar" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 39.42%)' }}
        />
      </div>
      <div className="w-full flex flex-col gap-[30px] px-[20px]">
        <div className="flex flex-col gap-16">
          <div className="flex flex-row items-center justify-between w-full">
            <Chip text={`${seminarNum}회차`} />
            <button type="button" onClick={handleDownloadFiles} className="cursor-pointer">
              <img src={download} alt="발표자료 다운로드" />
            </button>
          </div>
          <div className="heading-2-5-medium text-black">{topic}</div>
        </div>
        <div className="h-[54px] flex flex-col gap-8">
          <div className="flex flex-row gap-28">
            <div className="subhead-1-medium text-black">일정</div>
            <div className="subhead-light text-black">{formDate}</div>
          </div>
          <div className="flex flex-row gap-28">
            <div className="subhead-1-medium text-black">장소</div>
            <div className="subhead-light text-black">{place}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SeminarDetailCard;
