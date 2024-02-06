import React, { useState } from 'react';
import { Container } from '@mui/system';
import categoryData from '../../stores/categoryData';
import useAuthStore from "../../stores/userState";
import globalUrl from '../../stores/globalUrl';
import axios from 'axios';

// 각 투표에 관한 정보를 받아서 출력하는 곳
function VoteCardItem(props) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(null);
  const { item, categoryId, voteId } = props;
  const user = useAuthStore((state) => state.user);

  // user.memberId
  console.log(categoryData[categoryId].tags)
  console.log(voteId)
  const selection = categoryData[categoryId].tags

  const [memberId, setMemberId] = useState(0);
  const voteItemId = item.voteItemId;


  // 투표하기 기능~~~~~
  const onTagClick = (index) => {
    const dto = {
      memberId: user.memberId,
      voteId: voteId,
      voteItemId: voteItemId,
      categoryId: categoryId,
      tagId: (categoryId - 1)*5 + index+1,
    };

    // Send axios request
    axios.post(globalUrl+'/votes/choices', dto)
      .then(response => {
        // Handle success
        console.log('Axios request successful:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Axios request failed:', error);
      });
  };

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
        {/* 호버 시 */}
        {hover && (
          <div className={`absolute inset-0 w-full bg-orange-200 opacity-50 rounded-xl ${clicked !== null ? 'hidden' : 'flex'} flex-col justify-between`}
          onMouseLeave={() => setClicked(null)}
          >
          {/* 선택지의 묶음 */}
            {selection.map((tag, index) => (
              <button 
                key={index} 
                className={`h-1/5 w-full flex items-center justify-center cursor-pointer ${clicked === index ? 'text-white bg-blue-500' : 'text-black'} border-t-2 border-white text-max-xl`}
                onClick={() => {
                  if(clicked === null) {
                    setClicked(index);
                    onTagClick(index);
                  }
                }}
                disabled={clicked !== null}
              >
                {tag}
              </button>
            ))}
          </div>
          
        )}
        
        {/* 투표 이미지 */}
        <img
          className='h-full w-full object-cover'
          alt='Vote Image'
          href={props.src}
        />
        
      </Container>
      {/* 버튼을 누르면 생기는 상세페이지 */}
      <div className='h-1/3 w-full flex flex-col justify-center items-center'>
        <h2 className='text-lg font-bold mb-2'>{item.price}원</h2>
        <p>{item.voteItemDesc}</p>
      </div>
    </div>
  );
}

export default VoteCardItem;
