import React, { useState } from 'react';

const VoteSimple = () => {
  const [title, setTitle] = useState('');
  // const [category, setCategory] = useState('');
  const [images, setImages] = useState([null, null, null, null]);

  // 이미지 업로드 기능
  const handleImageUpload = (event, index) => {
    setImages(images.map((img, idx) => (idx === index ? event.target.files[0] : img)));
  };

  // 조건에 안맞으면 알림창
  const handleSubmit = (event) => {
    event.preventDefault();
    const imageCount = images.filter((img) => img !== null).length;
    if (imageCount < 2) {
      alert('투표를 게시하려면 최소 2개 이상의 사진을 첨부해야 합니다.');
      return;
    }
    console.log('투표를 게시합니다.');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[900px] bg-white">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          {/* 제목 및 카테고리 설정 */}
          <div className="mb-5">
            <label htmlFor="title" className="mb-3 block text-base font-medium text-[#8DB600]">
              제목:
            </label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#8DB600] focus:shadow-md" 
            />
          </div>
          {/* <div className="mb-5">
            <label htmlFor="category" className="mb-3 block text-base font-medium text-[#8DB600]">
              카테고리:
            </label>
            <select 
              name="category" 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#8DB600] focus:shadow-md"
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="category1">의류</option>
              <option value="category2">신발</option>
              <option value="category3">가구</option>
              <option value="category3">전자제품</option>
              <option value="category3">기타</option>
            </select>
          </div> */}
          {/* 사진 첨부, 캡쳐 */}
          <div className="flex flex-wrap justify-center mt-10">
            {Array(4).fill(null).map((_, index) => (
              <div key={index} className="p-4 max-w-sm flex-grow">
                <div className="flex rounded-lg h-full bg-[#8DB600] p-8 flex-col">
                  <div className="mb-8">
                    <input 
                      type="file" 
                      name={`file${index}`} 
                      id={`file${index}`}
                      className="sr-only"
                      onChange={(event) => handleImageUpload(event, index)} 
                    />
                    <label htmlFor={`file${index}`}
                      className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center">
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-white">
                          사진을 첨부해주세요
                        </span>
                      </div>
                    </label>
                    {/* <button 
                      type="button"
                      className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center">
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-white">
                          캡쳐 도구로 첨부하기
                        </span>
                      </div>
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 투표 올리기, 취소하기 버튼 */}
          <div className="flex justify-between">
            <button
              className="hover:shadow-form w-full rounded-md bg-[#8DB600] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2">
              투표 올리기
            </button>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#8DB600] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2">
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteSimple;
