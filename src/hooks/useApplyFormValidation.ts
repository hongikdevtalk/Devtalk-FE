import { useCallback, useEffect, useRef, useState } from 'react';
import { validateAll } from '../utils/validators';
import { useApplyDraft } from '../stores/useApplyDraft';
import { validateStudentId } from '../utils/formatStudentId';

export function useApplyFormValidation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [canNext, setCanNext] = useState(false);
  const studentId = useApplyDraft((s) => s.studentNum);

  const runValidate = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    requestAnimationFrame(() => {
      const { allOk } = validateAll(root);
      const finalOk = allOk && validateStudentId(studentId || '');
      setCanNext(finalOk);
    });
  }, [studentId]);

  useEffect(() => {
    runValidate();
    const el = rootRef.current;
    if (!el) return;
    el.addEventListener('change', runValidate);
    el.addEventListener('input', runValidate);
    return () => {
      el.removeEventListener('change', runValidate);
      el.removeEventListener('input', runValidate);
    };
  }, [runValidate]);

  return { rootRef, canNext };
}
