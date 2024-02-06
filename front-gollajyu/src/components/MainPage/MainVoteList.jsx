import React, { useState, useEffect } from 'react';
import API_URL from "../../stores/apiURL";
import axios from "axios";
import { Responsive } from 'react-responsive';

const VoteList = () => {
  const [listsData, setListsData] = useState([]);

  useEffect(() => {
    // API를 통해 투표 정보를 가져옵니다.
    axios.get(`${API_URL}/votes/ranks`).then((response) => {
      // 확인
      // console.log("API 응답 데이터:", response.data.body);
      const sortedVotes = response.data.body;
      const lists = [
        {
          title: "좋아요 순",
          items: sortedVotes.sortByLikes.map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
          })),
        },
        {
          title: "참여자 순",
          items: sortedVotes.sortByVoter.map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
          })),
        },
        {
          title: "최신순",
          items: sortedVotes.sortByNew.map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
          })),
        },
        {
          title: "마감 임박",
          items: sortedVotes.sortByClose.map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
          })),
        },
      ];
      setListsData(lists);
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {listsData.map((data, index) => (
        <div key={data.title} className="max-w-sm mx-2 mt-20 p-4 shadow-md rounded-lg border-t-2 border-teal-400 w-1/2">
          <div className="flex justify-between pb-4">
            <p className="font-bold text-xl">{data.title}</p>
          </div>
          <ul className="flex flex-col gap-2 pl-2">
            {data.items.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="block hover:underline">
                  <div className="flex flex-col">
                    <p className="font-bold text-lg">{item.title}</p>
                    <div className="flex flex-row gap-2">
                      <p>좋아요: {item.likesCnt}</p>
                      <p>참여: {item.totalChoiceCnt}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VoteList;