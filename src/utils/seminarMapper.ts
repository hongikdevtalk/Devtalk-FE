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
    subtitle: apiData.subtitle ?? '',
    description: apiData.description ?? '',
    seminarDate: formatIsoToInput(apiData.seminarDate),
    place: apiData.place,
    liveLink: apiData.liveLink,
    thumbnail: apiData.thumbnail
      ? {
          fileUrl: apiData.thumbnail.fileUrl,
          fileName: apiData.thumbnail.fileName,
          fileExtension: apiData.thumbnail.fileExtension,
          fileSize: apiData.thumbnail.fileSize,
        }
      : null,
    materials: apiData.materials || [],
    speakers: apiData.speakers.map(
      (apiSpeaker: SpeakerData): SpeakerState => ({
        speakerId: apiSpeaker.speakerId,
        name: apiSpeaker.name,
        organization: apiSpeaker.organization,
        history: apiSpeaker.history,
        sessionTitle: apiSpeaker.sessionTitle,
        sessionContent: apiSpeaker.sessionContent,
        partTag: apiSpeaker.partTag,
        oneLineSummary: apiSpeaker.oneLineSummary,
        profile: apiSpeaker.profile
          ? {
              fileUrl: apiSpeaker.profile.fileUrl,
              fileName: apiSpeaker.profile.fileName,
              fileExtension: apiSpeaker.profile.fileExtension,
              fileSize: apiSpeaker.profile.fileSize,
            }
          : null,
      })
    ),
    applyStartDate: apiData.applyStartDate,
    applyEndDate: apiData.applyEndDate,
    seminarTags: apiData.seminarTags,
  };
};

export const mapStateToUpdateRequest = (state: SeminarDetailState): UpdateSeminarRequest => {
  return {
    seminarNum: state.seminarNum ?? 0,
    seminarDate: formatInputToIso(state.seminarDate),
    place: state.place,
    topic: state.topic,
    subtitle: state.subtitle ?? null,
    description: state.description ?? null,
    applyStartDate:
      (state.applyStartDate ? formatDateToIso(new Date(state.applyStartDate)) : '') ?? '',
    applyEndDate: (state.applyEndDate ? formatDateToIso(new Date(state.applyEndDate)) : '') ?? '',
    liveLink: state.liveLink || null,
    seminarTags: state.seminarTags,
    speakers: state.speakers
      .filter((speaker) => speaker.speakerId)
      .map((speaker) => ({
        speakerId: speaker.speakerId!,
        name: speaker.name,
        organization: speaker.organization,
        history: speaker.history,
        sessionTitle: speaker.sessionTitle,
        sessionContent: speaker.sessionContent,
        partTag: speaker.partTag || '',
        oneLineSummary: speaker.oneLineSummary,
        speakerTags:
          typeof speaker.partTag === 'string'
            ? speaker.partTag
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
            : [],
        profile: speaker.profile
          ? {
              fileUrl: speaker.profile.fileUrl,
              fileName: speaker.profile.fileName,
              fileExtension: speaker.profile.fileExtension,
              fileSize: speaker.profile.fileSize,
            }
          : null,
      })),
  };
};

export const mapStateToAddRequest = (state: SeminarDetailState): AddSeminarRequest => {
  return {
    seminarNum: state.seminarNum ?? 0,
    seminarDate: formatInputToIso(state.seminarDate),
    place: state.place,
    topic: state.topic,
    subtitle: state.subtitle ?? '',
    description: state.description ?? '',
    seminarTags: state.seminarTags || [],
    applyStartDate:
      (state.applyStartDate ? formatDateToIso(new Date(state.applyStartDate)) : '') ?? '',
    applyEndDate: (state.applyEndDate ? formatDateToIso(new Date(state.applyEndDate)) : '') ?? '',
    liveLink: state.liveLink || null,
    speakers: state.speakers
      .filter((speaker) => speaker.name.trim() !== '')
      .map((speaker) => ({
        name: speaker.name,
        organization: speaker.organization,
        history: speaker.history,
        sessionTitle: speaker.sessionTitle,
        sessionContent: speaker.sessionContent,
        partTag: speaker.partTag ?? '',
        oneLineSummary: speaker.oneLineSummary ?? '',
        speakerTags:
          typeof speaker.partTag === 'string'
            ? speaker.partTag
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '')
            : [],
      })),
  };
};
