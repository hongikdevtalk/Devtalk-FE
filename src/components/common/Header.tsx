import { useNavigate } from 'react-router-dom';
import hamburger1 from '../../assets/icons/components/Header/hamburger1.svg';
import devlogo2 from '../../assets/logos/devlogo2.svg';
import HamburgerBar from './HamburgerBar';

type HeaderProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolled?: boolean;
};

const Header = ({ hamburgerOpen, setHamburgerOpen, isScrolled = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 flex justify-center items-center w-full max-w-[430px] h-[56px] z-[56] transition-colors duration-200 ${
          isScrolled ? 'bg-background shadow-sm shadow-grey-400/20' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-[375px] h-[34px] px-[20px]">
          <img
            src={devlogo2}
            alt="devlogo2"
            className="w-[119.06px] h-[24px] cursor-pointer"
            onClick={() => navigate('/')}
          />
          <img
            src={hamburger1}
            alt="hamburger"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setHamburgerOpen((prev) => !prev)}
          />
        </div>
      </header>
      <HamburgerBar isOpen={hamburgerOpen} onClose={() => setHamburgerOpen(false)} />
    </>
  );
};

export default Header;
