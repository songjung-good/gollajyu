import React, { useState } from ' 'react';

const VoteProduct = () => {
  const [items, setItems] = useState([{}, {}]);

  const handleAddItem = () => {
    if (items.length < 4) {
      setItems([...items, {}]);
    } else {
      alert('최대 4개의 투표 항목까지만 추가할 수 있습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-4 px-9">
          <div className="mb-5">
            <label htmlFor="title" className="mb-3 block text-base font-medium text-[#FF7F50]">
              제목:
            </label>
            <input type="text" name="title" id="title" placeholder="제목을 입력하세요"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md" />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#FF7F50]">
              투표 내용:
            </label>
            <textarea name="description" id="description" placeholder="투표 내용을 입력하세요"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md" />
          </div>
          
          {/* 투표 항목 추가 부분 */}
          {items.map((item, index) => (
            <div key={index} className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#FF7F50]">
                투표 항목 추가
              </label>
              <div className="mb-8">
                <input type="file" name="file" id="file" className="sr-only" />
                <label htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#FF7F50]">
                      사진을 첨부해주세요
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      또는
                    </span>
                    <span
                      className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#FF7F50]">
                      찾아보기
                    </span>
                  </div>
                </label>
              </div>
              <div className="mb-5">
                <label htmlFor="price" className="mb-3 block text-base font-medium text-[#FF7F50]">
                  가격:
                </label>
                <input type="number" name="price" id="price" placeholder="가격을 입력하세요"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md" />
              </div>
              <div className="mb-5">
                <label htmlFor="content" className="mb-3 block text-base font-medium text-[#FF7F50]">
                  내용 설명:
                </label>
                <textarea name="content" id="content" placeholder="내용을 입력하세요"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md" />
              </div>
            </div>
          ))}

          {/* 투표 항목 추가 버튼 */}
          <div className="mb-5">
            <button type="button" onClick={handleAddItem}
              className="w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              투표 항목 추가하기
            </button>
          </div>
          <div className="flex justify-between">
            <button
              className="hover:shadow-form w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2">
              투표 올리기
            </button>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2">
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteProduct;
``
