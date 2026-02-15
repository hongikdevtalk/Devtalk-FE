import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ApplyDraftState = {
  studentNum: string;
  name: string;
  grade: number;
  gradeEtc: string | null;
  email: string;
  phone: string;
  departments: string[];
  departmentEtc: string | null;
  participationType: string;
  inflowPath: string;
  inflowPathEtc: string | null;
  questions: Record<number, string>;

  setField: <K extends keyof ApplyDraftState>(key: K, value: ApplyDraftState[K]) => void;
  setQuestion: (sessionId: number, content: string) => void;
  reset: () => void;
};

// 초기값
const initial: Omit<ApplyDraftState, 'setField' | 'setQuestion' | 'reset'> = {
  studentNum: '',
  name: '',
  grade: 0,
  gradeEtc: null,
  email: '',
  phone: '',
  departments: [],
  departmentEtc: null,
  participationType: '',
  inflowPath: '',
  inflowPathEtc: null,
  questions: {},
};

export const useApplyDraft = create<ApplyDraftState>()(
  persist(
    (set) => ({
      ...initial,
      // 필드 하나 수정
      setField: (key, value) => set({ [key]: value } as any),
      // 특정 세션의 질문 수정
      setQuestion: (sessionId, content) =>
        set((state) => ({
          questions: { ...state.questions, [sessionId]: content },
        })),
      // 전체 초기화
      reset: () => set(initial),
    }),
    {
      name: 'apply-draft',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
