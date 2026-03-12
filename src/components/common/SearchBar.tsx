import SearchIcon from '../../assets/icons/common/search.svg';

interface Tag {
  id: number;
  text: string;
}

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  tags: Tag[];
}

const SearchBar = ({ searchTerm, onSearchChange, tags }: SearchBarProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full inline-flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색어를 입력해 주세요."
          className="w-full text-black text-xl font-normal font-['Pretendard'] outline-none bg-transparent placeholder:text-grey-700"
        />
        <div className="w-6 h-6 flex justify-center items-center shrink-0">
          <img src={SearchIcon} alt="search" className="w-[18px] h-[18px]" />
        </div>
      </div>
      <div className="w-full h-0.5 bg-primary-300" />
      <div className="w-full inline-flex justify-start items-start gap-3 flex-wrap content-start">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onSearchChange(tag.text)}
            className="px-2.5 py-2 bg-[radial-gradient(ellipse_134.44%_154.40%_at_86.96%_107.14%,_#ADE657_0%,_#4FC78F_100%)] rounded-[10px] flex justify-center items-center gap-2.5 active:scale-95 transition-transform"
          >
            <span className="text-white text-base font-medium font-['Pretendard']">
              # {tag.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
