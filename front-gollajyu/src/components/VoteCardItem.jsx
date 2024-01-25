import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';


function VoteCardItem(props) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(null);

  return (
    <div className='w-200 h-500 flex flex-col'>
      <Container
        className='h-1/2 w-full bg-gray-200 p-4 relative' 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          className='h-full w-full object-cover'
          alt='Vote Image'
          src={props.src}
        />
        {hover && (
          <div className='absolute inset-0 flex justify-center items-center'>
            {Array(5).fill(null).map((_, index) => (
              <button 
                key={index} 
                className={`mx-1 py-1 px-3 rounded ${clicked !== null ? 'bg-gray-500' : 'bg-blue-500'} ${clicked === index ? 'bg-green-500' : ''} text-white`}
                onClick={() => setClicked(index)}
                disabled={clicked !== null && clicked !== index}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </Container>
      <div className='h-1/2 w-full flex flex-col justify-center items-center'>
        <h2 className='text-lg font-bold mb-4'>{props.title}</h2>
        {clicked !== null ? (
          <Link className='text-blue-500' to={props.path}>Go to Details</Link>
        ) : (
          <p>Click a button to vote</p>
        )}
      </div>
    </div>
  );
}

export default VoteCardItem;
