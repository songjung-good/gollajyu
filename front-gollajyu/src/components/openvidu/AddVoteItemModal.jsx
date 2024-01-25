import React, { useState, useRef, useEffect } from "react";

const settingButton = "text-white font-bold py-2 px-4 rounded";

const AddVoteItemModal = ({ isOpen, onClose }) => {
  const [imgFile, setImgFile] = useState("");
  const [text, setText] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  if (!isOpen) return null;

  const handleCancel = () => {
    setImgFile("");
    setText("");
    onClose("");
  };

  const handleSubmit = () => {
    if (imgFile) {
      onClose(imgFile);
    } else if (text) {
      onClose(text);
    }
    setImgFile("");
    setText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center text-center">
      <div className="bg-neutral-300 p-6 rounded-md w-1/3 h-1/3 relative">
        {/* <span
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span> */}
        <h2 className="text-2xl mb-4">투표 선택지 추가하기</h2>
        <div className="flex flex-col items-center space-y-3">
          {imgFile && (
            <img
              src={imgFile}
              className="w-48 h-40 mx-auto"
              alt="이미지 미리보기"
            />
          )}

          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            className="w-3/5"
          />
          {!imgFile && (
            <>
              <p>또는</p>
              <input
                type="text"
                className="w-3/5"
                placeholder="텍스트를 추가해주세요"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </>
          )}
        </div>
        <div
          id="button"
          className="flex justify-center space-x-4 absolute inset-x-0 bottom-0 mb-2"
        >
          <button
            className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
            onClick={handleSubmit}
          >
            확인
          </button>
          <button
            className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVoteItemModal;
