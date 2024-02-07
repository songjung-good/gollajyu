import React, { useState } from 'react';
import useModalStore from "../../stores/modalState";

const VoteProduct = () => {
  const [items, setItems] = useState([{}, {}]);
  const [category, setCategory] = useState('');  // 카테고리 상태 변수 추가
  // 모달창 닫기
  const setVoteProductCreateModalClose = useModalStore((state) => state.setVoteProductCreateModalClose);

  const handleAddItem = () => {
    if (items.length < 4) {
      setItems([...items, {}]);
    } else {
      alert('최대 4개의 투표 항목까지만 추가할 수 있습니다.');
    }
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setVoteProductCreateModalClose();
        }
      }}
    >
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
            <label htmlFor="category" className="mb-3 block text-base font-medium text-[#FF7F50]">
                카테고리:
            </label>
            <select 
              name="category" 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md"
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="category1">의류</option>
              <option value="category2">신발</option>
              <option value="category3">가구</option>
              <option value="category4">전자제품</option>
              <option value="category5">기타</option>
            </select>
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
            <div key={index} className="mb-6 pt-4 border-t">
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