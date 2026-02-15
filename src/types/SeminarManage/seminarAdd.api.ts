// 세미나 추가 요청 타입
export interface AddSeminarRequest {
  seminarNum: number;
  seminarDate: string;
  place: string;
  topic: string;
  applyStartDate: string;
  applyEndDate: string;
  liveLink: string | null;
  speakers: Array<{
    name: string;
    organization: string;
    history: string;
    sessionTitle: string;
    sessionContent: string;
  }>;
}
