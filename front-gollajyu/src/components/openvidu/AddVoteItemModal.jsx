import React, { useState, useRef, useEffect } from "react";

const settingButton = "text-white font-bold py-2 px-4 rounded";

const AddVoteItemModal = ({ isOpen, onClose }) => {
  const [imgFile, setImgFile] = useState("");
  const [previewImgFile, setPreviewImgFile] = useState("");
  const [text, setText] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    // console.log(file);
    setImgFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgFile(reader.result);
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
      onClose("img", [imgFile, previewImgFile]);
    } else if (text) {
      onClose("text", [text]);
    }
    setImgFile("");
    setText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center text-center">
      <div className="bg-neutral-300 p-6 rounded-md w-[450px] h-[350px] relative">
        <h2 className="text-2xl mb-4">투표 선택지 추가하기</h2>
        <div className="flex flex-col items-center space-y-3">
          {imgFile && (
            <img
              src={previewImgFile}
              className="w-48 h-40 mx-auto"
              alt="이미지 미리보기"
            />
          )}

          <input
            type="file"
            accept="image/*"
            id="img"
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
                placeholder="텍스트 추가해쥬(15자 이내)"
                value={text}
                onChange={(e) => {
                  if (e.target.value.length > 15) {
                    window.alert("글자수가 15자를 넘었습니다");
                    setText(e.target.value.slice(0, 15));
                  } else {
                    setText(e.target.value);
                  }
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
