import React from 'react';
import CreatePostForm from '../components/Forms/CreatePost/CreatePostForm';
import MainDashboardContent from '../components/MainDashboardContent/MainDashboardContent';

const DashboardPage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4'>
        <CreatePostForm/>
      </div>
      <div>
        <MainDashboardContent/>
      </div>
    </div>
  )
};

export default DashboardPage;