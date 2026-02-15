import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../components/common/ScrollToTop';

const AdminLayout: React.FC = () => {
  return (
    <div className="w-full max-w-[375px] mx-auto min-h-screen bg-background">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
