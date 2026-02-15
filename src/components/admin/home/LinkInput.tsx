import { useState, useEffect } from 'react';

interface LinkInputProps {
  title: string;
  initialUrl: string | null | undefined;
  onSave: (url: string) => void;
  onDelete: () => void;
  isSaving: boolean;
  isDeleting: boolean;
}

const LinkInput = ({
  title,
  initialUrl,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: LinkInputProps) => {
  const [link, setLink] = useState('');
  const [originalLink, setOriginalLink] = useState('');

  useEffect(() => {
    if (initialUrl) {
      setLink(initialUrl);
      setOriginalLink(initialUrl);
    } else {
      setLink('');
      setOriginalLink('');
    }
  }, [initialUrl]);

  const handleSave = () => {
    if (!link.trim()) {
      onDelete();
    } else {
      onSave(link);
    }
  };

  const isModified = link !== originalLink;

  return (
    <div className="w-full min-w-[650px] mx-auto bg-grey-900 p-6 rounded-10 space-y-24">
      <h2 className="heading-2-bold text-white mb-24">{title}</h2>
      <textarea
        placeholder="링크를 입력해주세요."
        className="w-full bg-grey-700 rounded-8 px-16 py-12 text-white placeholder-grey-300
           focus:outline-none focus:border focus:border-green-300
           resize-none overflow-hidden border border-transparent transition-colors duration-200"
        rows={1}
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
          }
        }}
        onInput={(e) => {
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        }}
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          disabled={!isModified || isSaving || isDeleting}
          className={`w-[140px] aspect-[175/52] px-[50px] py-[12px] rounded-8 subhead-1-semibold flex items-center justify-center transition-opacity duration-200
            ${
              !isModified
                ? 'bg-grey-600 text-grey-400 cursor-not-allowed'
                : 'bg-green-300 text-black hover:opacity-80 hover:cursor-pointer'
            }`}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default LinkInput;
