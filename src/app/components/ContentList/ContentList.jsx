import React from 'react';
import ContentCard from '../ContentCard/ContentCard';

const ContentList = ({ list }) => {
  return (
    <>
      {list?.map((item) => (
        <ContentCard key={item?._id} details={item}/>
      ))}
    </>
  )
};

export default ContentList;