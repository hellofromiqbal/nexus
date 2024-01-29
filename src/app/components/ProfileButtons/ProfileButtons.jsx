import React from 'react';

const ProfileButtons = ({ contentFocus, handleContentFocus }) => {
  return (
    <>
      <button
        className={`py-4 w-full font-medium flex justify-center ${contentFocus === 'posts' ? 'bg-green-500 text-black' : 'text-white hover:text-black bg-transparent hover:bg-green-500'}`}
        onClick={() => handleContentFocus('posts')}
      >Posts</button>
      <button
        className={`py-4 w-full font-medium flex justify-center ${contentFocus === 'likes' ? 'bg-green-500 text-black' : 'text-white hover:text-black bg-transparent hover:bg-green-500'}`}
        onClick={() => handleContentFocus('likes')}
      >Liked Posts</button>
    </>
  )
};

export default ProfileButtons;