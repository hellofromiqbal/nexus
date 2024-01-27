/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import ContentList from '../ContentList/ContentList';
import ContentCard from '../ContentCard/ContentCard';
import CreateReplyForm from '../Forms/CreateReply/CreateReplyForm';

import { useSelector, useDispatch } from 'react-redux';
import { selectVisitedReply, setVisitedReply } from '@/store/visitedReplySlice';

const MainReplyDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = decodeURIComponent(params.id);
  const visitedReply = useSelector(selectVisitedReply);
  
  useEffect(() => {
    fetch(`/api/replies/${id}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => dispatch(setVisitedReply(data.data)))
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  return (
    <>
      <div>
        <ContentCard details={visitedReply} type='reply'/>
      </div>
      <div className='px-4 pb-4'>
        <CreateReplyForm/>
      </div>
      <div>
        <ContentList list={visitedReply?.replies} type='reply'/>
      </div>
    </>
  )
};

export default MainReplyDetail;