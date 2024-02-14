import React, { useState, useEffect } from "react";
import API_URL from "/src/stores/apiURL";
import axios from "axios";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

const VoteProduct = () => {
  // 설명 state 추가
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  // 카테고리 상태 변수 추가
  const [category, setCategory] = useState("");
  // 모달창 닫기
  const setVoteProductCreateModalClose = useModalStore(
    (state) => state.setVoteProductCreateModalClose
  );

  const [voteItems, setVoteItems] = useState([
    { voteItemImg: null, voteItemDesc: "", price: "" },
    { voteItemImg: null, voteItemDesc: "", price: "" },
  ]);
  const [previewImages, setPreviewImages] = useState([]);

  // 사용자 ID를 저장할 state 변수 추가
  const user = useAuthStore((state) => state.user);
  // 모달창 닫는 로직
  const setVoteProductModalClose = useModalStore(
    (state) => state.setVoteProductCreateModalClose
  );

  const handleInputChange = (e, index, field) => {
    const updatedItems = [...voteItems];
    const value =
      field === "price" ? parseFloat(e.target.value) || 0 : e.target.value;
    if (updatedItems[index]) {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    } else {
      updatedItems[index] = { voteItemImg: null, [field]: value };
    }
    setVoteItems(updatedItems);
  };

  const addVoteItem = () => {
    if (voteItems.length > 3) {
      alert("최대 개수를 초과하였습니다.");
      return;
    }
    setVoteItems((prevState) => [
      ...prevState,
      { voteItemImg: null, voteItemDesc: "", price: "" },
    ]);
    setPreviewImages((prevState) => [...prevState, null]);
  };
  // Function to handle changing voting item image
  const handleVoteItemImageChange = (index, event) => {
    const newVoteItems = [...voteItems];
    // 여기서 취소를 눌러도 유지되게끔 바꿀 수도 있음.
    newVoteItems[index].voteItemImg = event.target.files[0];
    setVoteItems(newVoteItems);

    const newPreviewImages = [...previewImages];
    // 그림을 넣으려다 취소를 눌렀을 때 제거되기 때문에 보관하던 이미지도 제거했다.
    event.target.files[0]
      ? (newPreviewImages[index] = URL.createObjectURL(event.target.files[0]))
      : (newPreviewImages[index] = null);
    setPreviewImages(newPreviewImages);
  };

  // 투표 항목 삭제 함수 (마지막 항목 삭제)
  const removeVoteItem = () => {
    if (voteItems.length === 0) {
      return;
    }
    const updatedItems = [...voteItems];
    updatedItems.pop(); // 마지막 항목 삭제
    setVoteItems(updatedItems);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.pop(); // 마지막 항목에 해당하는 이미지 삭제
    setPreviewImages(updatedPreviewImages);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      alert("제목을 입력해쥬!");
      return;
    }

    if (voteItems && voteItems.length < 2) {
      alert("최소 2개 이상의 사진을 첨부해쥬!");
      return;
    }

    if (event.target.category.value === "") {
      alert("카테고리를 선택해쥬!");
      return;
    }

    if (event.target.description.value === "") {
      alert("내용을 입력해쥬!");
      return;
    }
    const formData = new FormData();
    formData.append("memberEmail", user.email);
    formData.append("title", event.target.title.value);
    formData.append("description", event.target.description.value);
    formData.append("categoryId", event.target.category.value);
    voteItems.forEach((item, index) => {
      formData.append(`voteItemList[${index}].voteItemImg`, item.voteItemImg);
      formData.append(`voteItemList[${index}].voteItemDesc`, item.voteItemDesc);
      formData.append(`voteItemList[${index}].price`, item.price);
    });

    try {
      const response = await axios.post(API_URL + "/votes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      setVoteProductModalClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create poll.");
    }
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setVoteProductCreateModalClose();
        }
      }}
    >
      <div className="mx-auto max-h-[700px] w-full max-w-[550px] bg-white overflow-y-auto">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#FF7F50]"
            >
              제목:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="mb-3 block text-base font-medium text-[#FF7F50]"
            >
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
              <option value="1">의류</option>
              <option value="2">가구</option>
              <option value="3">신발</option>
              <option value="4">전자제품</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-3 block text-base font-medium text-[#FF7F50]"
            >
              투표 내용:
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="투표 내용을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md"
            />
          </div>

          {/* 투표 항목 추가 부분 */}
          {voteItems.map((voteItem, index) => (
            <div key={index} className="mb-6 pt-4 border-t-2 border-blue-400">
              {" "}
              <div className="flex rounded-lg h-full bg-[#8DB600] p-8 flex-col">
                <div className="mb-8">
                  <label htmlFor={`voteItem${index + 1}`} className="relative">
                    <input
                      type="file"
                      name={`voteItemImgs`}
                      id={`voteItem${index + 1}`}
                      onChange={(e) => handleVoteItemImageChange(index, e)}
                      multiple
                    />
                    {previewImages[index] && (
                      <img
                        src={previewImages[index]}
                        alt=""
                        className="object-cover h-full w-full rounded-lg"
                      />
                    )}
                  </label>

                  {!previewImages[index] && (
                    <label
                      htmlFor={`voteItem${index + 1}`}
                      className="relative flex items-center justify-center 
                rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
                    >
                      <div className="max-w-[200px] h-[200px]">
                        <span className="mb-2 block text-xl font-semibold text-white">
                          사진을 첨부해주세요
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor={`price-${index}`}
                  className="mb-3 block text-base font-medium text-[#FF7F50]"
                >
                  가격:
                </label>
                <input
                  name={`price-${index}`}
                  id={`price-${index}`}
                  placeholder="가격을 입력하세요"
                  value={voteItem.price || ""}
                  onChange={(e) => handleInputChange(e, index, "price")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor={`content-${index}`}
                  className="mb-3 block text-base font-medium text-[#FF7F50]"
                >
                  내용 설명:
                </label>
                <textarea
                  name={`content-${index}`}
                  id={`content-${index}`}
                  placeholder="내용을 입력하세요"
                  value={voteItem.voteItemDesc || ""}
                  onChange={(e) => handleInputChange(e, index, "voteItemDesc")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#FF7F50] focus:shadow-md"
                />
              </div>
            </div>
          ))}

          {/* 투표 항목 추가 버튼 */}
          <div className="mb-5">
            <button
              type="button"
              onClick={addVoteItem}
              className="w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              투표 항목 추가하기
            </button>
          </div>
          <div className="mb-5">
            <button
              type="button"
              onClick={removeVoteItem}
              className="w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              투표 항목 삭제하기
            </button>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2"
            >
              투표 올리기
            </button>
            <button
              onClick={setVoteProductModalClose}
              className="hover:shadow-form w-full rounded-md bg-[#FF7F50] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-3 mr-2"
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteProduct;
