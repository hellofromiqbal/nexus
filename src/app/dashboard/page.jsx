import React from 'react';
import CreatePostForm from '../components/Forms/CreatePost/CreatePostForm';
import PostCard from '../components/PostCard/PostCard';
import PostList from '../components/PostList/PostList';

const DashboardPage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4'>
        <CreatePostForm/>
      </div>
      <div>
        <PostList/>
      </div>
    </div>
  )
};

export default DashboardPage;