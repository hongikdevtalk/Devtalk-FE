import type { SeminarState, SeminarDetailState } from '../../../types/SeminarManage/seminar.state';

import AdminImageUpload from '../upload/AdminImageUpload';
import SeminarForm from './SeminarDetail/SeminarForm';
import SpeakersForm from './Speaker/SpeakerForm';
import LiveLinkInput from './LiveLink/LiveLinkInput';
import ActiveDateForm from './ActivationDate/ActiveDateForm';
import ReviewLink from './Review/ReviewLink';

interface MainContentProps {
  currentState: SeminarDetailState;
  pendingFiles: SeminarState['pendingFiles'];
  dateFormatError: string | undefined;
  validateActivationDates: { application: string };
  updateSeminarData: (data: Partial<SeminarDetailState>) => void;
  updatePendingFiles: (files: Partial<SeminarState['pendingFiles']>) => void;
  updateSpeakerProfile: (key: number, value: File | null) => void;
}

const MainContent = ({
  currentState,
  pendingFiles,
  dateFormatError,
  validateActivationDates,
  updateSeminarData,
  updatePendingFiles,
  updateSpeakerProfile,
}: MainContentProps) => (
  <main className="max-w-[1060px] min-w-[850px] space-y-10 mb-[65px]">
    <AdminImageUpload
      title="세미나 썸네일 이미지"
      serverFileName={currentState.thumbnailFileName ?? undefined}
      serverFileUrl={currentState.thumbnailUrl ?? undefined}
      serverFileCount={currentState.thumbnailUrl ? 1 : 0}
      pendingFile={pendingFiles.thumbnail ?? undefined}
      onUpload={(files) => updatePendingFiles({ thumbnail: files[0] })}
      onRemove={() => {
        updatePendingFiles({ thumbnail: null });
        updateSeminarData({ thumbnailUrl: null, thumbnailFileName: null });
      }}
    />

    <SeminarForm
      data={currentState}
      pendingFiles={pendingFiles}
      updateSeminarData={updateSeminarData}
      updatePendingFiles={updatePendingFiles}
      errors={{ date: dateFormatError }}
    />

    <SpeakersForm
      speakers={currentState.speakers}
      onChange={(speakers) => updateSeminarData({ speakers })}
      updateSpeakerProfile={updateSpeakerProfile}
    />

    {currentState.seminarId && <ReviewLink seminarId={currentState.seminarId} />}

    <LiveLinkInput
      link={currentState.liveLink}
      onLinkChange={(newLink) => updateSeminarData({ liveLink: newLink })}
    />

    <ActiveDateForm
      applicationStartDate={currentState.applicationStartDate}
      applicationEndDate={currentState.applicationEndDate}
      onChange={(dateType, newDate) => updateSeminarData({ [dateType]: newDate })}
      applicationDateError={validateActivationDates.application}
    />
  </main>
);

export default MainContent;
