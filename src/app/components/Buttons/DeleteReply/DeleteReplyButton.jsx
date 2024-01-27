'use client'

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { useParams } from 'next/navigation';
import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteReplyButton = ({ id }) => {
  const params = useParams();
  const handleDeleteReply = async () => {
    console.log({ contentRefId: params.id, contentId: id });
    try {
      const res = await fetch('/api/replies/delete', {
        cache: 'no-cache',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentRefId: params.id, contentId: id })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
      }
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className='flex gap-2'
      onClick={handleDeleteReply}
    >
      <FaRegTrashCan className='text-white w-[18px] h-[18px]'/>
    </button>
  )
};

export default DeleteReplyButton;