import { create } from 'zustand';

type ApplyFlowState = {
  seminarId: number | null;
  sessionId: number | null;
  setSeminarId: (id: number) => void;
  setSessionId: (id: number) => void;
  reset: () => void;
};

export const useApplyFlow = create<ApplyFlowState>((set) => ({
  seminarId: null,
  sessionId: null,
  setSeminarId: (id) => set({ seminarId: id }),
  setSessionId: (id) => set({ sessionId: id }),
  reset: () => set({ seminarId: null, sessionId: null }),
}));
