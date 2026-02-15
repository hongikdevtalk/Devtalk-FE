import '../../../../styles/formInput.css';

interface LiveLinkInputProps {
  link: string;
  onLinkChange: (newLink: string) => void;
}

const LiveLinkInput = ({ link, onLinkChange }: LiveLinkInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLinkChange(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="bg-grey-900 p-6 rounded-10">
      <h2 className="heading-2-bold text-white mb-6">세미나 Live 링크</h2>
      <input
        type="url"
        className="form-input-base form-input-text"
        placeholder="링크 URL을 입력해주세요."
        value={link || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default LiveLinkInput;
