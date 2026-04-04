import type { CommonResponse } from '../common';

export interface MainCard1 {
  imageUrl: string | null;
  seminarTitle: string | null;
  schedule: string | null;
  place: string | null;
}

export interface MainSpeakerCard {
  imageUrl: string | null;
  seminarTitle: string | null;
  oneLineSummary: string | null;
  speakerName: string | null;
}

export interface MainCards {
  card1: MainCard1;
  card2: MainSpeakerCard;
  card3: MainSpeakerCard;
}

export interface ShowSeminarResult {
  seminarId: number | null;
  seminarNum: number | null;
  applicantActivate: boolean;
  liveActivate: boolean;
  mainPosterImageUrl: string | null;
  mainCards: MainCards | null;
}

export type ShowSeminarResponse = CommonResponse<ShowSeminarResult>;
