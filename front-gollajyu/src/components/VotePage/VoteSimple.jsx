import React, { useState } from "react";
import API_URL from "/src/stores/apiURL";
import axios from "axios";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

const VoteSimple = () => {
  const [voteItems, setVoteItems] = useState([
    { voteItemImg: null, voteItemDesc: "", price: "" },
    { voteItemImg: null, voteItemDesc: "", price: "" },
  ]);
  const [previewImages, setPreviewImages] = useState([]);

  const [title, setTitle] = useState("");
  // 사용자 ID를 저장할 state 변수 추가
  const user = useAuthStore((state) => state.user);
  // 모달창 닫는 로직
  const setVoteSimpleModalClose = useModalStore(
    (state) => state.setVoteSimpleCreateModalClose
  );

  const createVote = useAuthStore((state) => state.createVote);

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

    const formData = new FormData();
    formData.append("memberEmail", user.email);
    formData.append("title", event.target.title.value);
    formData.append("description", "simple");
    formData.append("categoryId", 5);
    voteItems.forEach((item, index) => {
      formData.append(`voteItemList[${index}].voteItemImg`, item.voteItemImg);
      formData.append(`voteItemList[${index}].voteItemDesc`, "");
      formData.append(`voteItemList[${index}].price`, "");
    });

    try {
      const response = await axios.post(API_URL + "/votes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      createVote(); // 투표 만들면 10포인트 차감
      setVoteSimpleModalClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create poll.");
    }
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setVoteSimpleModalClose();
        }
      }}
    >
      <div className="mx-auto max-h-[800px] w-full max-w-[800px] bg-white overflow-y-auto">
        <form
          className="py-4 px-9"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* 제목 및 카테고리 설정 */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#8DB600]"
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
              className="w-full rounded-md border border-[#e0e0e0] 
                bg-white py-3 px-6 text-base font-medium text-[#6B7280] 
                outline-none focus:border-[#8DB600] focus:shadow-md"
            />
          </div>
          <div className="flex flex-wrap justify-center mt-10">
            {voteItems.map((voteItem, index) => (
              <div key={index} className="p-4 max-w-sm flex-grow">
                <div className="flex rounded-lg h-full bg-[#8DB600] p-8 flex-col">
                  <div className="mb-8">
                    <label
                      htmlFor={`voteItem${index + 1}`}
                      className="relative"
                    >
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
              </div>
            ))}
          </div>
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
          {/* 투표 올리기, 취소하기 버튼 */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md 
              bg-[#8DB600] py-3 px-8 
              text-center text-base font-semibold text-white 
              outline-none mb-3 mr-2
              "
            >
              투표 올리기
            </button>
            <button
              onClick={setVoteSimpleModalClose}
              className="
              hover:shadow-form w-full rounded-md 
              bg-[#8DB600] py-3 px-8 
              text-center text-base font-semibold text-white 
              outline-none mb-3 mr-2
              "
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteSimple;
