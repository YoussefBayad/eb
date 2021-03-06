import React from 'react';
import AdminNav from '../features/admin/AdminNav';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
  return (
    <div className='control-panel'>
      <div className='sidebar'>
        <AdminNav />
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default AdminLayout;
