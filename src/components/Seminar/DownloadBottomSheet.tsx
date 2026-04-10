import pptdownload from '../../assets/icons/common/pptdownload.svg';
import linkdownload from '../../assets/icons/common/linkdownload.svg';

type DownloadBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  onVideoClick: () => void;
};

const DownloadBottomSheet = ({ open, onClose, onDownload, onVideoClick }: DownloadBottomSheetProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center w-full max-w-[440px] bg-white"
        style={{
          padding: '16px 30px 56px 30px',
          gap: '30px',
          borderRadius: '20px 20px 0 0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 발표자료 다운로드 */}
        <button
          type="button"
          className="mt-40 flex flex-row items-center gap-16 w-full cursor-pointer"
          onClick={onDownload}
        >
          <img src={pptdownload} alt="발표자료" />
          <span className="heading-2-5-medium text-black">발표자료 다운로드</span>
        </button>

        {/* 세미나 영상 보러가기 */}
        <button
          type="button"
          className="flex flex-row items-center gap-16 w-full cursor-pointer"
          onClick={onVideoClick}
        >
          <img src={linkdownload} alt="세미나 영상" />
          <span className="heading-2-5-medium text-black">세미나 영상 보러가기</span>
        </button>
      </div>
    </div>
  );
};

export default DownloadBottomSheet;
