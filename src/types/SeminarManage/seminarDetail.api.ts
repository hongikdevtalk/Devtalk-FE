import type { CommonResponse } from '../common';
import type { FileData } from './seminarFile.api';

export interface SpeakerData {
  speakerId?: number;
  name: string;
  organization: string;
  history: string;
  sessionTitle: string;
  sessionContent: string;
  profile: FileData | null;
  partTag: string;
  oneLineSummary: string;
}

export interface SeminarDetailData {
  seminarId: number;
  seminarNum: number | null;
  topic: string;
  subtitle: string;
  description: string;
  seminarDate: string;
  place: string;
  activeStartDate: string;
  activeEndDate: string;
  applyStartDate: string;
  applyEndDate: string;
  liveLink: string;
  thumbnail: FileData | null;
  materials: FileData[];
  speakers: SpeakerData[];
  seminarTags: string[];
}

export type SeminarDetailResponse = CommonResponse<SeminarDetailData>;

// 세미나 정보 수정 요청 타입
export interface UpdateSeminarRequest {
  seminarNum: number;
  seminarDate: string;
  place: string;
  topic: string;
  subtitle: string | null;
  description: string | null;
  seminarTags: string[];
  applyStartDate: string;
  applyEndDate: string;
  liveLink: string | null; // 삭제 시 null
  speakers: Array<{
    speakerId: number;
    name: string;
    organization: string;
    history: string;
    sessionTitle: string;
    sessionContent: string;
    partTag: string;
    oneLineSummary: string;
    speakerTags: string[];
  }>;
}

// 세미나 파일 수정 요청 타입
export interface UpdateSeminarFilesRequest {
  deleteMaterialUrls: string[];
  speakerIds: number[];
  thumbnailFile?: File;
  materials?: File[];
  speakerProfiles?: File[];
}
