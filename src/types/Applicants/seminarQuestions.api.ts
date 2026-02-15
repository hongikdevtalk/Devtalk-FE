import type { CommonResponse } from '../common';

export interface Speaker {
  speakerId: number;
  speakerName: string;
}

export interface Question {
  speakerId: number;
  content: string;
}

export interface Student {
  studentId: number;
  studentNum: string;
  studentName: string;
  phoneNum: string;
  questions: Question[];
}

export interface SeminarQuestionsResult {
  seminarNum: number;
  speakers: Speaker[];
  students: Student[];
}

export type SeminarQuestionsResponse = CommonResponse<SeminarQuestionsResult>;
