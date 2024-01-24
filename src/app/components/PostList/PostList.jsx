import React from 'react';
import PostCard from '../PostCard/PostCard';

const PostList = ({ list }) => {
  return (
    <>
      {list?.map((item) => (
        <PostCard key={item?._id} details={item}/>
      ))}
    </>
  )
};

export default PostList;