import React from 'react';
import ContentCard from '../ContentCard/ContentCard';

const ContentList = ({ list, type = 'post', contentIn = 'post' }) => {
  return (
    <>
      {list?.map((item) => (
        <ContentCard
          key={item?._id}
          details={item} type={type}
          contentIn={contentIn}
        />
      ))}
    </>
  )
};

export default ContentList;