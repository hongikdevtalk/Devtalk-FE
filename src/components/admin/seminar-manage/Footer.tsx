import { toast } from 'react-toastify';

interface FooterProps {
  saveButtonText: string;
  isDirty: boolean;
  hasErrors: boolean;
  dateFormatError: string | undefined;
  validateActivationDates: {  application: string };
  getError: () => string | null;
  onSave: () => void;
  onCancel: () => void;
}

const Footer = ({
  saveButtonText,
  isDirty,
  hasErrors,
  dateFormatError,
  validateActivationDates,
  getError,
  onSave,
  onCancel,
}: FooterProps) => {
  const isDateError =
    !!dateFormatError || !!validateActivationDates.application;
  const isButtonDisabled = !isDirty || isDateError;

  const handleSaveClick = () => {
    if (hasErrors) {
      const errorMessage = getError();
      if (errorMessage) {
        toast.error(errorMessage);
      }
      return;
    }
    onSave();
  };

  return (
    <footer className="max-w-[1060px] min-w-[850px]">
      <div className="flex justify-end gap-3 px-8">
        <button
          className="w-56 h-[68px] px-6 py-3 heading-3-semibold bg-grey-700 text-black rounded-10 hover:bg-grey-600 cursor-pointer"
          onClick={onCancel}
        >
          취소하기
        </button>
        <button
          disabled={isButtonDisabled}
          className="w-56 h-[68px] px-6 py-3 heading-3-semibold bg-green-300 text-black rounded-10 
                    hover:bg-green-400 disabled:bg-grey-500 disabled:cursor-not-allowed cursor-pointer"
          onClick={handleSaveClick}
        >
          {saveButtonText}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
