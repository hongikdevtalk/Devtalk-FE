import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalToast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      closeButton={false}
      rtl={false}
      limit={3}
      theme="dark"
      toastStyle={{ width: 'auto' }}
    />
  );
};

export default GlobalToast;
