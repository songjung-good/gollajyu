// 리액트 및 훅/라이브러리
import React, { useState } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";
import useAuthStore from "/src/stores/userState";


const VoteSimple = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

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


  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge ? "800px" : isLarge ? "640px" : isMedium ? "450px" : "360px",
    maxHeight: "800px",
    borderRadius: "10px",
    background: "#FFFFFF",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 스크롤바
    overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
    scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
    scrollbarColor: "#FFD257 transparent", // 스크롤바 색상 (track, thumb 순서)
  };

  // ----------- 이미지 컨테이너 스타일 -----------
  const imgContainerStyle = {
    // 디자인
    margin: isXLarge ? "30px 0" : isLarge ? "27px 0" : isMedium ? "24px 0" : "21px 0",
    
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
    gap: isXLarge ? "16px" : isLarge ? "14px" : isMedium ? "12px" : "10px",
  }

  // ----------- 이미지 아이템 스타일 -----------
  const imgItemStyle = {
    // 디자인
    width: isXLarge ? "120px" : isLarge ? "90px" : isMedium ? "57.5px" : "44px",
    height: isXLarge ? "180px" : isLarge ? "140px" : isMedium ? "100px" : "80px",
    borderRadius: "5px",
    
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div
        id="outer-layer"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target.id == "outer-layer") {
            setVoteSimpleModalClose();
          }
        }}
      >
        <div style={bodyStyle}>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >

            {/* ------------- 제목 입력 ------------- */}
            <div>
              <label
                htmlFor="title"
                className="my-10 block text-center fontsize-xl"
              >
                <span style={{ color: "#8AC926" }} className="fontsize-xl">간단 </span>골라쥬
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border-0 focus:shadow-md
                  bg-gray-100 py-4 px-6 text-base text-[#6B7280]"
              />
            </div>

            {/* ------------- 사진 첨부 ------------- */}
            <div style={imgContainerStyle}>
              <div style={{ gap: isXLarge ? "16px" : isLarge ? "14px" : isMedium ? "12px" : "10px" }} className="flex">
                {voteItems.map((voteItem, index) => (
                  <div
                    style={{
                      ...imgItemStyle,
                      overflow: 'hidden',
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200"
                    key={index}
                  >
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
                          className="mt-3 rounded-lg"
                        />
                      )}
                    </label>

                    {!previewImages[index] && (
                      <label
                        htmlFor={`voteItem${index + 1}`}
                        style={{ fontSize: "20px", paddingBottom: "20px" }}
                        className="relative flex items-center h-full justify-center text-center cursor-pointer"
                      >
                        사진 {index+1}
                      </label>
                    )}
                  </div>
                ))}
              </div>

              {/* ------------- 항목 추가, 제거 버튼------------- */}
              <div style={{ gap: isXLarge ? "16px" : isLarge ? "14px" : isMedium ? "12px" : "10px" }} className="flex">
                <button
                  style={{
                    ...imgItemStyle,
                    width: isXLarge ? "80px" : isLarge ? "70px" : isMedium ? "50px" : "40px",
                    fontSize: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
                    fontFamily: "GmarketSansLight",
                    cursor: voteItems.length > 3 ? "not-allowed" : "pointer",
                  }}
                  className="flex items-center pt-3 h-full justify-center bg-gray-100 hover:bg-gray-200"
                  type="button"
                  onClick={addVoteItem}
                  disabled={voteItems.length > 3}
                >
                  +
                </button>
                <button
                  style={{
                    ...imgItemStyle,
                    width: isXLarge ? "80px" : isLarge ? "70px" : isMedium ? "50px" : "40px",
                    fontSize: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
                    fontFamily: "GmarketSansLight",
                    cursor: voteItems.length < 3 ? "not-allowed" : "pointer",
                  }}
                  className="flex items-center pt-3 h-full justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
                  type="button"
                  onClick={removeVoteItem}
                  disabled={voteItems.length < 3}
                >
                  -
                </button>
              </div>
            </div>

            {/* ------------- 취소하기, 투표 올리기 버튼 ------------- */}
            <div style={{ marginBottom: "40px" }} className="flex justify-between">
              <button
                onClick={setVoteSimpleModalClose}
                className="w-1/2 mx-2 p-3 rounded-full bg-white hover:bg-gray-200 text-center fontsize-sm border-4 border-gray-300"
              >
                취소하기
              </button>
              <button
                type="submit"
                className="w-1/2 mx-2 p-3 rounded-full bg-amber-300 hover:bg-amber-400 text-center fontsize-sm"
              >
                투표 올리기
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VoteSimple;
