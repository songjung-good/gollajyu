import React, { useState } from 'react';
import { Container } from '@mui/system';

// 각 투표에 관한 정보를 받아서 출력하는 곳
function VoteCardItem(props) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(null);
  
  // 투표선택지의 내용
  const categoryIndex = props.category === 'a' || props.category === 'b' ? 0 : props.category === 'c' || props.category === 'd' ? 1 : 2;
  const selection = [
    ['가성비', '소재', '색감', '모양', '브랜드'],
    ['가성비', '디자인', '브랜드', '기능성', '내구성'],
    [''],
  ]

  return (
    // 카드 하나의 사이즈
    <div className='flex flex-col w-full h-full' style={{ width: '280px', height: '450px' }}> {/* 높이를 조정했습니다. */}
    {/* 이미지를 띄워지는 배경 */}
      <Container
        className='h-4/5 w-full p-2 relative rounded-xl' 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ maxWidth: '100%' }}
      >
        {/* 투표 이미지 */}
        <img
          className='h-full w-full object-cover'
          alt='Vote Image'
          href={props.src}
        />
        {/* 호버 시 */}
        {hover && (
          <div className={`absolute inset-0 w-full bg-orange-200 opacity-50 rounded-xl ${clicked !== null ? 'hidden' : 'flex'} flex-col justify-between`}
          onMouseLeave={() => setClicked(null)}
          >
          {/* 선택지의 묶음 */}
            {Array(5).fill(null).map((_, index) => (
              <button 
                key={index} 
                className={`h-1/5 w-full flex items-center justify-center cursor-pointer ${clicked === index ? 'text-white' : 'text-black'} border-t-2 border-white text-xl`}
                onClick={() => setClicked(index)}
                disabled={clicked !== null && clicked !== index}
              >
                {selection[categoryIndex][index]}
              </button>
            ))}
          </div>
        )}
      </Container>
      {/* 버튼을 누르면 생기는 상세페이지 */}
      <div className='h-1/3 w-full flex flex-col justify-center items-center'>
        <h2 className='text-lg font-bold mb-2'>{props.product}</h2>
        <p>{props.detail}</p>
      </div>
    </div>
  );
}

export default VoteCardItem;
