import React from 'react';
import VoteCardItem from '../vote/VoteCardItem';

// const MainVoteList = ({ votes }) => {
//   return (
//     <div>
//       <h2>좋아요 많이 받은 투표</h2>
//       {votes.sort((a, b) => b.likes - a.likes).slice(0, 5).map(vote => (
//         <VoteCardItem key={vote.id} vote={vote} />
//       ))}
//       <h2>투표 참여자가 많은 투표</h2>
//       {votes.sort((a, b) => b.participants - a.participants).slice(0, 5).map(vote => (
//         <VoteCardItem key={vote.id} vote={vote} />
//       ))}
//       <h2>투표의 선택지가 박빙인 투표</h2>
//       {votes.filter(vote => vote.isClose).slice(0, 5).map(vote => (
//         <VoteCardItem key={vote.id} vote={vote} />
//       ))}
//       <h2>최근에 올라온 투표</h2>
//       {votes.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(vote => (
//         <VoteCardItem key={vote.id} vote={vote} />
//       ))}
//     </div>
//   );
// };

// export default MainVoteList;


const votes = [
  {
    author: 'Emily Jones',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    category: '의류',
    title: '가을 시즌에 어울리는 옷은?',
    participants: 123,
    likes: 456
  },
  {
    author: 'David Lee',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    category: '음식',
    title: '피자 vs 햄버거',
    participants: 98,
    likes: 321
  },
  {
    author: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    category: '여행',
    title: '여름 휴가로 추천하는 곳은?',
    participants: 87,
    likes: 654
  },
  {
    author: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
    category: '기술',
    title: 'iOS vs Android',
    participants: 76,
    likes: 987
  },
];

const groupedVotes = votes.reduce((groups, vote) => {
  if (!groups[vote.category]) {
    groups[vote.category] = [];
  }
  groups[vote.category].push(vote);
  return groups;
}, {});

const VoteList = () => {
  return (
    <div className="max-w-lg mx-auto mt-16">
      {Object.entries(groupedVotes).map(([category, votes]) => (
        <div key={category}>
          <div className="py-2 px-4">
            <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {votes.map((vote, index) => (
              <div key={index} className="border rounded-md p-4" style={{ width: '400px', height: '400px' }}>
                <img className="w-12 h-12 rounded-full object-cover mb-4" src={vote.avatar} alt="User avatar" />
                <h3 className="text-lg font-medium text-gray-800">{vote.title}</h3>
                <p className="text-gray-600 text-base">참여자 수: {vote.participants} 좋아요 수: {vote.likes}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoteList;