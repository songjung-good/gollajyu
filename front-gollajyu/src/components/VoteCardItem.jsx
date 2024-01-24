import React from 'react';
import { Link } from 'react-router-dom';

function VoteCardItem(props) {
  return (
    <div className=' w-200 h-500 flex flex-col '>
      <Link className='h-1/2 w-full bg-gray-200 p-4' to={props.path}>
        <img
          className='h-full w-full object-cover'
          alt='Vote Image'
          src={props.src}
        />
      </Link>
      <div className='h-1/2 w-full flex flex-col justify-center items-center'>
        <h2 className='text-lg font-bold mb-4'>{props.title}</h2>
        <Link className='text-blue-500' to={props.path}>Go to Details</Link>
      </div>
    </div>
  );
}

export default VoteCardItem;
