import { createContext, useContext, useEffect, useState } from 'react';
import { getShowSeminar } from '../apis/ShowSeminar/userShowSeminar';
import type { ShowSeminarResult } from '../types/ShowSeminar/userShowSeminar';

interface ShowSeminarContextType extends ShowSeminarResult {
  isLoading: boolean;
}

const ShowSeminarContext = createContext<ShowSeminarContextType | undefined>(undefined);

export const ShowSeminarProvider = ({ children }: { children: React.ReactNode }) => {
  const [seminar, setSeminar] = useState<ShowSeminarContextType>({
    seminarId: null,
    seminarNum: null,
    applicantActivate: false,
    liveActivate: false,
    isLoading: true,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getShowSeminar();
        if (res?.isSuccess && res.result) {
          setSeminar({ ...res.result, isLoading: false });
        } else {
          setSeminar((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        setSeminar((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetch();
  }, []);

  return <ShowSeminarContext.Provider value={seminar}>{children}</ShowSeminarContext.Provider>;
};

export const useShowSeminar = () => {
  const context = useContext(ShowSeminarContext);
  if (!context) throw new Error('useShowSeminar must be used inside ShowSeminarProvider');
  return context;
};
