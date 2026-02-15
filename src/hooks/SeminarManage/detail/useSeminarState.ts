import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSeminarData } from '../data/useSeminarData';
import { useSeminarValidation } from './useSeminarValidation';
import type {
  SeminarState,
  SeminarDetailState,
  SpeakerState,
} from '../../../types/SeminarManage/seminar.state';

const blankSpeakerState: SpeakerState = {
  name: '',
  organization: '',
  history: '',
  sessionTitle: '',
  sessionContent: '',
  profileUrl: null,
  profileFileName: null,
};

const blankData: SeminarDetailState = {
  seminarNum: null,
  seminarDate: '',
  place: '',
  topic: '',
  liveLink: '',
  thumbnailUrl: null,
  thumbnailFileName: null,
  materials: [],
  speakers: [blankSpeakerState, blankSpeakerState],
  applicationStartDate: null,
  applicationEndDate: null,
};

export const useSeminarState = (id: string | undefined) => {
  const seminarId = id ? Number(id) : undefined;

  // 데이터 페칭
  const { seminarData, isLoading, error } = useSeminarData(seminarId);

  // 로컬 상태
  const [initialState, setInitialStateValue] = useState<SeminarDetailState | null>(null);
  const [currentState, setCurrentState] = useState<SeminarDetailState | null>(null);
  const [pendingFiles, setPendingFiles] = useState<SeminarState['pendingFiles']>({
    thumbnail: null,
    deletedMaterialUrls: [],
    materials: [],
    speakerProfiles: new Map(),
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (!id) {
      setInitialStateValue(blankData);
      setCurrentState(blankData);
      return;
    }

    if (seminarData) {
      // 2부의 연사진 정보가 없으면 빈 데이터로
      const normalizedDate = {
        ...seminarData,
        speakers: [seminarData.speakers[0], seminarData.speakers[1] || { ...blankSpeakerState }],
      };

      setInitialStateValue(normalizedDate);
      setCurrentState(normalizedDate);

      setPendingFiles({
        thumbnail: null,
        deletedMaterialUrls: [],
        materials: [],
        speakerProfiles: new Map(),
      });
    }
  }, [id, seminarData]);

  // isDirty 상태
  const isDirty = useMemo(() => {
    if (!initialState || !currentState) return false;

    const filesChanged =
      pendingFiles.thumbnail !== null ||
      pendingFiles.materials.length > 0 ||
      pendingFiles.speakerProfiles.size > 0 ||
      pendingFiles.deletedMaterialUrls.length > 0;

    const dataChanged = JSON.stringify(initialState) !== JSON.stringify(currentState);

    return dataChanged || filesChanged;
  }, [initialState, currentState, pendingFiles]);

  // 유효성 검사
  const validation = useSeminarValidation(currentState, pendingFiles, seminarId ? 'edit' : 'add');

  // 상태 업데이트 함수
  const updateSeminarData = useCallback((updatedData: Partial<SeminarDetailState>) => {
    setCurrentState((prev) => (prev ? { ...prev, ...updatedData } : null));
  }, []);

  // 파일 업데이트 함수
  const updatePendingFiles = useCallback((updates: Partial<SeminarState['pendingFiles']>) => {
    setPendingFiles((prev) => ({ ...prev, ...updates }));
  }, []);

  // 연사 프로필 업데이트 함수
  const updateSpeakerProfile = useCallback((key: number, value: File | null) => {
    setPendingFiles((prev) => {
      const newSpeakerProfiles = new Map(prev.speakerProfiles);
      if (value === null) {
        newSpeakerProfiles.delete(key);
      } else {
        newSpeakerProfiles.set(key, value);
      }
      return { ...prev, speakerProfiles: newSpeakerProfiles };
    });
  }, []);

  const setInitialState = useCallback((newState: SeminarDetailState) => {
    setInitialStateValue(newState);
    setCurrentState(newState);
    setPendingFiles({
      thumbnail: null,
      deletedMaterialUrls: [],
      materials: [],
      speakerProfiles: new Map(),
    });
  }, []);

  return {
    initialState,
    currentState,
    isLoading,
    error: error ? '데이터를 불러오는데 실패했습니다.' : null,
    isDirty,
    pendingFiles,
    ...validation,
    updateSeminarData,
    updatePendingFiles,
    updateSpeakerProfile,
    setInitialState,
  };
};
