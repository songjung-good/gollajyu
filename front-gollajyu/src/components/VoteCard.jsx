import React from 'react'
// import VoteCardItem from './VoteCardItem';

export default function VoteCard() {
  return (
      <div className="w-1000 h-500 flex justify-around items-center bg-white">
          <div className="w-1/4 h-full bg-cover bg-center" style={{backgroundImage: 'url(이미지 URL1)'}}></div>
          <div className="w-1/4 h-full bg-cover bg-center" style={{backgroundImage: 'url(이미지 URL2)'}}></div>
          <div className="w-1/4 h-full bg-cover bg-center" style={{backgroundImage: 'url(이미지 URL3)'}}></div>
          <div className="w-1/4 h-full bg-cover bg-center" style={{backgroundImage: 'url(이미지 URL4)'}}></div>
      </div>
  );
}
