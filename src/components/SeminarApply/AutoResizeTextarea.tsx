import { useEffect, useRef } from 'react';

type AutoResizeTextareaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
}: AutoResizeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const newH = Math.min(el.scrollHeight, 690); // textarea 높이 제한
    el.style.height = `${Math.max(newH, 117)}px`; // 117~690 범위 유지
    el.style.overflowY = el.scrollHeight > 690 ? 'auto' : 'hidden';
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <div className="mx-5 flex justify-center">
      <div
        className="w-full max-w-[680px] rounded-8 bg-grey-800 p-4
                   flex flex-col gap-8
                   focus-within:ring-1 focus-within:ring-grey-600"
        style={{ minHeight: 174, maxHeight: 747 }} // 컨테이너 범위
      >
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onInput={resize}
          placeholder={placeholder}
          maxLength={500}
          className="w-full bg-transparent outline-none resize-none rounded-8
                     px-16 py-16 body-1-medium text-grey-50 placeholder-grey-300
                     box-border"
          style={{ minHeight: 117, maxHeight: 690 }} // textarea 범위
        />
        <div className="px-16 py-16 flex justify-end">
          <span className="caption-medium text-grey-400">최대 500자(공백 포함)</span>
        </div>
      </div>
    </div>
  );
}
