import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className={`flex justify-center items-center w-full h-dvh`}>
      <ClipLoader color={'#d5ff7a'} />
    </div>
  );
};

export default LoadingSpinner;
