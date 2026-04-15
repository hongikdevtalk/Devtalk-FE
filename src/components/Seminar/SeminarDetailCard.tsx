import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSeminarDetail, getSeminarVideo } from '../../apis/seminarDetail';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { Chip } from '../Chip/Chip';
import download from '../../assets/icons/common/download.svg';
import DownloadBottomSheet from './DownloadBottomSheet';
import ReviewModal from '../Modal/ReviewAlertModal';

const CONTENT_NOT_READY = '컨텐츠를 준비하고 있습니다.\n다음에 다시 시도해주세요.';

const SeminarDetailCard = ({ id, showDownload = true, showThumbnail = true }: { id: number; showDownload?: boolean; showThumbnail?: boolean }) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['seminarDetail', id],
    queryFn: () => getSeminarDetail(id),
    enabled: Number.isFinite(id),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const { data: videoData } = useQuery({
    queryKey: ['seminarVideo', id],
    queryFn: () => getSeminarVideo(id),
    enabled: Number.isFinite(id),
  });

  if (isLoading || !data?.result) {
    return <LoadingSpinner />;
  }

  const { seminarNum, topic, thumbnailUrl, seminarDate, place, fileUrls } = data?.result || {};
  const formDate = formatDate(seminarDate ?? '');
  const videoUrl = videoData?.result?.seminarVideoUrl;

  const handleDownloadFiles = async () => {
    if (!fileUrls || fileUrls.length === 0) {
      setBottomSheetOpen(false);
      setModalOpen(true);
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
    } catch {
      setModalOpen(true);
    } finally {
      setBottomSheetOpen(false);
    }
  };

  const handleVideoClick = () => {
    setBottomSheetOpen(false);
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    } else {
      setModalOpen(true);
    }
  };

  return data ? (
    <>
      <div className="w-full gap-[20px] flex flex-col transition-all duration-500 ease-out">
        {showThumbnail && (
          <div className="relative h-[266px] w-full shrink-0">
            <img src={thumbnailUrl} alt="seminar" className="h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 39.42%)' }}
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-[30px] px-[20px]">
          <div className="flex flex-col gap-16">
            <div className="flex flex-row items-center justify-between w-full">
              <Chip text={`${seminarNum}회차`} />
              {showDownload && (
                <button type="button" onClick={() => setBottomSheetOpen(true)} className="cursor-pointer">
                  <img src={download} alt="발표자료 다운로드" />
                </button>
              )}
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

      <DownloadBottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        onDownload={handleDownloadFiles}
        onVideoClick={handleVideoClick}
      />

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={CONTENT_NOT_READY}
      />
    </>
  ) : null;
};

export default SeminarDetailCard;
