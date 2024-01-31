import React from 'react';
import VoteCardItem from './VoteCardItem';
import VoteDetailHeader from './VoteDetailHeader';

// 임시 데이터
const voteDetail = {
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '의류',
  options: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1'
    },
    {
      image: 'https://example.com/image2.jpg',
      text: '옵션2'
    },
    {
      image: 'https://example.com/image3.jpg',
      text: '옵션3'
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4'
    },
  ],
  hasVoted: true  // 사용자가 투표에 참여했는지 여부
};

const VoteDetail = () => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-xxl mx-auto mt-16">
      <VoteDetailHeader {...voteDetail} />
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
        {voteDetail.options.map((option, index) => (
          <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center" 
            style={{ height: 450, backgroundImage: `url(${option.image})` }} 
            key={index}>
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
            <main className="p-5 z-10">
              <button className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                {option.text}
              </button>
            </main>
          </div>
        ))}
      </div>
      {voteDetail.hasVoted && (
        <div className="py-4 px-6">
          <h3 className="text-lg font-medium text-gray-800">투표 결과</h3>
        </div>
      )}
    </div>
  );
};

export default VoteDetail;
