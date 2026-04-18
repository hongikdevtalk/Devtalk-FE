import type { FileData } from './seminarFile.api';
import type { PendingFiles } from './seminarFile.api';

export interface SpeakerState {
  speakerId?: number;
  name: string;
  organization: string;
  history: string;
  sessionTitle: string;
  sessionContent: string;
  partTag: string;
  oneLineSummary: string;
  profile: {
    fileName?: string | null;
    fileExtension?: string;
    fileSize?: number;
    fileUrl: string | null;
  } | null;
}

export interface SeminarDetailState {
  seminarId?: number;
  seminarNum: number | null;
  topic: string;
  subtitle: string;
  description: string;
  seminarDate: string;
  place: string;
  applyStartDate: string | null;
  applyEndDate: string | null;
  liveLink: string;
  thumbnail: {
    fileUrl: string | null;
    fileName?: string | null;
    fileExtension?: string;
    fileSize?: number;
  } | null;
  materials: FileData[];
  speakers: SpeakerState[];
  seminarTags: string[];
}

export interface FormErrors {
  date?: string;
  thumbnail?: string;
  speakers?: Map<number, string>;
  general?: string;
}

export interface SeminarState {
  initialState: SeminarDetailState | null; // 원본 데이터
  currentState: SeminarDetailState | null; // 현재 데이터
  isLoading: boolean;
  error: string | null;
  isDirty: boolean; // 수정 여부
  validationErrors: FormErrors;
  validateActivationDates: {
    seminar: string;
    application: string;
  };

  // 사용자가 업로드/삭제하여 변경된 파일
  pendingFiles: PendingFiles;
}
