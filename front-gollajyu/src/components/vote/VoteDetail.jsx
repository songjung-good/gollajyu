import React from 'react';

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
            {/* 최상단: 투표의 카테고리 표시와 페이지 닫기(X) 버튼 */}
            <div className="bg-gray-100 py-2 px-4 flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{voteDetail.category}</h2>
                <button>X</button>
            </div>
            
            {/* 바로 아래: 좋아요 수와 투표 참여자 수, 그리고 투표 생성자의 이름과 투표 생성일 */}
            <div className="py-4 px-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-gray-800">{voteDetail.author}</h3>
                    <p className="text-gray-600 text-base">생성일: {voteDetail.createdAt}</p>
                </div>
                <div>
                    <p className="text-gray-600 text-base">좋아요: {voteDetail.likes}</p>
                    <p className="text-gray-600 text-base">참여자 수: {voteDetail.participants}</p>
                </div>
            </div>

            {/* 투표의 제목 */}
            <div className="py-4 px-6">
                <h2 className="text-2xl font-semibold text-gray-800">{voteDetail.title}</h2>
            </div>

            {/* 투표의 선택지: 2~4개의 선택지를 보여줍니다. */}
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

            {/* 투표참여하지 않은 사람들에게는 볼 수 없는 섹션 */}
            {voteDetail.hasVoted && (
                <div className="py-4 px-6">
                    <h3 className="text-lg font-medium text-gray-800">투표 결과</h3>
                    {/* 투표 결과를 보여주는 코드를 여기에 작성하세요. */}
                </div>
            )}
        </div>
    );
};

export default VoteDetail;
