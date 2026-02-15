import { createBrowserRouter } from 'react-router-dom';
import { adminRoutes } from './admin';
import { userRoutes } from './user';

export const router = createBrowserRouter([...adminRoutes, ...userRoutes]);
export default router;
