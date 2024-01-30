import React from 'react';

const MainWord = () => {
  return (
    <div className="w-auto h-32 relative text-center flex justify-center items-center">
      <div className="flex-none">
        <div className="aspect-w-1 aspect-h-1">
          <div className="1 text-white text-9xl font-medium tracking-widest">
            “
          </div>
        </div>
      </div>
      <div className="flex-grow md:flex-grow-4">
        <div className="2 text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider">
          전자제품에서 디자인을 선호하는 <br className="hidden md:block" />30대 여성은 의류에서 브랜드를 선호해요
        </div>
      </div>
      <div className="flex-none">
        <div className="aspect-w-1 aspect-h-1">
          <div className="3 text-white text-9xl font-medium tracking-widest">
            ”
          </div>
        </div>
      </div>
    </div>

  );
}

export default MainWord;
