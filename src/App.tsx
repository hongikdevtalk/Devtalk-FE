import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './App.css';
import { ShowSeminarProvider } from './contexts/ShowSeminarContext';

function App() {
  return (
    <ShowSeminarProvider>
      <RouterProvider router={router} />
    </ShowSeminarProvider>
  );
}

export default App;
