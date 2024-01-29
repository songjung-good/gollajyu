import React from 'react';

const posts = [
  // 여기에 게시글 데이터가 객체 형태로 들어가면 됩니다.
  // 예: { id: 1, title: '게시글 제목', likes: 10 }
];

const PostGridItem = ({ topic, posts }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-2">{topic}</h3>
      <ul>
        {posts.map((post, index) => (
          index < 5 && (
            <li key={post.id} className="flex justify-between items-center border-b-2 last:border-b-0 py-2">
              <span className="text-sm font-medium">{post.title}</span>
              <span className="text-sm text-gray-600">{post.likes} 좋아요</span>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

const MainVoteList = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PostGridItem topic="좋아요 많이 받은 top 5" posts={posts} />
      <PostGridItem topic="현재 논쟁 중인 top 5" posts={posts} />
      <PostGridItem topic="최근 게시물 top 5" posts={posts} />
      <PostGridItem topic="당신의 관심사 top 5" posts={posts} />
    </div>
  );
};

export default MainVoteList;
