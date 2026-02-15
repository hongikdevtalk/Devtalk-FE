import type {
  SeminarDetailData,
  SpeakerData,
  UpdateSeminarRequest,
} from '../types/SeminarManage/seminarDetail.api';
import type { AddSeminarRequest } from '../types/SeminarManage/seminarAdd.api';
import type { SeminarDetailState, SpeakerState } from '../types/SeminarManage/seminar.state';
import { formatIsoToInput, formatInputToIso, formatDateToIso } from './formatDate';

export const mapApiDataToState = (apiData: SeminarDetailData): SeminarDetailState => {
  return {
    seminarId: apiData.seminarId,
    seminarNum: apiData.seminarNum,
    topic: apiData.topic,
    seminarDate: formatIsoToInput(apiData.seminarDate),
    place: apiData.place,
    liveLink: apiData.liveLink,
    thumbnailUrl: apiData.thumbnail?.fileUrl || null,
    thumbnailFileName: apiData.thumbnail?.fileName || null,
    materials: apiData.materials || [],
    speakers: apiData.speakers.map(
      (apiSpeaker: SpeakerData): SpeakerState => ({
        speakerId: apiSpeaker.speakerId,
        name: apiSpeaker.name,
        organization: apiSpeaker.organization,
        history: apiSpeaker.history,
        sessionTitle: apiSpeaker.sessionTitle,
        sessionContent: apiSpeaker.sessionContent,
        profileUrl: apiSpeaker.profile?.fileUrl || null,
        profileFileName: apiSpeaker.profile?.fileName || null,
      })
    ),
    applicationStartDate:
      apiData.applyStartDate && apiData.applyStartDate.trim() !== ''
        ? new Date(apiData.applyStartDate)
        : null,
    applicationEndDate:
      apiData.applyEndDate && apiData.applyEndDate.trim() !== ''
        ? new Date(apiData.applyEndDate)
        : null,
  };
};

export const mapStateToUpdateRequest = (state: SeminarDetailState): UpdateSeminarRequest => {
  return {
    seminarNum: state.seminarNum ?? 0,
    seminarDate: formatInputToIso(state.seminarDate),
    place: state.place,
    topic: state.topic,
    applyStartDate: formatDateToIso(state.applicationStartDate) || '',
    applyEndDate: formatDateToIso(state.applicationEndDate) || '',
    liveLink: state.liveLink || null, // 빈 문자열이면 null
    speakers: state.speakers
      .filter((speaker) => speaker.speakerId) // speakerId가 있는 것만
      .map((speaker) => ({
        speakerId: speaker.speakerId!,
        name: speaker.name,
        organization: speaker.organization,
        history: speaker.history,
        sessionTitle: speaker.sessionTitle,
        sessionContent: speaker.sessionContent,
      })),
  };
};

export const mapStateToAddRequest = (state: SeminarDetailState): AddSeminarRequest => {
  return {
    seminarNum: state.seminarNum ?? 0,
    seminarDate: formatInputToIso(state.seminarDate),
    place: state.place,
    topic: state.topic,
    applyStartDate: formatDateToIso(state.applicationStartDate) || '',
    applyEndDate: formatDateToIso(state.applicationEndDate) || '',
    liveLink: state.liveLink || null,
    speakers: state.speakers
      .filter((speaker) => {
        return (
          speaker.name.trim() !== '' &&
          speaker.organization.trim() !== '' &&
          speaker.history.trim() !== '' &&
          speaker.sessionTitle.trim() !== '' &&
          speaker.sessionContent.trim() !== ''
        );
      })
      .map((speaker) => ({
        name: speaker.name,
        organization: speaker.organization,
        history: speaker.history,
        sessionTitle: speaker.sessionTitle,
        sessionContent: speaker.sessionContent,
      })),
  };
};
