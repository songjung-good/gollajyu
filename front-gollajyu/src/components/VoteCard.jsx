import React from 'react'
import VoteCardItem from './VoteCardItem';

export default function VoteCard() {
  return (
      <div className="w-1000 h-1000 flex justify-around items-center bg-white">
          <VoteCardItem className="w-1/4 h-full object-cover" />
          <VoteCardItem className="w-1/4 h-full object-cover" />
          <VoteCardItem className="w-1/4 h-full object-cover" />
          <VoteCardItem className="w-1/4 h-full object-cover" />
      </div>
  );
}