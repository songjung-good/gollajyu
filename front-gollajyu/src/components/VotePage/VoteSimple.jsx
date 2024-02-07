import React, { useState } from 'react';
import API_URL from "../../stores/apiURL";
import axios from "axios";
import useAuthStore from "../../stores/userState";
import useModalStore from "../../stores/modalState";

const VoteSimple = () => {
  const [title, setTitle] = useState('');
  // 이미지의 기본 값
  const [images, setImages] = useState([null, null, null, null]);
  // 로딩기능
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 사용자 ID를 저장할 state 변수 추가
  const user = useAuthStore((state) => state.user);
  // 이미지 미리보기
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  // 모달창 닫는 로직
  const setVoteSimpleModalClose = useModalStore((state) => state.setVoteSimpleCreateModalClose);

  // voteReqDto 객체를 컴포넌트 외부에 선언하고 초기화
  const [voteReqDto, setVoteReqDto] = useState({
    memberEmail: '',
    title: '',
    description: 'none',
    categoryId: 0,
    voteItemList: [],
  });

  // 이미지 업로드 기능
  const handleImageUpload = (event, index) => {
    const newImages = images.slice();
    newImages[index] = event.target.files[0];
    setImages(newImages);

    // 이미지 URL
    const newPreviewImages = previewImages.slice();
    if (event.target.files.length > 0) {
      newPreviewImages[index] = URL.createObjectURL(event.target.files[0]);
    } else {
      newPreviewImages[index] = null;
    }
    setPreviewImages(newPreviewImages);

    // 업로드된 이미지 정보를 voteReqDto에 추가
    const newVoteItemList = voteReqDto.voteItemList.slice();
    newVoteItemList[index] = {
      voteItemImg: event.target.files[0],
      voteItemDesc: '',
      price: 0,
    };
    setVoteReqDto({
      ...voteReqDto,
      voteItemList: newVoteItemList,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 이미지 갯수와 제목 확인
    const imageCount = images.filter((img) => img !== null && img !== '').length;
    // 조건에 안맞으면 알림창
    if (title === '') {
      alert('제목을 입력해야 합니다.');
      return;
    }
    if (imageCount < 2) {
      alert('투표를 게시하려면 최소 2개 이상의 사진을 첨부해야 합니다.');
      return;
    }
    // 업로드 시 로딩
    setIsSubmitting(true);

    // 데이터 전송
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', 'none'); // description 값을 'none'으로 설정
    formData.append('categoryId', '0'); // categoryId 값을 '0'으로 설정
    formData.append('memberId', user.memberId); // 사용자 ID 값 추가

    // 이미지 업로드 시 formData에 추가하는 부분
    images.forEach((image, index) => {
      if (image !== null) {
        formData.append(`voteItemImg${index + 1}`, image);
      }
    });
    
    const formDataObject = Object.fromEntries(formData);
    console.log('formDataObject:', formDataObject);

    // api주소
    axios.post(`${API_URL}/votes`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      // API 호출 성공
      if (response.status === 200) {
        // 투표 게시 성공
        alert('투표 생성이 완료되었습니다!');
        setVoteSimpleModalClose();
      } else {
        // API 호출 실패
        // 에러 메시지 출력
        alert(response.data.message);
        setIsSubmitting(false);
      }
    })
    .catch((error) => {
      // 네트워크 오류 등 예외 처리
      console.log(error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    });
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
      <div className="mx-auto w-full max-w-[900px] bg-white rounded-xl">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          {/* 제목 및 카테고리 설정 */}
          <div className="mb-5">
            <label htmlFor="title" 
              className="mb-3 block text-base font-medium text-[#8DB600]">
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
          {Array(4).fill(null).map((_, index) => (
            <div key={index} className="p-4 max-w-sm flex-grow">
              <div className="flex rounded-lg h-full bg-[#8DB600] p-8 flex-col">
                {previewImages[index] && (
                  <img src={previewImages[index]} 
                    alt="" 
                    className="object-cover h-full w-full rounded-lg"
                  />
                )}
                {!previewImages[index] && (
                  <div className="mb-8">
                    <input
                      type="file"
                      name={`file${index}`}
                      id={`file${index}`}
                      className="sr-only"
                      onChange={(event) => handleImageUpload(event, index)} 
                    />
                    <label htmlFor={`file${index}`}
                      className="relative flex min-h-[100px] items-center justify-center 
                      rounded-md border border-dashed border-[#e0e0e0] p-6 text-center">
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-white">
                          사진을 첨부해주세요
                        </span>
                      </div>
                    </label>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
          {/* 투표 올리기, 취소하기 버튼 */}
          <div className="flex justify-between">
            <button
              className="hover:shadow-form w-full rounded-md 
              bg-[#8DB600] py-3 px-8 
              text-center text-base font-semibold text-white 
              outline-none mb-3 mr-2
              ">
              투표 올리기
            </button>
            <button
              className="
              hover:shadow-form w-full rounded-md 
              bg-[#8DB600] py-3 px-8 
              text-center text-base font-semibold text-white 
              outline-none mb-3 mr-2
              ">
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteSimple;