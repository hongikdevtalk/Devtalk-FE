import { useQuery } from '@tanstack/react-query';
import { getSeminarDetail } from '../../apis/seminarDetail';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';

const SeminarDetailCard = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['seminarDetail', id],
    queryFn: () => getSeminarDetail(id),
    enabled: Number.isFinite(id),
  });

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
    <div className="w-[375px] gap-20 p-20 flex flex-col transition-all duration-500 ease-out">
      {isLoading && <LoadingSpinner />}
      <div className="w-[335px] gap-[31px] flex flex-col">
        <div className="flex flex-col gap-8 justify-between">
          <div className="subhead-2-medium text-grey-100">{seminarNum}회차</div>
          <div className="heading-2-bold text-gradient">{topic}</div>
        </div>
        <img src={thumbnailUrl} alt="seminar" className="h-[220px] rounded-8 object-cover " />
        <div className="h-[54px] flex flex-col gap-8 body-1-medium">
          <div className="flex flex-row gap-28">
            <div className="text-grey-300">일정</div>
            <div className="text-grey-400">{formDate}</div>
          </div>
          <div className="flex flex-row gap-28">
            <div className="text-grey-300">장소</div>
            <div className="text-grey-400">{place}</div>
          </div>
        </div>
      </div>
      <div
        className="w-[102px] h-[25px] gap-10 px-8 py-4 rounded-4 bg-grey-900 cursor-pointer text-center flex items-center"
        onClick={() => handleDownloadFiles()}
      >
        <span className="text-gradient caption-semibold ">발표자료 다운로드</span>
      </div>
    </div>
  ) : null;
};

export default SeminarDetailCard;
