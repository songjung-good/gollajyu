import React, { useState, useEffect } from 'react';
// import VoteCardItem from '../vote/VoteCardItem';
import API_URL from "../../stores/apiURL";
import axios from "axios";

// const votes = [
//   {
//     author: 'Emily Jones',
//     avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
//     category: '의류',
//     title: '가을 시즌에 어울리는 옷은?',
//     participants: 123,
//     likes: 456
//   },
//   {
//     author: 'David Lee',
//     avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
//     category: '음식',
//     title: '피자 vs 햄버거',
//     participants: 98,
//     likes: 321
//   },
//   {
//     author: 'Sophia Williams',
//     avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
//     category: '여행',
//     title: '여름 휴가로 추천하는 곳은?',
//     participants: 87,
//     likes: 654
//   },
//   {
//     author: 'Michael Chen',
//     avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
//     category: '기술',
//     title: 'iOS vs Android',
//     participants: 76,
//     likes: 987
//   },
// ];

// const groupedVotes = votes.reduce((groups, vote) => {
//   if (!groups[vote.category]) {
//     groups[vote.category] = [];
//   }
//   groups[vote.category].push(vote);
//   return groups;
// }, {});

// const VoteList = ({ votes }) => {
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

// export default VoteList;

const VoteList = () => {
  const [categories, setCategories] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    // API를 통해 투표 정보를 가져옵니다.
    axios.get(`${API_URL}/votes`).then((response) => {
      const groupedVotes = response.data.reduce((groups, vote) => {
        if (!groups[vote.category]) {
          groups[vote.category] = [];
        }
        groups[vote.category].push(vote);
        return groups;
      }, {});

      setCategories(Object.keys(groupedVotes));
      setVotes(groupedVotes);
    });
  }, []);

  const getSortedVotes = (category, sortBy) => {
    switch (sortBy) {
      case "likes":
        return votes[category].sort((a, b) => b.likes - a.likes).slice(0, 5);
      case "participants":
        return votes[category]
          .sort((a, b) => b.participants - a.participants)
          .slice(0, 5);
      case "close":
        return votes[category].filter((vote) => vote.isClose).slice(0, 5);
      case "date":
        return votes[category]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
      default:
        return votes[category].slice(0, 5);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16">
      {categories.map((category) => (
        <div key={category}>
          <div className="flex justify-between items-center py-2 px-4">
            <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
            <select
              className="border rounded-md p-2 text-gray-600"
              onChange={(e) => {
                // 정렬 기준에 따라 투표 목록을 다시 정렬합니다.
                const sortedVotes = getSortedVotes(category, e.target.value);
                setVotes({ ...votes, [category]: sortedVotes });
              }}
            >
              <option value="likes">좋아요 순</option>
              <option value="participants">참여자 순</option>
              <option value="close">박빙 투표</option>
              <option value="date">최신 투표</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {getSortedVotes(category, "likes").map((vote, index) => (
              <div
                key={index}
                className="border rounded-md p-4"
                style={{ width: "400px", height: "400px" }}
              >
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    src={vote.avatar}
                    alt="User avatar"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-gray-800">{vote.title}</h3>
                    <p className="text-gray-600 text-base">
                      참여자 수: {vote.participants} 좋아요 수: {vote.likes}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-200 text-red-600 font-medium p-2 rounded-md"
                    onClick={() => {
                      // 투표 상세 페이지로 이동합니다.
                      // ...
                    }}
                  >
                    투표 참여
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default VoteList;