import React, { useState } from "react";
import useAuthStore from "../stores/userState";
import useModalStore from "../stores/modalState";
import axios from "axios";

const TmpModal = () => {
  const setVoteDetailModalClose = useModalStore(
    (state) => state.setVoteDetailModalClose
  );
  const setVoteSimpleCreateModalClose = useModalStore(
    (state) => state.setVoteSimpleCreateModalClose
  );
  const setVoteProductCreateModalClose = useModalStore(
    (state) => state.setVoteProductCreateModalClose
  );
  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          // 바깥 까만 영역을 누르면 모달이 꺼짐
          setVoteDetailModalClose();
          setVoteSimpleCreateModalClose();
          setVoteProductCreateModalClose();
        }
      }}
    >
      <div
        id="inner"
        className="mx-auto container bg-white xl:w-[420px] xl:h-[620px] lg:w-[380px] lg:h-[560px] md:w-[330px] md:h-[500px] sm:w-[250px] sm:h-[400px] flex flex-col items-center rounded-3xl shadow-md"
      ></div>
    </div>
  );
};

export default TmpModal;
