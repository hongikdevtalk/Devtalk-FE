import { useState, useRef, useEffect } from 'react';
import chevronDownIcon from '../../../../assets/icons/common/chevrondown.svg';

interface Option {
  value: number | string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue: number | string;
  onSelect: (value: number | string) => void;
  className?: string;
}

const CustomSelect = ({ options, selectedValue, onSelect }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<'top' | 'bottom'>('bottom'); // 드롭다운이 열릴 위치
  const optionsListRef = useRef<HTMLUListElement>(null);

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label;

  // 드롭다운이 열릴 때마다 위치 계산
  useEffect(() => {
    if (isOpen) {
      const buttonRect = dropdownRef.current?.getBoundingClientRect();
      const optionsHeight = optionsListRef.current?.offsetHeight || 0;
      const spaceBelow = window.innerHeight - (buttonRect?.bottom || 0);

      if (spaceBelow < optionsHeight && (buttonRect?.top || 0) > optionsHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen]);

  // 외부 클릭시 드롭다운 닫음
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleOptionClick = (value: number | string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-[105px] h-[40px] bg-grey-700 body-1-semibold text-white rounded-8 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <span className="mr-1">{selectedLabel}</span>
        <img
          src={chevronDownIcon}
          alt="▼"
          className={`absolute right-3 w-3 h-3 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <ul
          ref={optionsListRef}
          className={`
            absolute z-10 w-full max-h-[200px] overflow-y-auto bg-grey-700 border border-grey-600 rounded-8 scrollbar-hide
            ${position === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3'}
          `}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-4 py-2 text-white text-center hover:bg-green-300 hover:text-black cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
