import { useNavigate } from 'react-router-dom';
import hamburger from '../../assets/icons/components/Header/hamburger.svg';
import devlogo from '../../assets/logos/devlogo.svg';
import HamburgerBar from './HamburgerBar';

type HeaderProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ hamburgerOpen, setHamburgerOpen }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 flex justify-center items-center w-full h-[56px] z-[56] bg-black">
        <div className="flex items-center justify-between w-[335px] h-[34px]">
          <img
            src={devlogo}
            alt="devlogo"
            className="w-[77px] h-[32px] cursor-pointer"
            onClick={() => navigate('/')}
          />
          <img
            src={hamburger}
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
